'use client';

import { useEffect, useRef, useState } from 'react';
import type { Job } from '../types/job';

interface FocusLocation {
  lat: number;
  lng: number;
  city: string;
}

interface MapProps {
  jobs: Job[];
  focusLocation: FocusLocation | null;
}

interface ClusterGroup {
  lat: number;
  lng: number;
  count: number;
  jobs: Job[];
  city: string;
}

export default function Map({ jobs, focusLocation }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Group jobs by city category
  const clusterJobs = (jobs: Job[]): ClusterGroup[] => {
    const groups: { [key: string]: ClusterGroup } = {};
    
    jobs.forEach((job) => {
      if (!job.latitude || !job.longitude) return;
      
      // Group by cityCategory for proper city-level clustering
      const key = job.cityCategory || `${job.latitude.toFixed(1)}_${job.longitude.toFixed(1)}`;
      
      if (!groups[key]) {
        groups[key] = {
          lat: job.latitude,
          lng: job.longitude,
          count: 0,
          jobs: [],
          city: job.cityCategory || job.actualCity || 'Unknown',
        };
      }
      groups[key].count++;
      groups[key].jobs.push(job);
    });
    
    return Object.values(groups);
  };

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.querySelector('link[href*="leaflet"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS
    if (!(window as any).L) {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);
    } else {
      setMapLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const L = (window as any).L;
    
    // Initialize map centered on Switzerland
    if (!leafletMapRef.current) {
      leafletMapRef.current = L.map(mapRef.current).setView([46.8182, 8.2275], 8);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(leafletMapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add clustered markers
    const clusters = clusterJobs(jobs);
    
    clusters.forEach((cluster) => {
      const markerHtml = `
        <div class="map-marker ${cluster.count > 50 ? 'large' : cluster.count > 10 ? 'medium' : 'small'}">
          ${cluster.count}
        </div>
      `;
      
      const icon = L.divIcon({
        html: markerHtml,
        className: 'custom-marker-container',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([cluster.lat, cluster.lng], { icon })
        .addTo(leafletMapRef.current)
        .bindPopup(`
          <strong>${cluster.city}</strong><br>
          ${cluster.count} Job${cluster.count > 1 ? 's' : ''} verfügbar
        `);
      
      markersRef.current.push(marker);
    });

    return () => {
      // Cleanup on unmount
    };
  }, [mapLoaded, jobs]);

  useEffect(() => {
    if (!mapLoaded || !leafletMapRef.current || !focusLocation) return;

    leafletMapRef.current.setView([focusLocation.lat, focusLocation.lng], 12, {
      animate: true,
    });
  }, [mapLoaded, focusLocation]);

  return (
    <div className="map-container">
      <div className="map-controls">
        <div className="map-control-group">
          <label className="map-checkbox">
            <input type="checkbox" /> Salary stats
          </label>
          <label className="map-checkbox">
            <input type="checkbox" defaultChecked /> Karte verstecken
          </label>
        </div>
      </div>
      <div ref={mapRef} className="map" />
      <div className="map-attribution">
        Leaflet | © OpenStreetMap contributors
      </div>
    </div>
  );
}

