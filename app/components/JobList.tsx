'use client';

import JobCard from './JobCard';
import type { Job } from '../types/job';

interface JobListProps {
  jobs: Job[];
  onLocationClick: (job: Job) => void;
}

export default function JobList({ jobs, onLocationClick }: JobListProps) {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onLocationClick={onLocationClick} />
      ))}
    </div>
  );
}

