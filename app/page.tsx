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
  const jobs = jobsData as Job[];

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
          const locationMatch = 
            job.cityCategory?.toLowerCase().includes(selectedLocation.toLowerCase()) ||
            job.actualCity?.toLowerCase().includes(selectedLocation.toLowerCase()) ||
            (selectedLocation === 'Genf' && job.cityCategory === 'Geneva');
          if (!locationMatch) return false;
        }
      }

      return true;
    });
  }, [jobs, selectedTech, selectedLocation]);

  return (
    <div className="app">
      <Header />
      
      <div className="sub-header">
        IT & Softwareentwickler Stellenangebote in der Schweiz
      </div>

      <div className="main-layout">
        <div className="content-area">
          <FilterBar
            selectedTech={selectedTech}
            onSelectTech={setSelectedTech}
            selectedLocation={selectedLocation}
            onSelectLocation={setSelectedLocation}
            isExpanded={filtersExpanded}
            onExpandChange={setFiltersExpanded}
          />
          <div className={`job-list-container ${filtersExpanded ? 'filters-expanded' : ''}`}>
            <JobList jobs={filteredJobs} />
          </div>
        </div>
        
        <div className="map-area">
          <Map jobs={filteredJobs} />
        </div>
      </div>

      <SocialSidebar />
    </div>
  );
}
