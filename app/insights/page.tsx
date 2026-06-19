"use client";

import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function InsightsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050509] text-white">
        <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-[#0b1018] p-12 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Insights</p>
          <h1 className="mt-4 text-5xl font-bold text-white">Your hiring insights at a glance</h1>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">
            Track your CV performance, matching trends, and hiring momentum in one centralized dashboard.
          </p>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
