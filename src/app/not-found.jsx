"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-4 overflow-hidden relative">

      {/* Background Blur */}
      <div className="absolute top-[-120] left-[-120] w-[300] h-[300] bg-violet-600/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-[-120] right-[-120] w-[300] h-[300] bg-pink-600/20 blur-[120px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl">
        
        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-bold leading-none bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-semibold mt-6 mb-5">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-base md:text-lg leading-8 max-w-xl mx-auto mb-10">
          Sorry, the page you are looking for doesn’t exist or
          has been moved to another location.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          {/* Home Button */}
          <Link href="/">
            <Button className="bg-white text-black h-14 px-8 rounded-2xl font-medium">
              <div className="flex items-center gap-2">
                <FiHome size={18} />
                Back to Home
              </div>
            </Button>
          </Link>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="h-14 px-8 rounded-2xl border border-[#26262F] bg-[#111116] hover:bg-[#18181F] transition flex items-center gap-2 text-white"
          >
            <FiArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Bottom Text */}
        <p className="text-sm text-gray-500 mt-10">
          Error Code: 404 | Resource unavailable
        </p>
      </div>
    </section>
  );
}