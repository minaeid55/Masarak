"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { JobCard, type JobType } from "@/app/matching-jobs/JobCard";
import { MissingSkillsModal } from "@/components/MissingSkillsModal";
import { Button } from "@/components/ui/Button";

const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Mosaic Labs",
    location: "Cairo, Egypt",
    source: "LinkedIn" as const,
    matchScore: 92,
    description: "Build responsive interfaces and improve product experiences with modern React and TypeScript.",
    type: "Full-time",
    salary: 16000,
    postedAt: "2026-06-13",
    experience: "Senior",
  },
  {
    id: "2",
    title: "UI Engineer",
    company: "NextBridge",
    location: "Remote",
    source: "Indeed" as const,
    matchScore: 85,
    description: "Design beautiful UI systems and collaborate with product teams to ship polished web apps.",
    type: "Remote",
    salary: 14500,
    postedAt: "2026-06-17",
    experience: "Mid-level",
  },
  {
    id: "3",
    title: "Product Frontend Developer",
    company: "Masarak",
    location: "Hybrid — Cairo",
    source: "Masarak" as const,
    matchScore: 78,
    description: "Work on AI-driven hiring experiences and strengthen our employer matching engine.",
    type: "Full-time",
    salary: 13000,
    postedAt: "2026-06-11",
    experience: "Mid-level",
  },
  {
    id: "4",
    title: "Web Applications Specialist",
    company: "PixelTree",
    location: "Alexandria, Egypt",
    source: "LinkedIn" as const,
    matchScore: 72,
    description: "Improve customer-facing dashboards and implement performance optimizations.",
    type: "Part-time",
    salary: 9800,
    postedAt: "2026-06-14",
    experience: "Junior",
  },
  {
    id: "5",
    title: "Frontend Consultant",
    company: "Studio 47",
    location: "Remote",
    source: "Indeed" as const,
    matchScore: 65,
    description: "Support development teams with architecture reviews and front-end best practices.",
    type: "Freelance",
    salary: 12000,
    postedAt: "2026-06-09",
    experience: "Senior",
  },
];

const missingSkills = [
  {
    name: "TypeScript Advanced Patterns",
    category: "Programming",
    level: "Advanced",
  },
  {
    name: "GraphQL API Design",
    category: "Backend Development",
    level: "Intermediate",
  },
];

const jobTypes = ["All Types", "Full-time", "Part-time", "Remote", "Freelance"] as const;
const sources = ["All Sources", "LinkedIn", "Indeed", "Masarak"] as const;
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

  const filteredJobs = useMemo(() => {
    return mockJobs
      .filter((job) => {
        const matchesType = selectedType === "All Types" || true;
        const matchesSource = selectedSource === "All Sources" || selectedSource === job.source;
        const searchLower = search.toLowerCase();
        const matchesSearch =
          !search ||
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower);
        return matchesType && matchesSource && matchesSearch;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedType, selectedSource, search]);

  const activeJob = mockJobs.find((job) => job.id === modalJobId) ?? mockJobs[0];

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
                <p className="text-sm text-slate-300">Found 5 matching jobs based on your skills</p>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="bg-linear-to-r from-indigo-500 to-purple-600"
                onClick={handleUploadNewCV}
              >
                Upload New CV
              </Button>
            </div>
  

            {/* every card to each position match score  */}

            <div className="rounded-[2rem] border border-indigo-500/10 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr] xl:items-end">
                <div className="space-y-1 ">
                  <input
                    type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search job titles, companies..."
                    className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-5 py-3 text-sm text-gray-200"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-3">
                  <div>
                    <select
                      value={selectedType}
                      onChange={(event) => setSelectedType(event.target.value as string)}
                      className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
                    >
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={selectedSource}
                      onChange={(event) => setSelectedSource(event.target.value as string)}
                      className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
                    >
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
                <h2 className="text-3xl font-bold text-white">5 Matching Jobs</h2>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>Sort by</span>
                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value as string)}
                  className="input-glass rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onViewSkills={handleViewSkills}
                  onApply={handleApply}
                />
              ))}
            </div>
          </div>
        </main>

        <MissingSkillsModal
          open={isModalOpen}
          job={activeJob}
          missingSkills={missingSkills}
          onClose={() => setIsModalOpen(false)}
          onFindCourses={handleFindCourses}
          onApplyAnyway={handleApplyAnyway}
        />
      </div>
    </ProtectedRoute>
  );
}
