import React from "react";
import { FaMicrosoft, FaAmazon, FaSpotify, FaSlack } from "react-icons/fa";

// CompaniesSection.tsx is for home section "Trusted by Hiring Managers at Top Companies"
export function CompaniesSection(): React.ReactElement {
  return (
    <section
      id="trust"
      className="py-24 relative z-10 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Title */}
        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-12">
          Trusted by Hiring Managers at Top Companies
        </p>

        {/* Logos */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          
          {/* Microsoft */}
          <div className="group relative p-[1px] rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 hover:from-indigo-500 hover:to-purple-500 transition">
            <div className="glass-card px-8 py-5 rounded-xl flex items-center gap-3 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
              <FaMicrosoft className="text-3xl text-white" />
              <span className="text-lg font-semibold text-white">
                Microsoft
              </span>
            </div>
          </div>

          {/* Amazon */}
          <div className="group relative p-[1px] rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500 hover:to-orange-500 transition">
            <div className="glass-card px-8 py-5 rounded-xl flex items-center gap-3 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
              <FaAmazon className="text-3xl text-white" />
              <span className="text-lg font-semibold text-white">
                Amazon
              </span>
            </div>
          </div>

          {/* Spotify */}
          <div className="group relative p-[1px] rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500 hover:to-emerald-500 transition">
            <div className="glass-card px-8 py-5 rounded-xl flex items-center gap-3 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
              <FaSpotify className="text-3xl text-white" />
              <span className="text-lg font-semibold text-white">
                Spotify
              </span>
            </div>
          </div>

          {/* Slack */}
          <div className="group relative p-[1px] rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500 hover:to-purple-500 transition">
            <div className="glass-card px-8 py-5 rounded-xl flex items-center gap-3 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300">
              <FaSlack className="text-3xl text-white" />
              <span className="text-lg font-semibold text-white">
                Slack
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}