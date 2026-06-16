import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';
import PendingApproval from './PendingApproval';

const RecruiterJobPage = async () => {
    const company = await getLoggedInRecruiterCompany(); //todo: Replace with actual company ID
    console.log(company.status)
    return (
        <div>
            {company.status ==="approved"?
            <PostJobForm company={company} />:
            <PendingApproval/>
            }
        </div>
    );
};

export default RecruiterJobPage;