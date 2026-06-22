"use client";

import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function InsightsPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050509] text-white">
        <Navbar />
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto rounded-4xl border border-white/10 bg-[#0b1018] p-12 shadow-2xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Insights</p>
          <h1 className="mt-4 text-5xl font-bold text-white">Your hiring insights at a glance</h1>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">
            Track your CV performance, matching trends, and hiring momentum in one centralized dashboard.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/5 bg-slate-950/80 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Monthly user growth</p>
                  <h2 className="mt-3 text-4xl font-semibold text-white">+28% this month</h2>
                </div>
                <div className="rounded-3xl bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200">
                  8.3k users
                </div>
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between text-xs uppercase text-gray-500">
                  <span>Week 1</span>
                  <span className="font-semibold text-white">1.2k</span>
                </div>
                <div className="h-48 w-full rounded-3xl bg-slate-900/80 p-4">
                  <div className="relative flex h-full items-end gap-3">
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-violet-500/20" />
                      <div className="mx-auto h-24 w-6 rounded-full bg-violet-500" />
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-indigo-500/20" />
                      <div className="mx-auto h-28 w-6 rounded-full bg-indigo-500" />
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-sky-500/20" />
                      <div className="mx-auto h-32 w-6 rounded-full bg-sky-500" />
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-cyan-500/20" />
                      <div className="mx-auto h-36 w-6 rounded-full bg-cyan-500" />
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-indigo-400/20" />
                      <div className="mx-auto h-40 w-6 rounded-full bg-indigo-400" />
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-purple-400/20" />
                      <div className="mx-auto h-44 w-6 rounded-full bg-purple-400" />
                    </div>
                    <div className="relative flex-1">
                      <div className="absolute inset-x-0 bottom-0 h-2 rounded-full bg-fuchsia-400/20" />
                      <div className="mx-auto h-48 w-6 rounded-full bg-fuchsia-400" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-3 text-center text-[11px] text-gray-400">
                  <span>W1</span>
                  <span>W2</span>
                  <span>W3</span>
                  <span>W4</span>
                  <span>W5</span>
                  <span>W6</span>
                  <span>W7</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/5 bg-slate-950/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400">Trend details</p>
              <div className="mt-6 space-y-5">
                <div className="rounded-3xl bg-slate-950/90 p-4">
                  <p className="text-sm text-gray-400">User activations</p>
                  <p className="mt-2 text-3xl font-semibold text-white">2.9k</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-4">
                  <p className="text-sm text-gray-400">New match sessions</p>
                  <p className="mt-2 text-3xl font-semibold text-white">1.8k</p>
                </div>
                <div className="rounded-3xl bg-slate-950/90 p-4">
                  <p className="text-sm text-gray-400">Conversion rate</p>
                  <p className="mt-2 text-3xl font-semibold text-white">7.4%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </ProtectedRoute>
  );
}
