"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { JobCard } from "@/app/matching-jobs/JobCard";
import { MissingSkillsModal } from "@/components/MissingSkillsModal";
import { Button } from "@/components/ui/Button";
import { allPools, Job } from "./jobPools";

// jobs are loaded from the prebuilt pools in ./jobPools


const fallbackMissingSkills = [
  { name: "TypeScript Advanced Patterns", category: "Programming", level: "Advanced" },
  { name: "GraphQL API Design", category: "Backend Development", level: "Intermediate" },
];

const jobTypes = ["All Types", "Full-time", "Part-time", "Remote", "Freelance"] as const;
const sources = ["All Sources", "LinkedIn", "Indeed", "Masarak", "Wezzuf"] as const;
const experienceLevels = ["Any Level", "Junior", "Mid-level", "Senior"] as const;
const sortOptions = ["Best Match", "Newest", "Highest Salary"] as const;

export default function MatchingJobsPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [sortOption, setSortOption] = useState("Best Match");
  const [search, setSearch] = useState("");
  const [modalJobId, setModalJobId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState<any | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("lastCvAnalysis");
      if (raw) setAnalysis(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const filteredJobs = useMemo(() => {
    const poolKey = (analysis?.role ?? null) as keyof typeof allPools | null;
    const currentJobs: Job[] = poolKey ? allPools[poolKey] : [...allPools.frontend, ...allPools.backend, ...allPools.flutter];

    // if we have analysis from last upload, prefer jobs that match the detected field
    const lastAnalysis = analysis as { role?: string } | null;

    let candidateJobs: Job[] = currentJobs;
    if (lastAnalysis?.role) {
      candidateJobs = currentJobs.filter((j: Job) => j.field === (lastAnalysis.role as Job['field']));
      if (candidateJobs.length === 0) candidateJobs = currentJobs;
    }

    return candidateJobs
      .filter((job: Job) => {
        const matchesType = selectedType === "All Types" || true;
        const matchesSource = selectedSource === "All Sources" || selectedSource === job.source;
        const searchLower = search.toLowerCase();
        const matchesSearch =
          !search || job.title.toLowerCase().includes(searchLower) || job.company.toLowerCase().includes(searchLower);
        return matchesType && matchesSource && matchesSearch;
      })
      .sort((a: Job, b: Job) => b.matchScore - a.matchScore);
  }, [selectedType, selectedSource, search, analysis]);

  const activeJob = filteredJobs.find((job: Job) => job.id === modalJobId) ?? filteredJobs[0] ?? null;

  const handleViewSkills = (jobId: string) => {
    setModalJobId(jobId);
    setIsModalOpen(true);
  };

  const handleApply = (jobId: string) => {
    router.push("/apply");
  };

  const handleFindCourses = () => {
    router.push("/courses");
  };

  const handleApplyAnyway = () => {
    router.push("/apply");
  };

  const handleUploadNewCV = () => {
    router.push("/find-jobs");
  };

  const modalMissingSkills = (activeJob?.missingSkills ? activeJob.missingSkills.map((s) => ({ name: s, category: 'Skill', level: 'Intermediate' })) : null) ?? (analysis?.missingSkills ? analysis.missingSkills.map((s: string) => ({ name: s, category: 'Skill', level: 'Intermediate' })) : null) ?? fallbackMissingSkills;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050509] text-white">
        <Navbar />
        <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="rounded-[2rem] border border-indigo-500/10 bg-indigo-500/5 p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-[0.18em]">
                  <span className="h-3 w-3 rounded-full bg-indigo-400" />
                  AI Analysis Complete
                </div>
                <h1 className="text-3xl font-semibold text-white">AI Analysis Complete</h1>
                <p className="text-sm text-slate-300">Found {filteredJobs.length} matching jobs based on your skills</p>
              </div>
              <Button type="button" variant="primary" size="sm" className="bg-linear-to-r from-indigo-500 to-purple-600" onClick={handleUploadNewCV}>
                Upload New CV
              </Button>
            </div>

            <div className="rounded-[2rem] border border-indigo-500/10 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr] xl:items-end">
                <div className="space-y-1 ">
                  <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search job titles, companies..." className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-5 py-3 text-sm text-gray-200" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3">
                  <div>
                    <select value={selectedType} onChange={(event) => setSelectedType(event.target.value as string)} className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200">
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select value={selectedSource} onChange={(event) => setSelectedSource(event.target.value as string)} className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200">
                      {sources.map((source) => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2 flex items-end gap-3">
                    <Button className="w-full rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-white hover:bg-indigo-500/10" variant="secondary" size="sm">
                      More Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">{filteredJobs.length} Matching Jobs</h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>Sort by</span>
                <select value={sortOption} onChange={(event) => setSortOption(event.target.value as string)} className="input-glass rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200">
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job: Job) => (
                <JobCard key={job.id} job={job} onViewSkills={handleViewSkills} onApply={handleApply} />
              ))}
            </div>
          </div>
        </main>

        <MissingSkillsModal open={isModalOpen} job={activeJob} missingSkills={modalMissingSkills} onClose={() => setIsModalOpen(false)} onApplyAnyway={handleApplyAnyway} />
      </div>
    </ProtectedRoute>
  );
}
