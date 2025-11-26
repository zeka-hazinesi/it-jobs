'use client';

import { useState } from 'react';
import type { Job } from '../types/job';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const formatSalary = (from?: number, to?: number) => {
    if (!from || !to) return null;
    const formatNum = (n: number) => {
      return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    };
    return `CHF ${formatNum(from)} - ${formatNum(to)}`;
  };

  const salary = formatSalary(job.annualSalaryFrom, job.annualSalaryTo);

  const displayTags = job.technologies?.slice(0, 3) || [];

  // Generate a placeholder logo URL or use actual
  const logoUrl = job.logoImg 
    ? `https://swissdevjobs.ch/company-logos/${job.logoImg}`
    : null;

  return (
    <div className="job-card">
      <div className="job-card-logo">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={`${job.company} logo`}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement!.innerHTML = `<div class="logo-placeholder">${job.company.charAt(0)}</div>`;
            }}
          />
        ) : (
          <div className="logo-placeholder">{job.company.charAt(0)}</div>
        )}
      </div>
      
      <div className="job-card-content">
        <div className="job-card-header">
          <h3 className="job-title">
            {job.name}
            <button 
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
              aria-label="Add to favorites"
            >
              {isFavorite ? '♥' : '♡'}
            </button>
          </h3>
        </div>
        <div className="job-meta">
          <span className="company-icon">🏢</span>
          <span className="company-name">{job.company}</span>
          <span className="location-icon">📍</span>
          <span className="job-location">{job.address}, {job.actualCity}</span>
        </div>
      </div>

      <div className="job-card-right">
        {salary && <div className="job-salary">{salary}</div>}
        <div className="job-tags">
          {displayTags.map((tag, index) => (
            <span key={index} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

