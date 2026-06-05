"use client";

import React, { useState } from "react";
import {
    Form,
    TextField,
    Label,
    Input,
    TextArea,
    Button,
    Switch,
    Select,
    ListBox,
} from "@heroui/react";
import {
    Briefcase,
    Pin,
    Calendar,
    Globe,
    House,
    ChevronDown,
    Xmark
} from "@gravity-ui/icons";
import { toast } from "react-toastify";
import { createJob } from "@/lib/actions/jobs";
import { redirect } from "next/navigation";

export default function PostJobPage() {
    const [isRemote, setIsRemote] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Simulation: Auto-filled and verified state from Recruiter Context
    const companyData = {
        id: "co_9837421",
        name: "Acme Corp",
        website: "www.acmecorp.dev",
        isApproved: true,
    };

    // Reusable styling parameters conforming to your dark style guide
    const labelClass = "text-zinc-400 font-medium mb-1.5 text-xs tracking-wide uppercase block";

    const inputClass = "w-full bg-[#27272a] hover:bg-[#3f3f46] focus:bg-[#27272a] text-white placeholder:text-zinc-600 rounded-md px-3 py-2.5 text-sm border border-transparent shadow-none focus:outline-none transition-colors min-h-10";

    const textareaClass = "w-full bg-[#27272a] hover:bg-[#3f3f46] focus:bg-[#27272a] text-white placeholder:text-zinc-600 rounded-md px-3 py-2.5 text-sm border border-transparent shadow-none focus:outline-none transition-colors resize-y min-h-[120px]";

    const selectTriggerClass = "w-full bg-[#27272a] hover:bg-[#3f3f46] text-white rounded-md px-3 py-2.5 flex justify-between items-center min-h-10 text-sm border border-transparent shadow-none focus:outline-none transition-colors data-[pressed=true]:bg-[#27272a]";
    const selectPopoverClass = "bg-[#18181b] border border-zinc-800 text-white rounded-md shadow-2xl p-1 min-w-[240px]";
    const listBoxItemClass = "px-3 py-2 text-sm rounded-md hover:bg-zinc-800 cursor-pointer text-zinc-200 focus:bg-zinc-800 focus:text-white outline-none transition-colors data-[selected=true]:bg-zinc-800 data-[selected=true]:text-white flex justify-between items-center";

    const handlePostJob = async (e) => {
        e.preventDefault();

        if (!companyData.isApproved) {
            toast.error("Your company account must be approved before publishing active jobs on HireLoop.");
            return;
        }

        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        const payload = {
            title: data.title,
            category: data.category,
            jobType: data.jobType,
            salary: {
                min: Number(data.minSalary) || null,
                max: Number(data.maxSalary) || null,
                currency: data.currency || "USD"
            },
            location: isRemote ? "Remote" : data.location,
            isRemote: isRemote,
            deadline: data.deadline,
            description: {
                responsibilities: data.responsibilities,
                requirements: data.requirements,
                benefits: data.benefits || ""
            },
            companyId: companyData.id,
            status: "active",
            visibility: "public"
        };

        const result = await createJob(payload);
        if(result.insertedId) {
            toast.success("Job vacancy successfully published to the HireLoop public directory!");
            e.target.reset();
            redirect("/dashboard/recruiter");
        } else {
            toast.error("Failed to publish job vacancy.");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#09090b] flex justify-center py-12 px-4 sm:px-6 antialiased text-zinc-200">
            <div className="w-full max-w-4xl bg-[#18181b] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">

                {/* Module Header Container featuring HireLoop Branding */}
                <div className="px-8 py-6 border-b border-zinc-800 flex items-center justify-between bg-[#1c1c1f]">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold tracking-widest text-white uppercase bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                                HIRELOOP
                            </span>
                            <span className="text-zinc-600 text-xs">/</span>
                            <span className="text-zinc-400 text-xs font-medium">Recruiter Workspace</span>
                        </div>
                        <h1 className="text-xl font-semibold text-white tracking-tight mt-1">Create a Job Opening</h1>
                        <p className="text-xs text-zinc-400 mt-0.5">
                            Deploy a public job document linked to workspace: <span className="text-zinc-200 font-medium">{companyData.name}</span>.
                        </p>
                    </div>
                    <Button isIconOnly variant="light" className="text-zinc-400 hover:text-white transition-colors">
                        <Xmark width={18} height={18} />
                    </Button>
                </div>

                <Form onSubmit={handlePostJob} className="w-full flex-1">
                    <div className="px-8 py-8 space-y-10">

                        {/* --- BLOCK 1: JOB DETAILS META --- */}
                        <div className="space-y-6">
                            <h2 className="text-white font-medium flex items-center gap-2 text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">
                                <Briefcase width={14} className="text-zinc-400" /> Job Core Metadata
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Job Title Definition Field */}
                                <TextField isRequired name="title" className="md:col-span-2 flex flex-col">
                                    <Label className={labelClass}>Job Title</Label>
                                    <Input placeholder="e.g. Senior Frontend Infrastructure Architect" className={inputClass} />
                                </TextField>

                                {/* Composable Category Picker */}
                                <div className="flex flex-col w-full">
                                    <Label className={labelClass}>Job Category</Label>
                                    <Select name="category" placeholder="Select context domain" className="w-full">
                                        <Select.Trigger className={selectTriggerClass}>
                                            <Select.Value className="text-white" />
                                            <Select.Indicator><ChevronDown className="text-zinc-500 w-4 h-4" /></Select.Indicator>
                                        </Select.Trigger>
                                        <Select.Popover className={selectPopoverClass}>
                                            <ListBox className="outline-none">
                                                <ListBox.Item id="technology" textValue="Technology" className={listBoxItemClass}>Technology</ListBox.Item>
                                                <ListBox.Item id="marketing" textValue="Marketing" className={listBoxItemClass}>Marketing</ListBox.Item>
                                                <ListBox.Item id="sales" textValue="Sales" className={listBoxItemClass}>Sales</ListBox.Item>
                                                <ListBox.Item id="design" textValue="Design" className={listBoxItemClass}>Design</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Composable Retention Type Picker */}
                                <div className="flex flex-col w-full">
                                    <Label className={labelClass}>Job Type</Label>
                                    <Select name="jobType" placeholder="Select classification" className="w-full">
                                        <Select.Trigger className={selectTriggerClass}>
                                            <Select.Value className="text-white" />
                                            <Select.Indicator><ChevronDown className="text-zinc-500 w-4 h-4" /></Select.Indicator>
                                        </Select.Trigger>
                                        <Select.Popover className={selectPopoverClass}>
                                            <ListBox className="outline-none">
                                                <ListBox.Item id="full-time" textValue="Full-time" className={listBoxItemClass}>Full-time</ListBox.Item>
                                                <ListBox.Item id="part-time" textValue="Part-time" className={listBoxItemClass}>Part-time</ListBox.Item>
                                                <ListBox.Item id="contract" textValue="Contract" className={listBoxItemClass}>Contract</ListBox.Item>
                                                <ListBox.Item id="internship" textValue="Internship" className={listBoxItemClass}>Internship</ListBox.Item>
                                            </ListBox>
                                        </Select.Popover>
                                    </Select>
                                </div>

                                {/* Combined Financial Compensation Grid */}
                                <div className="grid grid-cols-3 gap-4 md:col-span-2 items-end">
                                    <TextField name="minSalary" className="flex flex-col">
                                        <Label className={labelClass}>Min Salary</Label>
                                        <Input type="number" placeholder="Min limit" className={inputClass} />
                                    </TextField>

                                    <TextField name="maxSalary" className="flex flex-col">
                                        <Label className={labelClass}>Max Salary</Label>
                                        <Input type="number" placeholder="Max limit" className={inputClass} />
                                    </TextField>

                                    <div className="flex flex-col w-full">
                                        <Label className={labelClass}>Currency</Label>
                                        <Select name="currency" defaultSelectedKeys={["usd"]} className="w-full">
                                            <Select.Trigger className={selectTriggerClass}>
                                                <Select.Value className="text-white" />
                                                <Select.Indicator><ChevronDown className="text-zinc-500 w-4 h-4" /></Select.Indicator>
                                            </Select.Trigger>
                                            <Select.Popover className={selectPopoverClass}>
                                                <ListBox className="outline-none">
                                                    <ListBox.Item id="usd" textValue="USD ($)" className={listBoxItemClass}>USD ($)</ListBox.Item>
                                                    <ListBox.Item id="eur" textValue="EUR (€)" className={listBoxItemClass}>EUR (€)</ListBox.Item>
                                                    <ListBox.Item id="gbp" textValue="GBP (£)" className={listBoxItemClass}>GBP (£)</ListBox.Item>
                                                </ListBox>
                                            </Select.Popover>
                                        </Select>
                                    </div>
                                </div>

                                {/* Geography Matrix Input Fields */}
                                <div className="md:col-span-2 flex flex-col sm:flex-row gap-6 items-end">
                                    <TextField name="location" className="flex-1 flex flex-col w-full">
                                        <Label className={labelClass}>Location (City, Country)</Label>
                                        <div className="relative w-full">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <Pin className="text-zinc-500 w-4 h-4" />
                                            </span>
                                            <Input
                                                placeholder={isRemote ? "Not required for Remote jobs" : "e.g. San Francisco, CA"}
                                                disabled={isRemote}
                                                className={`${inputClass} pl-10 disabled:opacity-30 disabled:cursor-not-allowed`}
                                            />
                                        </div>
                                    </TextField>

                                    {/* Clean Hero UI v3 Valid Composable Switch Layer */}
                                    <Switch
                                        isSelected={isRemote}
                                        onChange={setIsRemote}
                                        className="flex items-center gap-4 h-11 px-4 bg-[#27272a] rounded-md self-stretch sm:self-auto justify-between sm:justify-start min-w-[170] cursor-pointer"
                                    >
                                        <Switch.Content className="flex items-center gap-2 select-none">
                                            {isRemote ? <div className="flex gap-2"><Globe className="text-zinc-400 w-4 h-4" />
                                                <Label className="text-sm text-zinc-300 font-medium cursor-pointer">Remote </Label></div> :
                                                <div className="flex gap-2">
                                                    <Pin className="text-zinc-400 w-4 h-4" />
                                                    <span className="text-sm text-zinc-300 font-medium">Onsite</span>
                                                </div>}
                                        </Switch.Content>
                                        <Switch.Control>
                                            <Switch.Thumb />
                                        </Switch.Control>
                                    </Switch>
                                </div>

                                {/* Application Lifecycle Constraint */}
                                <TextField name="deadline" className="flex flex-col">
                                    <Label className={labelClass}>Application Deadline</Label>
                                    <div className="relative w-full">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <Calendar className="text-zinc-500 w-4 h-4" />
                                        </span>
                                        <Input type="date" className={`${inputClass} pl-10 color-scheme:dark`} />
                                    </div>
                                </TextField>
                            </div>
                        </div>

                        {/* --- BLOCK 2: ROLE DESCRIPTION SUB-FORM --- */}
                        <div className="space-y-6 pt-2">
                            <h2 className="text-white font-medium flex items-center gap-2 text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">
                                Job Context Details
                            </h2>
                            <div className="space-y-6">

                                <TextField isRequired name="responsibilities" className="flex flex-col">
                                    <Label className={labelClass}>Core Accountabilities & Responsibilities</Label>
                                    <TextArea placeholder="Outline clear execution expectations, regular workflows, and targets..." className={textareaClass} />
                                </TextField>

                                <TextField isRequired name="requirements" className="flex flex-col">
                                    <Label className={labelClass}>Experience Specifications & Requirements</Label>
                                    <TextArea placeholder="Detail essential educational baselines, professional engineering years, and functional skills..." className={textareaClass} />
                                </TextField>

                                <TextField name="benefits" className="flex flex-col">
                                    <Label className={labelClass}>Perks & Benefits Portfolio (Optional)</Label>
                                    <TextArea placeholder="Provide optional information on health options, asset stipends, remote offsets..." className={textareaClass} />
                                </TextField>

                            </div>
                        </div>

                        {/* --- BLOCK 3: ORIGIN VERIFICATION (READ ONLY) --- */}
                        <div className="space-y-4 pt-2">
                            <h2 className="text-white font-medium text-xs uppercase tracking-widest border-b border-zinc-800 pb-2">
                                Posting Origin Authorization
                            </h2>
                            <div className="flex items-center gap-4 p-4 bg-[#1f1f23] rounded-lg border border-zinc-800/80">
                                <div className="w-12 h-12 bg-[#27272a] rounded-lg flex items-center justify-center border border-zinc-700/40">
                                    <House className="text-zinc-400 w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-white text-sm font-semibold leading-none">{companyData.name}</p>
                                        <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 text-[10px] font-medium tracking-wide uppercase rounded border border-emerald-800/40">
                                            HireLoop Verified
                                        </span>
                                    </div>
                                    <p className="text-zinc-500 text-xs mt-1.5">This job listing will go live automatically on the platform upon submission.</p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Module Form Submission Footer */}
                    <div className="px-8 py-5 border-t border-zinc-800 bg-[#141416] flex justify-end gap-4 rounded-b-xl">
                        <Button
                            type="button"
                            variant="flat"
                            className="bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50 font-medium px-5 transition-all text-sm rounded-md"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="bg-white text-black font-semibold shadow-sm hover:bg-zinc-200 px-6 transition-all text-sm rounded-md"
                        >
                            Post Job Listing
                        </Button>
                    </div>
                </Form>

            </div>
        </div>
    );
}