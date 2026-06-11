import React from "react";
import {
  Card,
  Chip,
  Link,
  Separator
} from "@heroui/react";

import { Briefcase, Calendar, Code, DollarSign, Layers, MapPin, Monitor, Paintbrush } from "lucide-react";

export default function JobDetailsCard({ job }) {
  // Mock Data mimicking the image content
  const salary = `$${job.salary.min}k – $${job.salary.max}k`;
  const jobData = {
    companySize: "201-500 employees",
    industry: "Information Technology & Services",
    tags: [
      { label: "Figma Expertise", icon: Paintbrush },
      { label: "System Thinking", icon: Layers },
      { label: "UI/UX Design", icon: Monitor },
      { label: "Basic Frontend", icon: Code },
    ],
    requirements: [
      "5+ years of experience designing complex B2B SaaS products or data-heavy applications.",
      "A strong portfolio showcasing your design process and problem-solving skills."
    ],
  };

  return (
    <div className="min-h-screen bg-[#0E0E10] text-[#E4E4E7] p-4 md:p-8 font-sans antialiased selection:bg-zinc-700">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HERO HEADER ================= */}
        <Card className="bg-[#18181B] border border-zinc-800/80 shadow-2xl p-4 md:p-6 radius-xl">
          <Card.Content className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 overflow-visible">
            <div className="flex items-center gap-4">
              {/* Company Logo Placeholder */}
              <div className="w-14 h-14 bg-linear-to-br from-zinc-700 to-zinc-900 rounded-xl flex items-center justify-center border border-zinc-700">
                <Briefcase className="w-6 h-6 text-zinc-400" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{job.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-zinc-400 font-medium">{job.name}</span>

                  <Chip size="sm" variant="flat" color="success" className="bg-emerald-500/10 text-emerald-400 border-none h-5 text-xs">
                    {job.status}
                  </Chip>

                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Link href={`/jobs/${job._id}/apply`} className="bg-white text-black font-semibold hover:bg-zinc-200 flex-1 md:flex-none h-10 px-6">
                Apply Now
              </Link>
            </div>
          </Card.Content>
        </Card>

        {/* ================= QUICK STATS METRICS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "SALARY RANGE", value: salary, icon: DollarSign },
            { label: "LOCATION", value: job.location, icon: MapPin },
            { label: "JOB TYPE", value: job.jobType, icon: Calendar },
            // { label: "EXPERIENCE", value: jobData.experience, icon: Layers },
          ].map((stat, i) => (
            <Card key={i} className="bg-[#18181B] border border-zinc-800/50 p-3">
              <Card.Content className="flex flex-row items-center gap-3.5">
                <div className="p-2 rounded-lg bg-zinc-800/50 text-zinc-400">
                  {stat.icon && <stat.icon className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-[10px] tracking-wider text-zinc-500 font-bold uppercase">{stat.label}</p>
                  <p className="text-sm font-semibold text-zinc-200 mt-0.5">{stat.value}</p>
                </div>
              </Card.Content>
            </Card>
          ))}
        </div>

        {/* ================= MAIN CONTENT GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* LEFT: Core Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#18181B] border border-zinc-800/80 p-4 md:p-6">
              <Card.Content className="space-y-8">

                {/* Description */}
                <section>
                  <h2 className="text-lg font-bold text-white mb-3">Job Description</h2>
                  <p className="text-sm leading-relaxed text-zinc-400 font-normal">{job.description.benefits}</p>
                </section>

                {/* Responsibilities */}
                <section>
                  <h2 className="text-lg font-bold text-white mb-3">Responsibilities</h2>
                  <p className="text-sm leading-relaxed text-zinc-400 font-normal">{job.description.responsibilities}</p>
                </section>

                {/* Requirements & Skill Pill Tags */}
                <section>
                  <h2 className="text-lg font-bold text-white mb-4">Requirements</h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {jobData.tags.map((tag, i) => (
                      <Chip
                        key={i}
                        variant="bordered"
                        className="border-zinc-800 bg-zinc-900/40 text-zinc-300 text-xs py-3.5 px-1"

                      >
                        {tag.label}
                      </Chip>
                    ))}
                  </div>
                  <ul className="space-y-3">
                    {jobData.requirements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                        <span className="text-zinc-600 mt-1.5  text-xs">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Benefits */}
                <section>
                  <h2 className="text-lg font-bold text-white mb-4">Benefits</h2>
                  <div className=" ">
                    <p className="text-sm leading-relaxed text-zinc-400 font-normal">{job.description.benefits}</p>
                  </div>
                </section>

              </Card.Content>
            </Card>
          </div>

          {/* RIGHT: Company Sidebar Overview */}
          <div className="space-y-6">
            <Card className="bg-[#18181B] border border-zinc-800/80 p-4 md:p-6 sticky top-6">
              <Card.Header className="p-0 pb-4 flex flex-col items-start">
                <h2 className="text-lg font-bold text-white">Company Overview</h2>
              </Card.Header>
              <Card.Content className="p-0 space-y-5">

                {/* Media Placeholder Graphic */}
                <div className="relative w-full h-40 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex items-center justify-center group">
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent z-10" />
                  <div className="w-4/5 h-4/5 border border-zinc-800 bg-[#0E0E10] rounded-lg shadow-2xl flex items-center justify-center">
                    <Monitor className="w-8 h-8 text-zinc-700 group-hover:scale-105 transition-transform" />
                  </div>
                </div>

                {/* Info Metadata Units */}
                <div className="space-y-4 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 font-medium">SIZE</span>
                    <span className="text-zinc-300 font-semibold">{jobData.companySize}</span>
                  </div>
                  <Separator variant="default" className="bg-zinc-800/60" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500 font-medium">INDUSTRY</span>
                    <span className="text-zinc-300 font-semibold text-right max-w-[180] truncate">{jobData.industry}</span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 flex justify-center">
                  <Link
                    href="#"
                    className="text-zinc-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors transition-underline"
                    underline="hover"
                  >
                    Visit Website
                  </Link>
                </div>

              </Card.Content>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}