'use client';

import { useState, useMemo } from 'react';
import Header from './components/Header';
import FilterBar, { techCategories } from './components/FilterBar';
import JobList from './components/JobList';
import Map from './components/Map';
import SocialSidebar from './components/SocialSidebar';
import type { Job } from './types/job';

// Import job data
import jobsData from '../jobsLight.json';

export default function Home() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const [mapFocus, setMapFocus] = useState<{ lat: number; lng: number; city: string } | null>(null);
  const [mapHidden, setMapHidden] = useState(false);
  const jobs = jobsData as Job[];

  const matchesLocationString = (job: Job, location: string) => {
    const normalizedLocation = location.toLowerCase();
    return (
      job.cityCategory?.toLowerCase().includes(normalizedLocation) ||
      job.actualCity?.toLowerCase().includes(normalizedLocation) ||
      (location === 'Genf' && job.cityCategory === 'Geneva')
    );
  };

  const handleLocationClick = (job: Job) => {
    if (!job.latitude || !job.longitude) return;
    setMapFocus({
      lat: job.latitude,
      lng: job.longitude,
      city: job.actualCity || job.cityCategory || job.company,
    });
  };

  const handleLocationFocus = (location: string | null) => {
    if (!location) {
      setMapFocus(null);
      return;
    }

    if (location === 'remote') {
      return;
    }

    const job = jobs.find(job => matchesLocationString(job, location));
    if (!job?.latitude || !job.longitude) {
      setMapFocus(null);
      return;
    }

    setMapFocus({
      lat: job.latitude,
      lng: job.longitude,
      city: job.actualCity || job.cityCategory || location,
    });
  };

  const handleToggleMapHidden = (hidden: boolean) => {
    setMapHidden(hidden);
  };

  // Filter jobs based on selected tech and location
  const filteredJobs = useMemo(() => {
      return jobs.filter((job) => {
      // Tech filter
      if (selectedTech) {
        const techCategory = techCategories.find(t => t.id === selectedTech);
        if (techCategory) {
          const matchesTech = 
            job.techCategory?.toLowerCase().includes(techCategory.label.toLowerCase()) ||
            job.technologies?.some(t => 
              t.toLowerCase().includes(techCategory.label.toLowerCase()) ||
              techCategory.label.toLowerCase().includes(t.toLowerCase())
            ) ||
            job.filterTags?.some(t => 
              t.toLowerCase().includes(techCategory.label.toLowerCase()) ||
              techCategory.label.toLowerCase().includes(t.toLowerCase())
            );
          
          // Special handling for specific categories
          if (selectedTech === 'csharp') {
            const csharpMatch = 
              job.technologies?.some(t => t.includes('C#') || t.includes('.NET')) ||
              job.filterTags?.some(t => t.includes('C#') || t.includes('.NET'));
            if (!csharpMatch) return false;
          } else if (!matchesTech) {
            return false;
          }
        }
      }

      // Location filter
      if (selectedLocation) {
        if (selectedLocation === 'remote') {
          if (job.workplace !== 'remote' && !job.perkKeys?.includes('remote')) {
            return false;
          }
        } else {
          const locationMatch = matchesLocationString(job, selectedLocation);
          if (!locationMatch) return false;
        }
      }

      return true;
    });
  }, [jobs, selectedTech, selectedLocation]);

  return (
    <div className="app">
      <Header />
      
      <div className={`main-layout ${mapHidden ? 'map-hidden' : ''}`}>
        <div className="content-area">
          <div className="page-title">
            IT & Softwareentwickler Stellenangebote in der Schweiz
          </div>
          <FilterBar
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            isExpanded={filtersExpanded}
            onExpandChange={setFiltersExpanded}
            onLocationFocus={handleLocationFocus}
          />
          <div className={`job-list-container ${filtersExpanded ? 'filters-expanded' : ''}`}>
            <JobList jobs={filteredJobs} onLocationClick={handleLocationClick} />
          </div>
        </div>
        <Map
          jobs={filteredJobs}
          focusLocation={mapFocus}
          mapHidden={mapHidden}
          onToggleMapHidden={handleToggleMapHidden}
        />
      </div>

      <SocialSidebar />
    </div>
  );
}
