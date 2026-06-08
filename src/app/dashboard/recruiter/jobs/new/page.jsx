import React from 'react';
import PostJobForm from './PostJobForm';
import { getLoggedInRecruiterCompany } from '@/lib/api/company';

const RecruiterJobPage = async () => {
    const company = await getLoggedInRecruiterCompany(); //todo: Replace with actual company ID
    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default RecruiterJobPage;