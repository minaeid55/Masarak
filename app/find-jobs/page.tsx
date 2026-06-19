"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UploadCV } from "@/app/find-jobs/UploadCV";

export default function FindJobsPage() {
  const router = useRouter();

  const handleUploadComplete = () => {
    router.push("/matching-jobs");
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050509] text-white">
        <Navbar />
        <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-300">Find Jobs</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
              Find Your Perfect Job
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-400">
              Upload your CV to discover AI-powered job matches
            </p>
          </div>

          <div className="mt-16">
            <UploadCV onUploadComplete={handleUploadComplete} />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
