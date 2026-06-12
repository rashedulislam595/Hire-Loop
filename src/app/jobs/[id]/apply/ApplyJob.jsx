'use client';

import { submitJobApplication } from '@/lib/actions/applications';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const ApplyJob = ({ applicant, job }) => {
    // 1. Initialize form state with pre-filled applicant info if available
    const [formData, setFormData] = useState({
        fullName: applicant?.name || '',
        email: applicant?.email || '',
        resumeLink: '',
        portfolioUrl: '',
        githubUrl: '',
        linkedinUrl: '',
        coverLetter: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // 2. Form element change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // 3. Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        // Payload containing combined application data
        const applicationPayload = {
            jobId: job?._id?.$oid || job?._id,
            jobTitle: job?.title,
            companyName: job?.name,
            ...formData,
        };

        const res = await submitJobApplication(applicationPayload);
        if (res.insertedId) {
            toast.success("Application submitted successfully!", {
                theme: "dark",
                position: "top-center",
            });
            setFormData({
                fullName: applicant?.name || '',
                email: applicant?.email || '',
                resumeLink: '',
                portfolioUrl: '',
                githubUrl: '',
                linkedinUrl: '',
                coverLetter: '',
            });
        }else{
            toast.error("Failed to submit application. Please try again.", {
                theme: "dark",
                position: "top-center",
            });
        }

    };

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-200 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="max-w-3xl w-full bg-zinc-950 border border-zinc-900 rounded-2xl shadow-xl p-6 md:p-10 space-y-8">

                {/* Header Section */}
                <div className="border-b border-zinc-900 pb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Applying For
                    </span>
                    <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
                        {job?.title || 'Job Position'}
                    </h1>
                    <p className="text-sm text-zinc-400 mt-1">
                        at <span className="text-zinc-200 font-medium">{job?.name || 'Company'}</span> • {job?.location || 'Remote'}
                    </p>
                </div>

                {/* Alert Notifications */}
                {message.text && (
                    <div className={`p-4 rounded-lg text-sm border ${message.type === 'success'
                            ? 'bg-emerald-950/30 border-emerald-900/50 text-emerald-400'
                            : 'bg-rose-950/30 border-rose-900/50 text-rose-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Application Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Group 1: Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Full Name <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Email Address <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
                                placeholder="johndoe@example.com"
                            />
                        </div>
                    </div>

                    {/* Group 2: Critical Documents */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Resume Link (Google Drive / Dropbox) <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="resumeLink"
                                required
                                value={formData.resumeLink}
                                onChange={handleChange}
                                className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
                                placeholder="https://drive.google.com/..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                Portfolio Website URL <span className="text-rose-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="portfolioUrl"
                                required
                                value={formData.portfolioUrl}
                                onChange={handleChange}
                                className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
                                placeholder="https://myportfolio.com"
                            />
                        </div>
                    </div>

                    {/* Group 3: Social Profiles */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                GitHub URL
                            </label>
                            <input
                                type="url"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleChange}
                                className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
                                placeholder="https://github.com/username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-2">
                                LinkedIn Profile URL
                            </label>
                            <input
                                type="url"
                                name="linkedinUrl"
                                value={formData.linkedinUrl}
                                onChange={handleChange}
                                className="w-full h-11 px-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
                                placeholder="https://linkedin.com/in/username"
                            />
                        </div>
                    </div>

                    {/* Group 4: Cover Letter / Message */}
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-2">
                            Cover Letter / Introduce Yourself <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                            name="coverLetter"
                            required
                            rows={5}
                            value={formData.coverLetter}
                            onChange={handleChange}
                            className="w-full p-4 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all resize-y"
                            placeholder="Explain why you are a great fit for this role..."
                        />
                    </div>

                    {/* Form Action Controls */}
                    <div className="flex justify-end pt-4 border-t border-zinc-900">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 h-11 bg-white hover:bg-zinc-200 text-black text-sm font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                'Submit Successfully'
                            ) : (
                                'Submit Application'
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ApplyJob;