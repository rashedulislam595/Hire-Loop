'use client';

import React, { useState } from 'react';
import { Button } from '@heroui/react';

export default function GridHeading({ totalCount = 0 }) {
    const [viewMode, setViewMode] = useState('active');

    return (
        <div className="space-y-8">
            {/* Top Text Bar & Dynamic Control Selectors */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-100">My Applications</h1>
                    <p className="text-sm text-neutral-400 mt-1">Track your job applications and interview progress in real-time.</p>
                </div>
                
                <div className="flex items-center gap-3 self-end md:self-auto">
                    {/* Active/Archived Tab Controller */}
                    <div className="bg-neutral-900 border border-neutral-800 p-1 rounded-xl flex items-center">
                        <button 
                            onClick={() => setViewMode('active')}
                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${viewMode === 'active' ? 'bg-neutral-800 text-neutral-100 shadow' : 'text-neutral-400 hover:text-neutral-200'}`}
                        >
                            Active
                        </button>
                        <button 
                            onClick={() => setViewMode('archived')}
                            className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${viewMode === 'archived' ? 'bg-neutral-800 text-neutral-100 shadow' : 'text-neutral-400 hover:text-neutral-200'}`}
                        >
                            Archived
                        </button>
                    </div>

                    <Button variant="solid" className="bg-white text-black font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-neutral-200 transition-colors h-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                        Export PDF
                    </Button>
                </div>
            </div>

            {/* Metrics Layout Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#1a1a1a] border border-neutral-800/80 rounded-2xl p-5">
                    <div className="text-xs text-neutral-400 font-medium tracking-wide">Total Applied</div>
                    <div className="text-3xl font-bold text-white mt-1.5">{totalCount}</div>
                </div>
                
                <div className="bg-[#1a1a1a] border border-neutral-800/80 rounded-2xl p-5">
                    <div className="text-xs text-neutral-400 font-medium tracking-wide">Shortlisted</div>
                    <div className="text-3xl font-bold text-white mt-1.5">00</div>
                </div>
                
                <div className="bg-[#1a1a1a] border border-neutral-800/80 rounded-2xl p-5">
                    <div className="text-xs text-neutral-400 font-medium tracking-wide">Interviews</div>
                    <div className="text-3xl font-bold text-amber-500 mt-1.5">00</div>
                </div>
                
                <div className="bg-[#1a1a1a] border border-neutral-800/80 rounded-2xl p-5">
                    <div className="text-xs text-neutral-400 font-medium tracking-wide">Success Rate</div>
                    <div className="text-3xl font-bold text-emerald-500 mt-1.5">100%</div>
                </div>
            </div>
        </div>
    );
}