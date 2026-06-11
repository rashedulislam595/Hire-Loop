'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, Label, ListBox } from "@heroui/react";

export default function JobFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current active values from URL to keep UI synced on reload
  const currentSearch = searchParams.get('search') || '';
  const currentCategory = searchParams.get('category') || '';
  const currentJobType = searchParams.get('jobType') || '';
  const currentLocation = searchParams.get('location') || '';
  const currentWorkMode = searchParams.get('workMode') || '';

  // Universal updater function for URL params
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/jobs?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    router.push('/jobs', { scroll: false });
  };

  return (
    <div className="w-full bg-zinc-950 p-6 rounded-xl border border-zinc-900 space-y-6 mb-8">
      {/* Search Input and Clear Buttons */}
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-zinc-400 mb-1.5">
            Search Jobs
          </label>
          <input
            type="text"
            className="w-full h-[40] px-3 bg-zinc-900 border border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-700 text-sm transition-all"
            placeholder="Search by title or keyword..."
            value={currentSearch}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
        </div>
        
        <button
          onClick={handleReset}
          className="h-[40] px-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
        >
          Clear Filters
        </button>
      </div>

      <hr className="border-zinc-900" />

      {/* Hero UI Select Filter Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Category */}
        <Select 
          className="w-full text-zinc-200" 
          placeholder="All Categories"
          selectedKey={currentCategory}
          onSelectionChange={(selected) => updateFilter('category', selected)}
        >
          <Label className="text-zinc-400 text-xs mb-1">Category</Label>
          <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-white">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800">
            <ListBox className="text-zinc-300">
              <ListBox.Item id="design" textValue="Design">
                Design <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="development" textValue="Development">
                Development <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="marketing" textValue="Marketing">
                Marketing <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Job Type */}
        <Select 
          className="w-full text-zinc-200" 
          placeholder="All Types"
          selectedKey={currentJobType}
          onSelectionChange={(selected) => updateFilter('jobType', selected)}
        >
          <Label className="text-zinc-400 text-xs mb-1">Job Type</Label>
          <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-white">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800">
            <ListBox className="text-zinc-300">
              <ListBox.Item id="full-time" textValue="Full-time">
                Full-time <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="part-time" textValue="Part-time">
                Part-time <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="contract" textValue="Contract">
                Contract <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Location */}
        <Select 
          className="w-full text-zinc-200" 
          placeholder="All Locations"
          selectedKey={currentLocation}
          onSelectionChange={(selected) => updateFilter('location', selected)}
        >
          <Label className="text-zinc-400 text-xs mb-1">Location</Label>
          <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-white">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800">
            <ListBox className="text-zinc-300">
              <ListBox.Item id="Barishal" textValue="Barishal">
                Barishal <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Dhaka" textValue="Dhaka">
                Dhaka <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="Chattogram" textValue="Chattogram">
                Chattogram <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

        {/* Work Mode */}
        <Select 
          className="w-full text-zinc-200" 
          placeholder="Any Setting"
          selectedKey={currentWorkMode}
          onSelectionChange={(selected) => updateFilter('workMode', selected)}
        >
          <Label className="text-zinc-400 text-xs mb-1">Work Mode</Label>
          <Select.Trigger className="bg-zinc-900 border border-zinc-800 text-white">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-zinc-900 border border-zinc-800">
            <ListBox className="text-zinc-300">
              <ListBox.Item id="remote" textValue="Remote">
                Remote <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="onsite" textValue="On-site">
                On-site <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

      </div>
    </div>
  );
}