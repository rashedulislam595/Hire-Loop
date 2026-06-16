import { requiredRole } from '@/lib/core/session';
import React from 'react';

const RecruiterLayout = async ({children}) => {
    await requiredRole('recruiter')
    return children;
};

export default RecruiterLayout;