"use client";
import React from 'react';
import { Card, Button, Chip } from "@heroui/react";
import { Globe, Pin, ArrowRight, CircleCheck } from "@gravity-ui/icons";
import Image from 'next/image';

export default function JobCard({ job }) {
  // ডাটা থেকে প্রয়োজনীয় ফিল্ডগুলো এক্সট্র্যাক্ট করা হলো
  const {
    title,
    category,
    jobType,
    salary,
    location,
    isRemote,
    logo,
    name,
    status
  } = job;

  return (
    <Card className="w-full max-w-[280] bg-[#141416] border border-zinc-800/80 rounded-xl p-5 shadow-xl hover:border-zinc-700/80 transition-all duration-300">
      <div className="p-0 flex flex-col gap-5 justify-between h-full">
        
        {/* TOP SECTION: Logo and Status */}
        <div className="flex items-start justify-between w-full">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-[#1c1c1f] rounded-xl flex items-center justify-center border border-zinc-800 overflow-hidden shadow-inner relative">
            {logo ? (
              <Image 
                src={logo} 
                alt={name || "Company Logo"} 
                fill 
                className="object-cover"
                unoptimized 
              />
            ) : (
              <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold uppercase text-sm">
                {(name || "C").charAt(0)}
              </div>
            )}
          </div>

          {/* Status Badge */}
          {status === "active" && (
            <Chip
              variant="flat"
              className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-wider uppercase h-6 px-2 rounded-full"
            >
              Verified
            </Chip>
          )}
        </div>

        {/* MIDDLE SECTION: Title and Short Description */}
        <div className="space-y-2">
          {/* Company Name */}
          <h4 className="text-zinc-400 text-xs font-medium tracking-wide truncate">
            {name || "Unknown Company"}
          </h4>
          
          {/* Job Title */}
          <h2 className="text-lg font-bold text-white tracking-tight leading-snug hover:text-zinc-200 cursor-pointer transition-colors line-clamp-1">
            {title}
          </h2>

          {/* Salary Dynamic Content */}
          <p className="text-xs text-zinc-500 font-mono font-medium">
            {salary ? `${salary.min}k - ${salary.max}k ${salary.currency?.toUpperCase()}` : "Salary Negotiable"}
          </p>
        </div>

        {/* METADATA TAGS: Category & Location */}
        <div className="flex flex-wrap gap-2 pt-1">
          {/* Category Tag */}
          <Chip 
            className="bg-[#1c1c1f] text-zinc-300 border border-zinc-800 text-[11px] font-medium h-7 px-2.5 rounded-md capitalize"
          >
            {category}
          </Chip>

          {/* Location / Remote Tag */}
          <Chip 
            className="bg-[#1c1c1f] text-zinc-300 border border-zinc-800 text-[11px] font-medium h-7 px-2.5 rounded-md capitalize"
          >
            {isRemote ? "Remote" : location || "Not Specified"}
          </Chip>
        </div>

        {/* BOTTOM SEPARATOR LINE */}
        <div className="w-full h-[1] bg-zinc-800/60 my-1" />

        {/* ACTION ROW: Job Type & Action Button */}
        <div className="flex items-center justify-between w-full">
          {/* Job Type Text */}
          <span className="text-xs font-semibold text-zinc-400 capitalize">
            {jobType ? jobType.replace("-", " ") : "Full Time"}
          </span>

          {/* Interactive Trigger Button */}
          <Button 
            variant="light" 
            className="text-zinc-300 hover:text-white bg-transparent p-0 min-w-0 h-auto font-semibold text-xs flex items-center gap-1.5 hover:gap-2.5 transition-all outline-none"
          >
            View Openings <ArrowRight width={14} height={14} className="text-zinc-400" />
          </Button>
        </div>

      </div>
    </Card>
  );
}