
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import React from 'react';
import { Button, Card, Separator } from "@heroui/react";
import { CheckCircle2, Mail, ArrowRight, HelpCircle } from "lucide-react";
import Link from 'next/link';

export default async function Success({ searchParams }) {
    const { session_id } = await searchParams;

    if (!session_id) {
        throw new Error('Please provide a valid session_id (`cs_test_...`)');
    }

    const {
        status,
        customer_details: { email: customerEmail }
    } = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    });

    if (status === 'open') {
        return redirect('/');
    }

    if (status === 'complete') {
        return (
            <div className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-4 sm:p-6">

                {/* Main Success Container */}
                <Card className="max-w-md w-full bg-zinc-900/40 border border-zinc-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center backdrop-blur-md">

                    {/* Animated/Glowing Success Icon */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse"></div>
                        <CheckCircle2 className="w-16 h-16 text-emerald-400 relative z-10" strokeWidth={1.8} />
                    </div>

                    {/* Header Text */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-100 mb-2">
                        Payment Successful!
                    </h1>
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-sm mb-6">
                        Thank you for your purchase. Your account has been upgraded successfully.
                    </p>

                    <Separator className="bg-zinc-800/80 mb-6" />

                    {/* Email Confirmation Block */}
                    <div className="w-full bg-zinc-900/60 border border-zinc-800/60 rounded-xl p-4 mb-6 flex items-start gap-3 text-left">
                        <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Confirmation Email</p>
                            <p className="text-sm font-medium text-zinc-200 mt-0.5 break-all">
                                Sent to <span className="text-blue-400 font-semibold">{customerEmail}</span>
                            </p>
                        </div>
                    </div>

                    {/* Support Info */}
                    <div className="flex items-center gap-2 text-xs text-zinc-500 mb-8">
                        <HelpCircle className="w-4 h-4" />
                        <span>
                            Have questions? Email us at{' '}
                            <a href="mailto:orders@example.com" className="text-zinc-300 hover:text-white underline transition-colors">
                                orders@example.com
                            </a>
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="w-full flex flex-col gap-3">
                        <Link href="/">
                            <Button
                                color="primary"
                                variant="solid"
                                className="font-bold h-11 shadow-lg shadow-blue-500/10 group w-full rounded-xl"
                                endContent={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />}
                            >
                                Go to Home
                            </Button>
                        </Link>

                        <Link href="/jobs">
                            <Button
                                variant="light"
                                className="font-semibold text-zinc-400 w-full rounded-xl hover:text-white h-11"
                            >
                                Explore Job Listings
                            </Button>
                        </Link>
                    </div>

                </Card>
            </div>
        );
    }
}