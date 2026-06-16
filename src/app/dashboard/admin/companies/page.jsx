import { getAllCompanies } from '@/lib/api/company';
import React from 'react';
import { CompanyTable } from '@/components/dashboard/admin/CompanyTable';
import { CompanyHeading } from '@/components/dashboard/admin/CopmanyHeading';


const AdminCompanyPage = async () => {
    const companies = await getAllCompanies();

    return (
        <div className="min-h-screen bg-[#0f0f1a] px-6 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-start justify-between mb-6">
                    <CompanyHeading />
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 border border-gray-600 rounded hover:bg-white/5 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                            Filter
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-sm text-white bg-indigo-600 hover:bg-indigo-500 rounded transition-colors">
                            <span className="text-lg leading-none">+</span>
                            Register New
                        </button>
                    </div>
                </div>
                <CompanyTable companies={companies} />
            </div>
        </div>
    );
};

export default AdminCompanyPage;