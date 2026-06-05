"use client";

import React, { useState, useTransition } from 'react';
import { Table, Chip, Button } from "@heroui/react";
import { 
  Eye, 
  Pencil, 
  TrashBin, 
  Globe, 
  Pin 
} from "@gravity-ui/icons";

export function JobsTableList({ initialJobs }) {
  const [jobs, setJobs] = useState(initialJobs);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (jobId) => {
    if (confirm("Are you sure you want to delete this job vacancy from HireLoop?")) {
      startTransition(async () => {
        // এখানে আপনার ডিলিট API কল করতে পারেন
        // e.g., await deleteJobApi(jobId);
        setJobs((prev) => prev.filter(job => (job._id?.$oid || job._id) !== jobId));
      });
    }
  };

  return (
    <Table className="bg-[#18181b]">
      <Table.ResizableContainer>
        <Table.Content aria-label="HireLoop job management directory" className="min-w-[800]">
          
          {/* Table Header Structure */}
          <Table.Header>
            <Table.Column isRowHeader defaultWidth="2fr" id="jobTitle" minWidth={200}>
              Job Title
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="category" minWidth={140}>
              Category & Type
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="location" minWidth={130}>
              Location
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.3fr" id="salary" minWidth={140}>
              Salary Range
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1fr" id="status" minWidth={100}>
              Status
              <Table.ColumnResizer />
            </Table.Column>
            <Table.Column defaultWidth="1.2fr" id="actions" minWidth={130}>
              Actions
            </Table.Column>
          </Table.Header>

          {/* Table Body - Dynamic Mapping */}
          <Table.Body emptyContent={"No jobs found for this organization."}>
            {jobs.map((job) => {
              const jobId = job._id?.$oid || job._id;

              return (
                <Table.Row key={jobId} className="hover:bg-zinc-900/40 border-b border-zinc-800/50 transition-colors">
                  
                  {/* 1. Job Title Meta */}
                  <Table.Cell>
                    <div className="flex flex-col py-1">
                      <span className="text-sm font-semibold text-white tracking-tight">{job.title}</span>
                      <span className="text-[11px] text-zinc-500 mt-0.5">Deadline: {job.deadline}</span>
                    </div>
                  </Table.Cell>

                  {/* 2. Category & Type Badges */}
                  <Table.Cell>
                    <div className="flex flex-col items-start gap-1">
                      <span className="text-xs text-zinc-300 capitalize font-medium">{job.jobCategory}</span>
                      <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold">{job.jobType}</span>
                    </div>
                  </Table.Cell>

                  {/* 3. Location Context (Remote / Onsite) */}
                  <Table.Cell>
                    <div className="flex items-center gap-1.5 text-zinc-300">
                      {job.isRemote ? (
                        <>
                          <Globe className="text-emerald-400 w-3.5 h-3.5" />
                          <span className="text-xs font-medium text-emerald-400">Remote</span>
                        </>
                      ) : (
                        <>
                          <Pin className="text-zinc-500 w-3.5 h-3.5" />
                          <span className="text-xs">{job.location || "Onsite"}</span>
                        </>
                      )}
                    </div>
                  </Table.Cell>

                  {/* 4. Salary Matrix */}
                  <Table.Cell>
                    <span className="text-xs text-zinc-300 font-mono">
                      {Number(job.salary.min).toLocaleString()} - {Number(job.salary.max).toLocaleString()}{" "}
                      <span className="text-[10px] text-zinc-500 font-sans">{job.currency}</span>
                    </span>
                  </Table.Cell>

                  {/* 5. Job Posting Status */}
                  <Table.Cell>
                    <Chip 
                      color={job.status === "active" ? "success" : "danger"} 
                      size="sm" 
                      variant="soft"
                      className="capitalize font-medium text-[11px]"
                    >
                      {job.status}
                    </Chip>
                  </Table.Cell>

                  {/* 6. Action Icon Buttons */}
                  <Table.Cell>
                    <div className="flex items-center gap-1">
                      {/* View Details Button (Only visible if job status is active) */}
                      {job.status === "active" && (
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="light" 
                          className="text-zinc-400 hover:text-white hover:bg-zinc-800 min-w-8 w-8 h-8 rounded-md transition-colors"
                          aria-label="View Details"
                        >
                          <Eye width={15} height={15} />
                        </Button>
                      )}
                      
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        className="text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 min-w-8 w-8 h-8 rounded-md transition-colors"
                        aria-label="Edit Job"
                      >
                        <Pencil width={14} height={14} />
                      </Button>

                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        disabled={isPending}
                        onClick={() => handleDelete(jobId)}
                        className="text-zinc-400 hover:text-rose-500 hover:bg-zinc-800 min-w-8 w-8 h-8 rounded-md transition-colors disabled:opacity-30"
                        aria-label="Delete Job"
                      >
                        <TrashBin width={14} height={14} />
                      </Button>
                    </div>
                  </Table.Cell>

                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table.ResizableContainer>
    </Table>
  );
}