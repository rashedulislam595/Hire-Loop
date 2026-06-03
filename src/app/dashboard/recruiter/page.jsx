'use client';
import RecruiterDashboard from '@/components/dashboard/RecruiterDashboard';
import { authClient } from '@/lib/auth-client';
import { Spinner } from '@heroui/react';
import { Briefcase, Persons, Thunderbolt, Check } from '@gravity-ui/icons';
import React from 'react';

const RecruiterPage = () => {
    const { data: session, isPending } = authClient.useSession();
    if (isPending) {
        return <div><Spinner /></div>;
    }
    const user = session?.user;

    // recruiter data
    const statsData = [
        {
            id: 'total-job-posts',
            title: 'Total Job Posts',
            value: '48',
            icon: Briefcase, // image_e59139.png এর প্রথম আইকন (Document/Briefcase)
        },
        {
            id: 'total-applicants',
            title: 'Total Applicants',
            value: '1,284',
            icon: Persons, // image_e59139.png এর দ্বিতীয় আইকন (User/Applicants)
        },
        {
            id: 'active-jobs',
            title: 'Active Jobs',
            value: '18',
            icon: Thunderbolt, // image_e59139.png এর তৃতীয় আইকন (Lightning Bolt)
        },
        {
            id: 'jobs-closed',
            title: 'Jobs Closed',
            value: '32',
            icon: Check, // image_e59139.png এর চতুর্থ আইকন (Checkmark inside circle)
        }
    ];

    return (
        <div className='p-6 bg-black min-h-screen'>
            <h2 className='text-3xl font-bold '>Welcome back, {user?.name}</h2>
            <RecruiterDashboard statsData={statsData} />
        </div>
    );
};

export default RecruiterPage;