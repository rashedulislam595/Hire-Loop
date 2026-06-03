"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { FiArrowRight } from "react-icons/fi";

export default function NextRoleSection() {
  return (
    <section className="bg-black pt-10">
      
      {/* Container */}
      <div className="relative h-[550] rounded-[40px] flex items-center justify-center max-w-7xl mx-auto">
        
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/cta-bg.png"
            alt="CTA Background"
            fill
            priority
            className="mt-10"
          />
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Glow Effect ONLY inside image */}
        <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
          <div className="absolute top-[50] left-1/2 -translate-x-1/2 w-[750] h-[350] bg-violet-600/25 blur-3xl rounded-full" />
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black to-transparent z-30" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          
          <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            Your next role is
            <br />
            already looking for you
          </h1>

          <p className="mt-5 text-gray-300 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Button
              radius="full"
              size="lg"
              endContent={<FiArrowRight size={18} />}
              className="bg-white text-black font-medium px-7 h-14 text-base hover:scale-105 transition-transform duration-300"
            >
              Create a free account
            </Button>

            <Button
              radius="full"
              size="lg"
              variant="bordered"
              className="border-white/20 bg-white/5 backdrop-blur-md text-white px-7 h-14 text-base hover:bg-white/10 transition-all duration-300"
            >
              View pricing
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}