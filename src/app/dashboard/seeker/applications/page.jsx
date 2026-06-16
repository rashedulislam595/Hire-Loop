import { getApplicationByApplicantId } from '@/lib/api/application';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ApplicationsPage = async() => {

    const user = await getUserSession();
    const applications = await getApplicationByApplicantId(user?.id)

    return (
        <div>
            this is my application page {applications.length}
        </div>
    );
};

export default ApplicationsPage;