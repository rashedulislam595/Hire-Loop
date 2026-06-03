"use client";

import { Card, CardContent } from "@heroui/react";

import {
  FiSearch,
  FiBarChart2,
  FiBookmark,
  FiSend,
  FiFileText,
  FiHexagon,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";

const features = [
  {
    id: 1,
    title: "Smart Search",
    desc: "Find your ideal job with advanced filters.",
    icon: <FiSearch size={20} />,
  },
  {
    id: 2,
    title: "Salary Insights",
    desc: "Get real salary data to negotiate confidently.",
    icon: <FiBarChart2 size={20} />,
  },
  {
    id: 3,
    title: "Top Companies",
    desc: "Apply to vetted companies that are hiring.",
    icon: <FiBriefcase size={20} />,
  },
  {
    id: 4,
    title: "Saved Jobs",
    desc: "Manage apps & favorites on your dashboard.",
    icon: <FiBookmark size={20} />,
  },
  {
    id: 5,
    title: "One-Click Apply",
    desc: "Simplify your job applications for an easier process!",
    icon: <FiSend size={20} />,
  },
  {
    id: 6,
    title: "Resume Builder",
    desc: "Create professional resumes with modern templates.",
    icon: <FiFileText size={20} />,
  },
  {
    id: 7,
    title: "Skill-Based Matching",
    desc: "Discover jobs that match your skills and experience.",
    icon: <FiHexagon size={20} />,
  },
  {
    id: 8,
    title: "Career Growth Resources",
    desc: "Boost your career with quick interview tips.",
    icon: <FiTrendingUp size={20} />,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-[#09090D] text-white py-24 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Top Heading */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>

            <p className="uppercase tracking-[3px] text-[11px] text-gray-400">
              Features Job
            </p>

            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
            Everything you need
            <br />
            to succeed
          </h1>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-start gap-4">
              {/* Icon Box */}
              <Card className="bg-[#111116] border border-[#1F1F27] min-w-14 h-14 rounded-2xl shadow-none">
                <CardContent className="h-full flex items-center justify-center text-violet-300">
                  {feature.icon}
                </CardContent>
              </Card>

              {/* Content */}
              <div>
                <h3 className="text-base font-medium mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm leading-7 text-gray-400 max-w-56">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}