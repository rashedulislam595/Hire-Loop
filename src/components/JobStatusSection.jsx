"use client";

import Image from "next/image";
import { Card, CardBody, CardContent } from "@heroui/react";

import {
  FiBriefcase,
  FiHome,
  FiUsers,
  FiStar,
} from "react-icons/fi";

export default function JobStatsSection() {
  const stats = [
    {
      id: 1,
      icon: <FiBriefcase size={18} />,
      value: "50K",
      label: "Active Jobs",
    },
    {
      id: 2,
      icon: <FiHome size={18} />,
      value: "12K",
      label: "Companies",
    },
    {
      id: 3,
      icon: <FiUsers size={18} />,
      value: "2M",
      label: "Job Seekers",
    },
    {
      id: 4,
      icon: <FiStar size={18} />,
      value: "97%",
      label: "Satisfaction Rate",
    },
  ];

  return (
    <section className="relative  bg-black h-[620]">
      {/* Main Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Stars Layer */}
      <div className="absolute inset-0 opacity-40">
        <div className="h-full w-full bg-[url('/images/globe.png')] bg-cover bg-center" />
      </div>

      {/* Content */}
      <div className="absolute top-95 z-40 w-full mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className=" mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold leading-tight text-white md:text-4xl">
            Assisting over{" "}
            <span className="text-indigo-400">15,000</span> job seekers
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Cards */}
        <div className=" w-full mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((item) => (
            <Card
              key={item.id}
              shadow="lg"
              radius="lg"
              className="bg-linear-to-b from-[#010102] to-[#313131] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/40"
            >
              <CardContent className="relative p-4">
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-linear-to-b from-indigo-500/10 to-transparent opacity-0 transition duration-300 hover:opacity-100" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300">
                    {item.icon}
                  </div>

                  {/* Number */}
                  <h3 className="text-5xl font-bold tracking-tight text-white">
                    {item.value}
                  </h3>

                  {/* Label */}
                  <p className="mt-3 text-sm text-white/60">
                    {item.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}