import JobCard from '@/components/jobs/JobCard';
import { getAllJobs } from '@/lib/api/jobs';
import React from 'react';



export default async function CompaniesPage() {
    const jobs = await getAllJobs();
    return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 antialiased py-12 px-4 sm:px-8 md:px-12 lg:px-16">
      
      {/* HEADER SECTION (আপনার স্ক্রিনশটের ডিজাইন অনুযায়ী) */}
      <div className="max-w-7xl mx-auto mb-10 space-y-2 border-b border-zinc-900 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Browse Jobs
        </h1>
        <p className="text-sm md:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Discover the worlds leading technology and creative organizations. Filter by industry, size, and values to find your next professional home.
        </p>
      </div>

      {/* RESPONSIVE GRID LAYOUT SECTION */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center sm:justify-items-start">
          
          {/* ডাটা ম্যাপ (Map) করে ডাইনামিকালি কার্ড রেন্ডার করা হচ্ছে */}
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
          
        </div>
      </div>

    </div>
  );
}