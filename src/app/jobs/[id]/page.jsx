import JobDetailsCard from '@/components/jobs/JobDetailsCard';
import { getJobById } from '@/lib/api/jobs';
import React from 'react';

const JobDetailsPage = async ({params}) => {
    const { id } =await params;
    
    const jobDetails = await getJobById(id);

    return (
        <div>
            <JobDetailsCard job={jobDetails} />
        </div>
    );
};

export default JobDetailsPage;