"use client";

import {
    Button,
    Card,
    CardContent,
    Chip,
    Input,
} from "@heroui/react";

import {
    FiBriefcase,
    FiMapPin,
    FiSearch,
} from "react-icons/fi";

const trendingJobs = [
    "Product Designer",
    "AI Engineering",
    "DevOps Engineer",
];

export default function Banner() {
    return (
        <main className="relative bg-black text-white pt-20">
            {/* Background */}
            <div className="absolute" />

            <section className="relative z-10 flex items-center justify-center px-4">
                <div className="w-full max-w-5xl text-center">
                    {/* Premium Badge */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative">

                            {/* Left Line */}
                            <div className="absolute left-[-70] top-1/2 h-px w-16 -translate-y-1/2 bg-linear-to-r from-transparent to-white/20" />

                            {/* Right Line */}
                            <div className="absolute right-[-70] top-1/2 h-px w-16 -translate-y-1/2 bg-linear-to-l from-transparent to-white/20" />

                            {/* Badge */}
                            <div className="flex items-center gap-3 rounded-full  bg-linear-to-b from-[#313131] to-[#111111] px-6 py-2 shadow-[0_0_30px_rgba(255,255,255,0.03)] backdrop-blur-2xl">

                                {/* Icon */}
                                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-linear-to-br from-orange-500 to-orange-400 shadow-md">
                                    <FiBriefcase
                                        className="text-black"
                                        size={11}
                                    />
                                </div>

                                {/* Text */}
                                <div className="flex items-center gap-2">
                                    <span className="text-[13px] font-semibold tracking-wide text-white">
                                        50,000+
                                    </span>

                                    <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-gray-500">
                                        New Jobs This Month
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-5xl font-bold leading-tight md:text-7xl">
                        Find Your Dream Job Today
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
                        HireLoop connects top talent with world-class companies.
                        Browse thousands of curated opportunities and land your
                        next role — faster.
                    </p>

                    {/* Search Card */}
                    <Card className="mx-auto mt-12 max-w-4xl border border-white/10 bg-white/5 backdrop-blur-2xl">
                        <CardContent className="p-3">
                            <div className="flex flex-col gap-3 md:flex-row">

                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <FiSearch className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400" />

                                    <Input
                                        placeholder="Job title, skill or company"
                                        size="lg"
                                        radius="lg"
                                        variant="flat"
                                        className="w-full pl-10"
                                    />
                                </div>

                                {/* Location Input */}
                                <div className="relative flex-1">
                                    <FiMapPin className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400 items-center" />

                                    <Input
                                        placeholder="Location or Remote"
                                        size="lg"
                                        radius="lg"
                                        variant="flat"
                                        className="w-full pl-10 "

                                    />
                                </div>

                                {/* Button */}
                                <Button
                                    isIconOnly
                                    size="lg"
                                    radius="lg"
                                    className="bg-violet-600 text-white hover:bg-violet-500"
                                >
                                    <FiSearch size={20} />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trending */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <span className="text-sm text-gray-500">
                            Trending Position
                        </span>

                        {trendingJobs.map((job) => (
                            <Chip
                                key={job}
                                variant="flat"
                                className="border border-white/10 bg-white/5 text-gray-300"
                            >
                                {job}
                            </Chip>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}