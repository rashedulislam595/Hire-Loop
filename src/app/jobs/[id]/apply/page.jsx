import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyJob from './ApplyJob';

const ApplyPage = async ({params}) => {
    const { id } =await params;

    const user = await getUserSession();
    if(!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`);
    }
    console.log("user session", user);
    
    if(user?.role !== "seeker") {
        return (
            <div className='text-center py-20'>
                <h2 className='text-2xl font-bold mb-4'>Unauthorized Access</h2>
                <p className='text-gray-600'>You do not have permission to access this page. Only job seekers can apply for positions. Please sign In with a job seeker account to proceed.</p>
            </div>
        );
    }

    const job = await getJobById(id);

    return (
        <div>
            <ApplyJob applicant={user} job={job} />
        </div>
    );
};

export default ApplyPage;