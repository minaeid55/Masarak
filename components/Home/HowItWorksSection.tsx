import React from "react";
import { FiUploadCloud, FiCpu, FiCheckCircle } from "react-icons/fi";
 
// HowItWorksSection.tsx is for home section "How It Works" with three steps 
export function HowItWorksSection(): React.ReactElement {
  return (
    <section
      id="how-it-works"
      className="py-24 relative z-10 bg-gradient-to-b from-[#0f0f1a] to-[#05050a]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Three simple steps to accelerate your career journey.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/30 to-purple-500/30 hover:from-indigo-500 hover:to-purple-500 transition duration-300">
            <div className="bg-[#0b0b14] rounded-2xl p-8 text-center h-full">
              <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 text-2xl mb-6 group-hover:scale-110 transition">
                <FiUploadCloud />
              </div>

              <span className="text-sm text-indigo-400 font-semibold">
                Step 01
              </span>

              <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                Upload CV
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Drop your resume and we’ll extract and structure your data
                automatically.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 hover:from-purple-500 hover:to-pink-500 transition duration-300">
            <div className="bg-[#0b0b14] rounded-2xl p-8 text-center h-full">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-2xl mb-6 group-hover:scale-110 transition">
                <FiCpu />
              </div>

              <span className="text-sm text-purple-400 font-semibold">
                Step 02
              </span>

              <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                AI Analysis
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                We analyze your CV, improve structure, and highlight missing
                skills.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-indigo-500/30 to-blue-500/30 hover:from-indigo-500 hover:to-blue-500 transition duration-300">
            <div className="bg-[#0b0b14] rounded-2xl p-8 text-center h-full">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl mb-6 group-hover:scale-110 transition">
                <FiCheckCircle />
              </div>

              <span className="text-sm text-blue-400 font-semibold">
                Step 03
              </span>

              <h3 className="text-xl font-semibold text-white mt-2 mb-3">
                Get Matches
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                Get the best job opportunities based on your skills and profile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}