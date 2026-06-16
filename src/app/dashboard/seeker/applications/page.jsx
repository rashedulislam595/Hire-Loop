import ApplicationsTable from '@/components/dashboard/seeker/ApplicationsTable';
import GridHeading from '@/components/dashboard/seeker/GridHeading';
import { getApplicationByApplicantId } from '@/lib/api/application';
import { getUserSession } from '@/lib/core/session';

const ApplicationsPage = async () => {
    const user = await getUserSession();
    const applications = await getApplicationByApplicantId(user?.id);

    return (
        <div className="min-h-screen bg-[#111111] p-6 md:p-10 space-y-5">

            <GridHeading totalCount={applications.length} />
            <ApplicationsTable applications={applications || []} />

        </div>
    );
};

export default ApplicationsPage;