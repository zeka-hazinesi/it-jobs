'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Job } from '../types/job';

interface FocusLocation {
  lat: number;
  lng: number;
  city: string;
}

interface MapProps {
  jobs: Job[];
  focusLocation: FocusLocation | null;
  mapHidden: boolean;
  onToggleMapHidden: (hidden: boolean) => void;
}

interface ClusterGroup {
  lat: number;
  lng: number;
  count: number;
  jobs: Job[];
  city: string;
}

export default function Map({ jobs, focusLocation, mapHidden, onToggleMapHidden }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapZoom, setMapZoom] = useState(8);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const refreshMapSize = useCallback(() => {
    if (!leafletMapRef.current) return;
    const mapInstance = leafletMapRef.current;
    mapInstance.invalidateSize({ pan: false });
    // Reset view to current center/zoom to force clusters to realign with the container
    mapInstance.setView(mapInstance.getCenter(), mapInstance.getZoom(), { animate: false });
  }, []);

  const getGridSizeForZoom = (zoom: number) => {
    if (zoom >= 13) return 0.002;
    if (zoom >= 11) return 0.005;
    if (zoom >= 9) return 0.01;
    if (zoom >= 7) return 0.02;
    return 0.03;
  };

  const clusterJobs = (jobs: Job[], zoom: number): ClusterGroup[] => {
    const groups: { [key: string]: ClusterGroup } = {};
    const gridSize = getGridSizeForZoom(zoom);
    const useCityGrouping = zoom < 10;
    
    jobs.forEach((job) => {
      if (!job.latitude || !job.longitude) return;
      
      let key: string;
      if (useCityGrouping && job.cityCategory) {
        key = job.cityCategory;
      } else {
        key = `${Math.round(job.latitude / gridSize)}_${Math.round(job.longitude / gridSize)}`;
      }
      
      if (!groups[key]) {
        groups[key] = {
          lat: job.latitude,
          lng: job.longitude,
          count: 0,
          jobs: [],
          city: job.cityCategory || job.actualCity || 'Unknown',
        };
      }

      const group = groups[key];
      const prevCount = group.count;
      group.count += 1;
      group.lat = ((group.lat * prevCount) + job.latitude) / group.count;
      group.lng = ((group.lng * prevCount) + job.longitude) / group.count;
      group.jobs.push(job);
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
      const mapInstance = L.map(mapRef.current).setView([46.8182, 8.2275], 8);
      leafletMapRef.current = mapInstance;
      setMapZoom(mapInstance.getZoom());
      mapInstance.on('zoomend', () => {
        setMapZoom(mapInstance.getZoom());
      });
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstance);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add clustered markers
    const clusters = clusterJobs(jobs, mapZoom);
    
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
  }, [mapLoaded, jobs, mapZoom]);

  useEffect(() => {
    if (!mapLoaded || !leafletMapRef.current) return;

    const center = focusLocation
      ? [focusLocation.lat, focusLocation.lng]
      : [46.8182, 8.2275];
    const zoom = focusLocation ? 12 : 8;
    const animate = Boolean(focusLocation);

    leafletMapRef.current.setView(center, zoom, { animate });
  }, [mapLoaded, focusLocation]);

  useEffect(() => {
    if (!mapLoaded || !leafletMapRef.current) return;

    if (!mapHidden) {
      // Wait for the CSS transition and DOM update to complete
      refreshMapSize();
      const timeoutId = window.setTimeout(() => {
        refreshMapSize();
      }, 150);
      
      return () => window.clearTimeout(timeoutId);
    }
  }, [mapHidden, mapLoaded, refreshMapSize]);

  useEffect(() => {
    if (!mapRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0]?.contentRect || {};
      if (!width || !height) return;
      // Defer to the next frame so flex/layout changes have settled
      requestAnimationFrame(() => refreshMapSize());
    });

    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, [mapLoaded, refreshMapSize]);

  return (
    <>
      <div className={`map-area ${mapHidden ? 'map-hidden' : ''}`}>
        <div className="map-container">
          <div ref={mapRef} className="map" />
          <div className="map-attribution">
            Leaflet | © OpenStreetMap contributors
          </div>
        </div>
      </div>
      <div className="map-controls">
        <div className="map-control-group">
          <label className="map-checkbox">
            <input
              type="checkbox"
              checked={mapHidden}
              onChange={(event) => onToggleMapHidden(event.target.checked)}
            /> Karte verstecken
          </label>
        </div>
      </div>
    </>
  );
}
