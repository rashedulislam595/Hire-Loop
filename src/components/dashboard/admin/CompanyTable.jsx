'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const statusStyles = {
    pending:  { text: 'text-yellow-400', dot: 'bg-yellow-400', label: 'Pending'  },
    approved: { text: 'text-green-400',  dot: 'bg-green-400',  label: 'Approved' },
    rejected: { text: 'text-red-400',    dot: 'bg-red-400',    label: 'Rejected' },
};

const avatarColors = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-teal-600',
    'bg-indigo-600',
    'bg-pink-600',
];

const StatusBadge = ({ status }) => {
    const style = statusStyles[status] ?? statusStyles.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${style.text}`}>
            <span className={`w-2 h-2 rounded-full ${style.dot}`} />
            {style.label}
        </span>
    );
};

const getInitials = (name) =>
    name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const formatDate = (dateField) => {
    const raw = dateField?.$date ?? dateField;
    if (!raw) return '—';
    return new Date(raw).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });
};

export const CompanyTable = ({ companies }) => {
    const [data, setData] = useState(companies);

    const getId = (company) => company._id?.$oid ?? company._id ?? company.id;

    const handleApprove = (id) =>{
        setData((prev) => prev.map((c) => (getId(c) === id ? { ...c, status: 'approved' } : c)));
    }

    const handleReject = (id) =>{
        setData((prev) => prev.map((c) => (getId(c) === id ? { ...c, status: 'rejected' } : c)));
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-700">
            <table className="w-full text-sm text-left">
                <thead>
                    <tr className="border-b border-gray-700 bg-[#1a1a2e]">
                        <th className="px-4 py-3 text-gray-400 font-medium">Company</th>
                        <th className="px-4 py-3 text-gray-400 font-medium">Industry</th>
                        <th className="px-4 py-3 text-gray-400 font-medium">Location</th>
                        <th className="px-4 py-3 text-gray-400 font-medium">Employees</th>
                        <th className="px-4 py-3 text-gray-400 font-medium">Status</th>
                        <th className="px-4 py-3 text-gray-400 font-medium">Date Submitted</th>
                        <th className="px-4 py-3 text-gray-400 font-medium text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((company, index) => {
                        const id = getId(company);
                        return (
                            <tr
                                key={id}
                                className="border-b border-gray-700/60 hover:bg-white/5 transition-colors"
                            >
                                {/* Company name + logo */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        {company.logo ? (
                                            <Image
                                                src={company.logo}
                                                alt={company.name}
                                                width={8}
                                                height={8}
                                                className="w-8 h-8 rounded-full object-cover shrink-0 bg-gray-700"
                                            />
                                        ) : (
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 ${avatarColors[index % avatarColors.length]}`}>
                                                {getInitials(company.name)}
                                            </div>
                                        )}
                                        <div>
                                            <p className="text-white font-medium leading-tight">{company.name}</p>
                                            {company.website && (
                                                <p className="text-gray-500 text-xs truncate max-w-[160]">{company.website}</p>
                                            )}
                                        </div>
                                    </div>
                                </td>

                                {/* Industry */}
                                <td className="px-4 py-3 text-gray-300 capitalize">{company.industry}</td>

                                {/* Location */}
                                <td className="px-4 py-3 text-gray-300">{company.location ?? '—'}</td>

                                {/* Employee count */}
                                <td className="px-4 py-3 text-gray-300">{company.employeeCount ?? '—'}</td>

                                {/* Status */}
                                <td className="px-4 py-3">
                                    <StatusBadge status={company.status} />
                                </td>

                                {/* Date */}
                                <td className="px-4 py-3 text-gray-300">{formatDate(company.createdAt)}</td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-end gap-2">
                                        {company.status !== 'approved' && (
                                            <button
                                                onClick={() => handleApprove(id)}
                                                className="px-3 py-1 text-xs font-semibold rounded bg-green-600 hover:bg-green-500 text-white transition-colors"
                                            >
                                                Approve
                                            </button>
                                        )}
                                        {company.status !== 'rejected' && (
                                            <button
                                                onClick={() => handleReject(id)}
                                                className="px-3 py-1 text-xs font-semibold rounded bg-red-600 hover:bg-red-500 text-white transition-colors"
                                            >
                                                Reject
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};