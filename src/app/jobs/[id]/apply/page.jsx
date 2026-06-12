import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyJob from './ApplyJob';
import { getApplicationByApplicantId } from '@/lib/api/application';
import Link from 'next/link'; // Imported Link for navigation

const ApplyPage = async ({ params }) => {
    const { id } = await params;

    const user = await getUserSession();
    if (!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`);
    }
    
    // Unauthorized State (Not a Seeker)
    if (user?.role !== "seeker") {
        return (
            <div className='min-h-[70vh] flex flex-col items-center justify-center bg-[#09090b] text-white px-4'>
                <div className='max-w-md w-full border border-zinc-800 bg-zinc-900/50 p-8 rounded-xl text-center shadow-xl backdrop-blur-sm'>
                    <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                        </svg>
                    </div>
                    <h2 className='text-2xl font-bold mb-2 tracking-tight text-zinc-100'>Unauthorized Access</h2>
                    <p className='text-zinc-400 text-sm leading-relaxed'>
                        You do not have permission to access this page. Only job seekers can apply for positions. Please sign in with a job seeker account to proceed.
                    </p>
                </div>
            </div>
        );
    }

    const application = await getApplicationByApplicantId(user.id);
    const plan = {
        name: "free",
        maxApplications: 3
    };

    const job = await getJobById(id);
    const isLimitReached = application.length >= plan.maxApplications;

    return (
        <div className='min-h-screen bg-[#09090b] text-zinc-100 py-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-3xl mx-auto space-y-8'>
                
                {/* Tracker Banner */}
                <div className='bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm'>
                    <div className='text-center sm:text-left'>
                        <p className='text-xs font-medium text-zinc-500 tracking-wide uppercase mb-1'>Application Status</p>
                        <h2 className='text-base sm:text-lg font-semibold'>
                            Applied to <span className='text-blue-400 font-bold'>{application.length}</span> 
                            out of <span className='text-emerald-400 font-bold'>{plan.maxApplications}</span> jobs on your <span className='capitalize text-zinc-300'>{plan.name}</span> plan.
                        </h2>
                    </div>
                    
                    {/* View Plans Button */}
                    <Link 
                        href="/pricing" 
                        className='text-sm font-medium text-zinc-200 bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-sm whitespace-nowrap'
                    >
                        View more plans →
                    </Link>
                </div>
                
                {/* Main Content Area */}
                {isLimitReached ? (
                    /* Limit Reached State */
                    <div className='border border-zinc-800 bg-zinc-900/30 p-10 rounded-xl text-center shadow-lg'>
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                        </div>
                        <h3 className='text-2xl font-bold mb-2 tracking-tight text-zinc-200'>Application Limit Reached</h3>
                        <p className='text-zinc-400 text-sm max-w-md mx-auto leading-relaxed mb-6'>
                            You have reached the maximum number of applications allowed for your current plan. Please upgrade your tier to apply for more positions.
                        </p>
                        <Link 
                            href="/pricing" 
                            className='inline-block text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-md'
                        >
                            Upgrade Plan Now
                        </Link>
                    </div>
                ) : (
                    /* Form Container */
                    <div className='bg-zinc-900/60 border border-zinc-800 p-6 sm:p-8 rounded-xl shadow-xl backdrop-blur-md'>
                        <ApplyJob applicant={user} job={job} />
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default ApplyPage;