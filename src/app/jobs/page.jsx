import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters'; // Adjust this import path as needed
import { getAllJobs } from '@/lib/api/jobs';
import React, { Suspense } from 'react';

export default async function JobsPage({ searchParams }) {
  // Await searchParams in Next.js Server Components
  const resolvedParams = await searchParams;
  
  const allJobs = await getAllJobs();

  // Extract filters from the URL parameters
  const query = resolvedParams?.search?.toLowerCase() || '';
  const category = resolvedParams?.category || '';
  const jobType = resolvedParams?.jobType || '';
  const location = resolvedParams?.location || '';
  const workMode = resolvedParams?.workMode || '';

  // Filter the items securely on the server
  const filteredJobs = allJobs.filter((job) => {
    if (query && !job.title.toLowerCase().includes(query) && !job.name?.toLowerCase().includes(query)) {
      return false;
    }
    if (category && job.category !== category) {
      return false;
    }
    if (jobType && job.jobType !== jobType) {
      return false;
    }
    if (location && job.location !== location) {
      return false;
    }
    if (workMode) {
      const isRemoteTarget = workMode === 'remote';
      if (job.isRemote !== isRemoteTarget) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 antialiased py-12 px-4 sm:px-8 md:px-12 lg:px-16">
      
      {/* HEADER SECTION */}
      <div className="max-w-7xl mx-auto mb-10 space-y-2 border-b border-zinc-900 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Browse Jobs
        </h1>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Discover the worlds leading technology and creative organizations. Filter by industry, size, and values to find your next professional home.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Render Filters (Suspense ensures clean execution handling search params hook client side) */}
        <Suspense fallback={<div className="h-20 bg-zinc-950 animate-pulse rounded-xl" />}>
          <JobFilters />
        </Suspense>

        {/* RESPONSIVE GRID LAYOUT SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
          {filteredJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 border border-dashed border-zinc-900 rounded-xl mt-4">
            <p className="text-zinc-500 text-sm">No jobs match your selected filters.</p>
          </div>
        )}
      </div>

    </div>
  );
}