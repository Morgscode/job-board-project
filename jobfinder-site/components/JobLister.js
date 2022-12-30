import React, { useState, useEffect } from 'react';
import JobListerCard from './JobListerCard';

export default function JobLister(props) {
  const jobs = props.jobs.map((job) => <JobListerCard key={job} job={job} />);

  if (jobs.length > 0) {
    return (
      <div className="grid gap-4 md:gap-12 md:grid-cols-2  w-full">{jobs}</div>
    );
  }
  return (
    <div className="grid gap-4 md:gap-12 md:grid-cols-2 w-full">
        <p className='mb-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white'>No jobs found... :(</p>
    </div> 
  );
}
