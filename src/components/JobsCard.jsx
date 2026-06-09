"use client";

import {
  Card,
  CardContent,
  Button,
  Chip,
} from "@heroui/react";

import {
  FiArrowRight,
  FiMapPin,
  FiBriefcase,
} from "react-icons/fi";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    desc: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 2,
    title: "Frontend Developer",
    desc: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 3,
    title: "Frontend Developer",
    desc: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 4,
    title: "Frontend Developer",
    desc: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 5,
    title: "Frontend Developer",
    desc: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
  {
    id: 6,
    title: "Frontend Developer",
    desc: "Showcase your commitment to diversity and inclusion by highlighting initiatives",
    location: "New York, USA",
    type: "Hybrid",
    salary: "€25–€40/hour",
  },
];

export default function JobsCard() {
  return (
    <section className="bg-black text-white sm:pt-44 pt-96 pb-20 px-4 md:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>

            <p className="uppercase tracking-[3px] text-xs text-gray-400">
              Smart Job Discovery
            </p>

            <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
            The roles you did never <br />
            find by searching
          </h1>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="bg-[#101014] border border-[#1D1D24] rounded-3xl shadow-none"
            >
              <CardContent className="p-7">
                {/* Title */}
                <h2 className="text-3xl font-medium mb-4">
                  {job.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {job.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-10">
                  <Chip
                    variant="flat"
                    className="bg-[#1A1A20] border border-[#25252D] text-gray-300"
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <FiMapPin size={12} />
                      {job.location}
                    </div>
                  </Chip>

                  <Chip
                    variant="flat"
                    className="bg-[#1A1A20] border border-[#25252D] text-gray-300"
                  >
                    <div className="flex items-center gap-1 text-xs">
                      <FiBriefcase size={12} />
                      {job.type}
                    </div>
                  </Chip>

                  <Chip
                    variant="flat"
                    className="bg-[#1A1A20] border border-[#25252D] text-gray-300 text-xs"
                  >
                    {job.salary}
                  </Chip>
                </div>

                {/* Button */}
                <button className="flex items-center gap-2 text-sm hover:text-violet-300 transition-all">
                  Apply Now
                  <FiArrowRight size={15} />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="flex justify-center mt-14">
          <Button
            className="bg-white text-black px-8 font-medium rounded-md"
            radius="md"
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  );
}