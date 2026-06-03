import React from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-black  text-gray-400">
  <div className="max-w-7xl mx-auto px-6 py-16">
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-12">
      
      {/* Left Section */}
      <div className="lg:col-span-2">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className='text-4xl font-bold text-blue-800'>Hire<span className='text-white'>Loop</span></h2>
        </div>

        {/* Description */}
        <p className="max-w-sm leading-7 text-sm text-gray-500">
          The AI-native career platform. Built for people who take their work
          seriously.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4 mt-8">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
          >
            <FaFacebook />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="#"
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition"
          >
            <FaInstagramSquare />
          </a>
        </div>
      </div>

      {/* Product */}
      <div>
        <h3 className="text-white font-semibold mb-5">Product</h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="#" className="hover:text-white transition">
              Job discovery
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition">
              Worker AI
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition">
              Companies
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition">
              Salary data
            </a>
          </li>
        </ul>
      </div>

      {/* Navigation */}
      <div>
        <h3 className="text-white font-semibold mb-5">Navigations</h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="#" className="hover:text-white transition">
              Help center
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition">
              Career library
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </li>
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h3 className="text-white font-semibold mb-5">Resources</h3>

        <ul className="space-y-3 text-sm">
          <li>
            <a href="#" className="hover:text-white transition">
              Brand Guideline
            </a>
          </li>

          <li>
            <a href="#" className="hover:text-white transition">
              Newsroom
            </a>
          </li>
        </ul>
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
      <p>Copyright 2024 — Programming Hero</p>

      <div className="flex items-center gap-5">
        <a href="#" className="hover:text-white transition">
          Terms & Policy
        </a>

        <a href="#" className="hover:text-white transition">
          Privacy Guideline
        </a>
      </div>
    </div>
  </div>
</footer>
    );
};

export default Footer;