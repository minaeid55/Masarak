import React from 'react';
import { FiZap, FiBriefcase, FiBarChart2, FiUser } from 'react-icons/fi';
// FeaturesList.tsx is for home section "Powerful Features for Your Career"  

export function FeaturesList(): React.ReactElement {
  return (
    <div className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-4xl font-bold mb-4">
            Powerful Features for Your Career
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our AI-driven platform provides everything you need to stand out to
            employers and land your dream job faster.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Feature 1 */}
          <div className="relative rounded-2xl p-[1px] bg-transparent group">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 blur-md"></div>
            <div className="glass-card relative rounded-2xl p-6 flex flex-col items-start transition-all duration-300 group-hover:-translate-y-2">

              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FiZap className="text-white text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                AI CV Analyzer
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Instant feedback on your resume with actionable suggestions to improve
                your ATS score.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative rounded-2xl p-[1px] bg-transparent group">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 blur-md"></div>
            <div className="glass-card relative rounded-2xl p-6 flex flex-col items-start transition-all duration-300 group-hover:-translate-y-2">

              <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FiBriefcase className="text-white text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                Smart Job Matching
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Our algorithm pairs your unique skills and experience with the perfect job
                opportunities.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative rounded-2xl p-[1px] bg-transparent group">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 blur-md"></div>
            <div className="glass-card relative rounded-2xl p-6 flex flex-col items-start transition-all duration-300 group-hover:-translate-y-2">

              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FiBarChart2 className="text-white text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                Skill Gap Analysis
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                Identify what skills you’re missing for your target roles and get
                personalized learning paths.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative rounded-2xl p-[1px] bg-transparent group">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 blur-md"></div>
            <div className="glass-card relative rounded-2xl p-6 flex flex-col items-start transition-all duration-300 group-hover:-translate-y-2">

              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FiUser className="text-white text-xl" />
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                AI Career Coach
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed">
                24/7 access to an intelligent assistant for interview prep, salary
                negotiation, and career advice.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}