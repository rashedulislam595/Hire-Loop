"use client";
import React, { useState } from 'react';
import { Form, TextField, Label, Input, Select, ListBox, TextArea, Button, Chip } from "@heroui/react";
import { Factory, Globe, Pin, Persons, Clouds, Pencil, ArrowLeft,ChevronDown } from "@gravity-ui/icons";
import Image from 'next/image';

export default function CompanyWorkspace({ initialCompany = null }) {
  // --- STATES ---
  const [company, setCompany] = useState(initialCompany); // null মানে কোনো কোম্পানি রেজিস্টার্ড নেই
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoUrl, setLogoUrl] = useState(initialCompany?.logo || "");

  // --- TAILWIND DESIGN CLASSES (As per requested style) ---
  const labelClass = "text-xs font-medium text-zinc-400 mb-2 block tracking-wide";
  const inputClass = "w-full bg-[#1c1c1f] text-white border border-zinc-800/80 rounded-md h-11 px-4 text-sm focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-600";
  const textareaClass = "w-full bg-[#1c1c1f] text-white border border-zinc-800/80 rounded-md p-4 text-sm focus:outline-none focus:border-zinc-600 min-h-[120px] transition-all placeholder:text-zinc-600";
  const selectTriggerClass = "w-full bg-[#1c1c1f] border border-zinc-800/80 rounded-md h-11 px-4 text-sm flex items-center justify-between text-zinc-400";
  const selectPopoverClass = "bg-[#1c1c1f] border border-zinc-800 rounded-md shadow-xl text-white overflow-hidden";
  const listBoxItemClass = "px-4 py-2.5 text-sm hover:bg-zinc-800 cursor-pointer transition-colors text-zinc-300";

  // --- IMGBB IMAGE UPLOAD HANDLER ---
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      // আপনার ImgBB API Key এখানে বসাবেন
      const IMGBB_API_KEY = process.env.NEXT_PUBLIC_UPLOAD_IMAGE_API; 
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (result.success) {
        setLogoUrl(result.data.url);
      } else {
        alert("Upload failed. Please check your ImgBB API Key.");
      }
    } catch (error) {
      console.error("Error uploading logo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // --- FORM SUBMIT HANDLER (SAVE / UPDATE) ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const companyData = {
      name: formData.get("name"),
      website: formData.get("website"),
      industry: formData.get("industry"),
      location: formData.get("location"),
      employeeCount: formData.get("employeeCount"),
      description: formData.get("description"),
      logo: logoUrl,
      status: company?.status || "pending" // ডিফল্ট স্ট্যাটাস pending সেট হবে
    };

    console.log("Company Data to Save:", companyData);
    // এখানে ডাটাবেজে সেভ করার API কল করবেন 
    // e.g., await saveCompanyToDb(companyData);
    
    setCompany(companyData);
    setIsEditing(false);
    setIsSubmitting(false);
  };

  // --- ADMIN STATUS BADGE CONFIG ---
  const getStatusChip = (status) => {
    const variants = {
      pending: { color: "warning", label: "Pending Approval" },
      approved: { color: "success", label: "Approved" },
      rejected: { color: "danger", label: "Rejected" }
    };
    const current = variants[status] || variants.pending;
    return (
      <Chip color={current.color} variant="soft" size="sm" className="font-semibold capitalize text-[11px]">
        {current.label}
      </Chip>
    );
  };

  // ==========================================
  // CASE 1: NO COMPANY REGISTERED (PROMPT VIEW)
  // ==========================================
  if (!company && !isEditing) {
    return (
      <div className="min-h-[800] bg-[#09090b] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#141416] border border-zinc-800 rounded-xl p-8 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto border border-zinc-800">
            <Factory className="text-zinc-500 w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-white tracking-tight">Register Your Business</h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              You have not workspace details setup yet. Create a company profile to unlock candidate directory maps and job post visibility.
            </p>
          </div>
          <Button 
            onClick={() => setIsEditing(true)}
            className="w-full bg-white text-black font-semibold h-11 hover:bg-zinc-200 transition-all rounded-md text-sm shadow-sm"
          >
            Register Company
          </Button>
        </div>
      </div>
    );
  }

  // ==========================================
  // CASE 2: REGISTRATION / EDIT FORM MODE
  // ==========================================
  if (isEditing) {
    return (
      <div className="min-h-screen bg-[#09090b] text-zinc-200 py-12 px-4 sm:px-6 flex justify-center antialiased">
        <div className="w-full max-w-3xl bg-[#141416] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
          
          <div className="px-8 pt-8 flex items-center justify-between border-b border-zinc-800 pb-4">
            <div>
              <h1 className="text-lg font-medium text-white tracking-tight">
                {company ? "Configure Workspace Platform" : "Register New Company"}
              </h1>
              <p className="text-xs text-zinc-500 mt-0.5">Enter your business details to start hiring on HireLoop.</p>
            </div>
            {company && (
              <Button 
                isIconOnly
                variant="light"
                onClick={() => setIsEditing(false)}
                className="text-zinc-500 hover:text-white"
              >
                <ArrowLeft width={16} height={16} />
              </Button>
            )}
          </div>

          <Form onSubmit={handleFormSubmit} className="w-full flex-1">
            <div className="px-8 py-8 space-y-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Company Name */}
                <TextField isRequired name="name" defaultValue={company?.name} className="flex flex-col">
                  <Label className={labelClass}>Company Name</Label>
                  <Input placeholder="e.g. Acme Corp" className={inputClass} />
                </TextField>

                {/* Industry Picker */}
                <div className="flex flex-col w-full">
                  <Label className={labelClass}>Industry / Category</Label>
                  <Select name="industry" defaultSelectedKeys={[company?.industry || "technology"]} placeholder="Select context domain" className="w-full">
                    <Select.Trigger className={selectTriggerClass}>
                      <Select.Value className="text-white" />
                      <Select.Indicator><ChevronDown className="text-zinc-500 w-4 h-4" /></Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover className={selectPopoverClass}>
                      <ListBox className="outline-none">
                        <ListBox.Item id="technology" textValue="Technology" className={listBoxItemClass}>Technology</ListBox.Item>
                        <ListBox.Item id="marketing" textValue="Marketing" className={listBoxItemClass}>Marketing</ListBox.Item>
                        <ListBox.Item id="finance" textValue="Finance" className={listBoxItemClass}>Finance</ListBox.Item>
                        <ListBox.Item id="healthcare" textValue="Healthcare" className={listBoxItemClass}>Healthcare</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Website URL */}
                <TextField isRequired name="website" defaultValue={company?.website} className="flex flex-col">
                  <Label className={labelClass}>Website URL</Label>
                  <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-600 text-sm font-mono border-r border-zinc-800 pr-2">https://</span>
                    <Input placeholder="www.company.com" className={`${inputClass} pl-[72]`} />
                  </div>
                </TextField>

                {/* Location */}
                <TextField isRequired name="location" defaultValue={company?.location} className="flex flex-col">
                  <Label className={labelClass}>Location</Label>
                  <div className="relative w-full">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Pin className="text-zinc-500 w-4 h-4" />
                    </span>
                    <Input placeholder="City, Country" className={`${inputClass} pl-10`} />
                  </div>
                </TextField>

                {/* Employee Range */}
                <div className="flex flex-col w-full">
                  <Label className={labelClass}>Employee Count Range</Label>
                  <Select name="employeeCount" defaultSelectedKeys={[company?.employeeCount || "1-10"]} placeholder="Select size matrix" className="w-full">
                    <Select.Trigger className={selectTriggerClass}>
                      <Select.Value className="text-white" />
                      <Select.Indicator><ChevronDown className="text-zinc-500 w-4 h-4" /></Select.Indicator>
                    </Select.Trigger>
                    <Select.Popover className={selectPopoverClass}>
                      <ListBox className="outline-none">
                        <ListBox.Item id="1-10" textValue="1-10 employees" className={listBoxItemClass}>1-10 employees</ListBox.Item>
                        <ListBox.Item id="11-50" textValue="11-50 employees" className={listBoxItemClass}>11-50 employees</ListBox.Item>
                        <ListBox.Item id="51-200" textValue="51-200 employees" className={listBoxItemClass}>51-200 employees</ListBox.Item>
                        <ListBox.Item id="201+" textValue="201+ employees" className={listBoxItemClass}>201+ employees</ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                  </Select>
                </div>

                {/* Logo Image Upload Trigger Section */}
                <div className="flex flex-col">
                  <Label className={labelClass}>Company Logo</Label>
                  <div className="flex items-center gap-4 p-2 bg-[#1c1c1f] rounded-md border border-zinc-800/80 h-11 relative overflow-hidden">
                    <label className="flex items-center gap-2 cursor-pointer w-full h-full px-2">
                      <Clouds className="text-zinc-400 w-4 h-4" />
                      <span className="text-xs text-zinc-400">
                        {isUploading ? "Uploading to ImgBB..." : logoUrl ? "Image Loaded Successfully" : "Upload image (PNG, JPG up to 5MB)"}
                      </span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                    {logoUrl && (
                      <Image src={logoUrl} alt="Preview" width={32} height={32} className="w-8 h-8 rounded object-cover border border-zinc-700 ml-auto" />
                    )}
                  </div>
                </div>

                {/* Brief Description */}
                <TextField isRequired name="description" defaultValue={company?.description} className="md:col-span-2 flex flex-col">
                  <Label className={labelClass}>Brief Description</Label>
                  <TextArea placeholder="Tell us about your company's mission and culture..." className={textareaClass} />
                </TextField>

              </div>
            </div>

            {/* Submission Interactive Row */}
            <div className="px-8 py-5 border-t border-zinc-800 bg-[#141416] flex justify-end gap-4">
              {company && (
                <Button
                  type="button"
                  variant="flat"
                  onClick={() => setIsEditing(false)}
                  className="bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium px-5 text-sm rounded-md h-10"
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                isLoading={isSubmitting}
                className="bg-white text-black font-semibold shadow-sm hover:bg-zinc-200 px-6 text-sm rounded-md h-10"
              >
                {company ? "Update Profiles" : "Register Company"}
              </Button>
            </div>
          </Form>

        </div>
      </div>
    );
  }

  // ==========================================
  // CASE 3: REGISTERED COMPANY DETAILS DISPLAY
  // ==========================================
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-200 py-12 px-4 sm:px-6 flex justify-center antialiased">
      <div className="w-full max-w-3xl bg-[#141416] border border-zinc-800 rounded-xl shadow-2xl p-8 space-y-8 relative">
        
        {/* Profile Card Header Segment */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-zinc-800 pb-6 gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-[#1c1c1f] rounded-xl flex items-center justify-center border border-zinc-800 overflow-hidden shadow-inner">
              {company.logo ? (
                <Image src={company.logo} alt={company.name} className="w-full h-full object-cover" width={64} height={64} />
              ) : (
                <Factory className="text-zinc-600 w-7 h-7" />
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl font-bold text-white tracking-tight leading-none">{company.name}</h1>
                {getStatusChip(company.status)}
              </div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm">
                <span className="capitalize">{company.industry}</span>
                <span className="text-zinc-700">•</span>
                <div className="flex items-center gap-1">
                  <Persons className="w-3.5 h-3.5 text-zinc-500" />
                  <span>{company.employeeCount} Members</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setIsEditing(true)}
            className="bg-zinc-800 text-white font-medium hover:bg-zinc-700/80 transition-all rounded-md text-xs px-4 h-9 flex items-center gap-2 border border-zinc-700"
          >
            <Pencil width={12} height={12} /> Edit Workspace
          </Button>
        </div>

        {/* Informative Platform Data Grid Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#1c1c1f]/40 p-6 rounded-lg border border-zinc-800/60">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Corporate Hub Location</span>
            <div className="flex items-center gap-2 text-white font-medium text-sm pt-0.5">
              <Pin className="text-zinc-400 w-4 h-4" />
              <span>{company.location}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Public Web Destination</span>
            <div className="flex items-center gap-2 text-zinc-300 font-medium text-sm pt-0.5 hover:text-white transition-colors">
              <Globe className="text-zinc-400 w-4 h-4" />
              <a href={`https://${company.website}`} target="_blank" rel="noreferrer" className="underline underline-offset-4 font-mono">
                {company.website}
              </a>
            </div>
          </div>
        </div>

        {/* Textual Identity Core Summary */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-zinc-800 pb-2">
            Mission Statement & Workspace Details
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line bg-[#1c1c1f]/10 p-4 rounded-md border border-zinc-900">
            {company.description}
          </p>
        </div>

      </div>
    </div>
  );
}