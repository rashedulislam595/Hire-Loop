import { JobsTableList } from '@/components/dashboard/JobTableList';
import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const RecruiterJobsPage = async () => {
    const companyId = "co_9837421"; //todo: Replace with actual company ID

    const jobs = await getJobs(companyId);
    // console.log("Fetched jobs for company:", jobs);

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-200 py-12 px-4 sm:px-6 antialiased">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        
        {/* Header Module */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-white uppercase bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                HIRELOOP
              </span>
              <span className="text-zinc-600 text-xs">/</span>
              <span className="text-zinc-400 text-xs font-medium">Recruiter Workspace</span>
            </div>
            <h1 className="text-2xl font-semibold text-white tracking-tight mt-1">Manage All Jobs</h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Review, edit, and track active positions currently visible on your company board.
            </p>
          </div>
        </div>

        {/* Table Container Layer */}
        <div className="bg-[#18181b] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl p-2">
          <JobsTableList initialJobs={jobs} />
        </div>

      </div>
    </div>
    );
};

export default RecruiterJobsPage;