'use client';

import React, { useState } from 'react';
import { Button, Pagination, Chip } from '@heroui/react';
import Link from 'next/link';
import Image from 'next/image';

const ROWS_PER_PAGE = 8;

export default function ApplicationsTable({ applications }) {
    const [page, setPage] = useState(1);

    const totalPages = Math.max(1, Math.ceil(applications.length / ROWS_PER_PAGE));
    const start = (page - 1) * ROWS_PER_PAGE;
    const paginated = applications.slice(start, start + ROWS_PER_PAGE);

    const formatTimeAgo = (dateString) => {
        if (!dateString) return '---';
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (diffInDays === 0) {
            const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
            if (diffInHours === 0) return 'Just now';
            return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        }
        if (diffInDays === 1) return '1 day ago';
        if (diffInDays < 7) return `${diffInDays} days ago`;
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    };

    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case 'applied':     return 'text-slate-300 border-neutral-600 bg-neutral-800/40';
            case 'review':      return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
            case 'shortlisted': return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
            case 'rejected':    return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
            case 'offered':     return 'text-purple-400 border-purple-400/40 bg-purple-400/10';
            default:            return 'text-neutral-400 border-neutral-700 bg-neutral-800/20';
        }
    };

    if (!applications.length) {
        return (
            <div className="bg-[#1a1a1a] rounded-2xl border border-neutral-800/90 p-16 flex flex-col items-center justify-center text-center shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-neutral-800 flex items-center justify-center mb-4">
                    <span className="text-neutral-400 font-mono text-lg">&lt;/&gt;</span>
                </div>
                <p className="text-neutral-300 font-semibold text-sm">No applications yet</p>
                <p className="text-neutral-600 text-xs mt-1">Your submitted applications will appear here</p>
            </div>
        );
    }

    return (
        <div className="bg-[#1a1a1a] rounded-2xl border border-neutral-800/90 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    {/* Header */}
                    <thead>
                        <tr className="bg-[#161616]">
                            <th className="text-left text-[11px] font-medium text-neutral-500 uppercase tracking-widest py-3.5 pl-6 pr-4 border-b border-neutral-800/80 whitespace-nowrap">
                                Job Title
                            </th>
                            <th className="text-left text-[11px] font-medium text-neutral-500 uppercase tracking-widest py-3.5 px-4 border-b border-neutral-800/80 whitespace-nowrap">
                                Company
                            </th>
                            <th className="text-left text-[11px] font-medium text-neutral-500 uppercase tracking-widest py-3.5 px-4 border-b border-neutral-800/80 whitespace-nowrap">
                                Applied
                            </th>
                            <th className="text-left text-[11px] font-medium text-neutral-500 uppercase tracking-widest py-3.5 px-4 border-b border-neutral-800/80 whitespace-nowrap">
                                Status
                            </th>
                            <th className="text-right text-[11px] font-medium text-neutral-500 uppercase tracking-widest py-3.5 pl-4 pr-6 border-b border-neutral-800/80 whitespace-nowrap">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* Body */}
                    <tbody>
                        {paginated.map((app, index) => {
                            const appId = app.jobId;
                            return (
                                <tr
                                    key={index}
                                    className="border-b border-neutral-800/40 hover:bg-white/5 transition-colors duration-150"
                                >
                                    {/* Job Title + Logo */}
                                    <td className="py-4 pl-6 pr-4">
                                        <div className="flex items-center gap-3.5">
                                            <div className="relative w-9 h-9 rounded-xl bg-neutral-800 overflow-hidden flex items-center justify-center border border-neutral-700/60 ">
                                                {app.jobLogo ? (
                                                    <Image
                                                        src={app.jobLogo}
                                                        alt={app.companyName || 'Logo'}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-neutral-500 font-mono text-[10px]">&lt;/&gt;</span>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-semibold text-neutral-100 text-sm leading-tight">
                                                    {app.jobTitle}
                                                </div>
                                                <div className="text-[11px] text-neutral-600 mt-0.5">
                                                    Full-time • Remote
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Company */}
                                    <td className="py-4 px-4 text-neutral-300 text-sm font-medium whitespace-nowrap">
                                        {app.companyName || 'Unknown'}
                                    </td>

                                    {/* Applied */}
                                    <td className="py-4 px-4 text-neutral-500 text-sm whitespace-nowrap">
                                        {formatTimeAgo(app.createdAt)}
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border capitalize tracking-wide ${getStatusStyles(app.status)}`}>
                                            {app.status}
                                        </span>
                                    </td>

                                    {/* Action */}
                                    <td className="py-4 pl-4 pr-6 text-right">
                                        <Link
                                            href={`/dashboard/seeker/applications/${appId}`}
                                            className="inline-flex items-center text-neutral-500 hover:text-neutral-100 text-xs font-medium px-3 h-7 rounded-lg hover:bg-neutral-800/60 transition-colors duration-150"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="bg-[#161616] border-t border-neutral-800/80 px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-[11px] text-neutral-600 font-medium tracking-wide">
                    Showing {applications.length === 0 ? 0 : start + 1}–{Math.min(start + ROWS_PER_PAGE, applications.length)} of {applications.length} application{applications.length !== 1 ? 's' : ''}
                </p>

                {totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        initialPage={1}
                        page={page}
                        onChange={setPage}
                        size="sm"
                        radius="lg"
                        classNames={{
                            wrapper: 'gap-1 bg-transparent',
                            item: 'bg-transparent text-neutral-500 hover:text-white font-medium w-7 h-7 text-xs rounded-lg',
                            cursor: 'bg-neutral-100 text-black font-bold rounded-lg',
                            prev: 'bg-transparent text-neutral-600 hover:text-white w-7 h-7 rounded-lg',
                            next: 'bg-transparent text-neutral-600 hover:text-white w-7 h-7 rounded-lg',
                        }}
                    />
                )}
            </div>
        </div>
    );
}