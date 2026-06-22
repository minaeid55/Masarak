"use client";

import { FiBriefcase, FiMapPin } from "react-icons/fi";
import { Button } from "../../components/ui/Button";
import { cn } from "@/lib/utils";

export type JobType = "Full-time" | "Part-time" | "Remote" | "Freelance";

type JobCardProps = {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    source: "LinkedIn" | "Indeed" | "Masarak" | "Wezzuf";
    matchScore: number;
    description: string;
  };
  onViewSkills: (jobId: string) => void;
  onApply: (jobId: string) => void;
};

const sourceStyles: Record<string, string> = {
  LinkedIn: "bg-indigo-100 text-indigo-700",
  Indeed: "bg-violet-100 text-violet-700",
  Masarak: "bg-purple-100 text-purple-700",
};

export function JobCard({ job, onViewSkills, onApply }: JobCardProps) {
  const scoreColor = job.matchScore >= 80 ? "text-indigo-400" : "text-violet-300";
  const progressClass = job.matchScore >= 80 ? "bg-indigo-500" : "bg-violet-500";

  return (
    <div className="glass-card rounded-[2rem] border border-white/10 bg-[#0f1720] p-6 shadow-xl shadow-black/10">
      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h3 className="text-2xl font-semibold text-white">{job.title}</h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
            <span className="inline-flex items-center gap-2">
              <FiBriefcase /> {job.company}
            </span>
            <span className="inline-flex items-center gap-2">
              <FiMapPin /> {job.location}
            </span>
          </div>
        </div>

        <span className={cn("rounded-full px-4 py-2 text-sm font-semibold", sourceStyles[job.source])}>
          {job.source}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between gap-4 text-sm text-gray-300">
          <span className="font-medium">Match Score</span>
          <span className={cn("font-semibold", scoreColor)}>{job.matchScore}%</span>
        </div>
        <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
          <div className={cn("h-full rounded-full transition-all duration-500", progressClass)} style={{ width: `${job.matchScore}%` }} />
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{job.description}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full sm:w-auto text-white"
          onClick={() => onViewSkills(job.id)}
        >
          View Missing Skills
        </Button>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="w-full sm:w-auto bg-linear-to-r from-indigo-500 to-purple-600"
          onClick={() => onApply(job.id)}
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
}
