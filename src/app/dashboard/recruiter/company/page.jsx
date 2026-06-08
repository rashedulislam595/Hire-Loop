import CompanyWorkspace from '@/components/dashboard/CompanyWorkspace';
import { getRecruiterCompany } from '@/lib/api/company';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const CompanyPage = async () => {

  const user = await getUserSession();
  const company = await getRecruiterCompany(user.id);

  return (
    <div>
    <CompanyWorkspace recruiter={user} recruiterCompany={company} />

    </div>
  );
};

export default CompanyPage;