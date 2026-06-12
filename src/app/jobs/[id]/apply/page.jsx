import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';

const ApplyPage = async ({params}) => {
    const { id } =await params;

    const user = await getUserSession();
    if(!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`);
    }
    
    if(user?.role !== "seeker") {
        return (
            <div className='text-center py-20'>
                <h2 className='text-2xl font-bold mb-4'>Unauthorized Access</h2>
                <p className='text-gray-600'>You do not have permission to access this page.</p>
            </div>
        );
    }

    const job = await getJobById(id);

    return (
        <div className='max-w-3xl mx-auto py-10 px-4 text-center min-h-screen'>
            <h1 className='text-2xl font-bold mb-4'>Apply for Job</h1>
            <p>{job.title}</p>
        </div>
    );
};

export default ApplyPage;