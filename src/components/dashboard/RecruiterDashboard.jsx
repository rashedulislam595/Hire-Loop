'use client';
import React, { useEffect, useState } from 'react';
import { Briefcase, Persons, Thunderbolt, Check } from '@gravity-ui/icons';
import StatCardsGroup from './StatCard';
// ইমপোর্ট পাথটি আপনার ফাইল স্ট্রাকচার অনুযায়ী সঠিক করা হলো

export default function RecruiterDashboard() {
  const [statsData, setStatsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardStats() {
      try {
        const response = await fetch('/api/dashboard/recruiter'); 
        
        // যদি API না থাকে বা HTML পেজ রিটার্ন করে (Unexpected token '<')
        if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
          throw new Error("API not ready or returning HTML. Using image_e59139.png fallback data.");
        }

        const rawData = await response.json(); 
        
        const formattedStats = [
          { title: 'Total Job Posts', value: rawData.totalJobs || '0', icon: Briefcase },
          { title: 'Total Applicants', value: rawData.totalApplicants?.toLocaleString() || '0', icon: Persons },
          { title: 'Active Jobs', value: rawData.activeJobs || '0', icon: Thunderbolt},
          { title: 'Jobs Closed', value: rawData.closedJobs || '0', icon: Check },
        ];

        setStatsData(formattedStats);
      } catch (error) {
        console.warn(error.message);
        
        // FALLBACK: API এরর খেয়ে যেন আপনার স্ক্রিন সাদা না হয়ে যায়, তাই image_e59139.png এর ডাটা সেট করা হলো
        const fallbackStats = [
          { title: 'Total Job Posts', value: '48', icon: Briefcase },
          { title: 'Total Applicants', value: '1,284', icon: Persons },
          { title: 'Active Jobs', value: '18', icon: Thunderbolt },
          { title: 'Jobs Closed', value: '32', icon: Check },
        ];
        setStatsData(fallbackStats);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardStats();
  }, []);

  if (loading) return <div className="text-white p-6">Loading metrics...</div>;

  return (
    <div className="p-6 bg-black min-h-screen">
      <header className="mb-6">
        <h1 className="text-xl font-bold text-white">Recruiter Overview</h1>
      </header>

      {/* ডেটা প্রপ্স আকারে রিইউজেবল কম্পোনেন্টে পাঠানো হচ্ছে */}
      <StatCardsGroup data={statsData} />
    </div>
  );
}