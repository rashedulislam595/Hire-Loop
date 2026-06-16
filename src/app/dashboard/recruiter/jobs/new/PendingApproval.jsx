'use client';

import React from 'react';
import { Button, Card } from '@heroui/react';
import Link from 'next/link';

export default function PendingApproval() {
    return (
        <div className="w-full min-h-[75vh] flex items-center justify-center p-4 bg-[#121212]">
            <Card className="max-w-xl w-full bg-[#1a1a1a] border border-neutral-800 shadow-2xl p-6 sm:p-8 rounded-2xl">
                <Card.Content className="flex flex-col items-center text-center space-y-6">

                    {/* Visual Status Indicator: Hourglass/Clock Icon Wrapper */}
                    <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center text-amber-500 animate-pulse">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>

                    {/* Typography Content Header Group */}
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-neutral-100">
                            Account Approval Pending
                        </h2>
                        <p className="text-sm text-neutral-400 max-w-sm mx-auto leading-relaxed">
                            Thank you for partnering with us! Your company profile is currently undergoing verification by our operations team.
                        </p>
                    </div>

                    {/* Descriptive Warning Panel Banner Box */}
                    <div className="w-full bg-neutral-900/50 border border-neutral-800/80 rounded-xl p-4 text-left">
                        <div className="flex items-start gap-3">
                            <span className="text-amber-500 mt-0.5 text-sm">💡</span>
                            <div className="text-xs text-neutral-400 space-y-1">
                                <p className="font-semibold text-neutral-300">Why am I seeing this?</p>
                                <p>To maintain platform quality and avoid spam listings, all corporate employer handles are reviewed manually within 24–48 hours.</p>
                                <p className="pt-1 font-medium text-amber-500/90">Once verified, your feature locks will lift automatically and you can post new jobs immediately.</p>
                            </div>
                        </div>
                    </div>

                    {/* Context Action Nav Links and Controls */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full pt-2">
                        <Link href="/dashboard/recruiter">
                            <Button
                                variant="flat"
                                className="w-full sm:w-auto bg-neutral-800 text-neutral-200 hover:bg-neutral-700 font-semibold text-sm px-6 rounded-xl"
                            >
                                Go to Home
                            </Button>
                        </Link>

                        <Link href="/dashboard/recruiter/company">
                            <Button
                                variant="bordered"
                                className="w-full sm:w-auto border-neutral-700 text-neutral-300 hover:bg-neutral-800/60 font-semibold text-sm px-6 rounded-xl"
                            >
                                Review Profile
                            </Button>
                        </Link>


                    </div>

                    {/* Direct Help/Support Context anchor tag */}
                    <p className="text-xs text-neutral-500 pt-2">
                        Need urgent assistance?{' '}
                        <a href="mailto:support@yourdomain.com" className="text-amber-500/90 hover:underline font-medium">
                            Contact Support
                        </a>
                    </p>

                </Card.Content>
            </Card>
        </div>
    );
}