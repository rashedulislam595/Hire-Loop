import { getJobById } from '@/lib/api/jobs';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import React from 'react';
import ApplyJob from './ApplyJob';
import { getApplicationByApplicantId } from '@/lib/api/application';

const ApplyPage = async ({params}) => {
    const { id } =await params;

    const user = await getUserSession();
    if(!user) {
        redirect(`/login?redirect=/jobs/${id}/apply`);
    }
    // console.log("user session", user);
    
    if(user?.role !== "seeker") {
        return (
            <div className='text-center py-20'>
                <h2 className='text-2xl font-bold mb-4'>Unauthorized Access</h2>
                <p className='text-gray-600'>You do not have permission to access this page. Only job seekers can apply for positions. Please sign In with a job seeker account to proceed.</p>
            </div>
        );
    }

    const application = await getApplicationByApplicantId(user.id);
    const plan={
        name:"free",
        maxApplications: 3
    }

    const job = await getJobById(id);

    return (
        <div className='bg-[#09090b]'>
            <h2 className='text-center font-bold text-xl pt-6'>You have applied so far <span className='text-blue-500'>{application.length}</span> out of <span className='text-green-500'>{plan.maxApplications}</span> </h2>
            
            {application.length >= plan.maxApplications ? (
                <div className='text-center py-20'>
                    <h2 className='text-2xl font-bold mb-4'>Application Limit Reached</h2>
                    <p className='text-gray-600'>You have reached the maximum number of applications allowed for your plan.</p>
                </div>
            ) : (
                <ApplyJob applicant={user} job={job} />
            )}
        </div>
    );
};

export default ApplyPage;