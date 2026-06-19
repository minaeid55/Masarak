"use client";

import { FiX, FiBriefcase, FiMapPin } from "react-icons/fi";
import { Button } from "./ui/Button";

type MissingSkill = {
  name: string;
  category: string;
  level: string;
};

type JobSummary = {
  title: string;
  company: string;
  location: string;
  matchScore: number;
};

type MissingSkillsModalProps = {
  open: boolean;
  job: JobSummary | null;
  missingSkills: MissingSkill[];
  onClose: () => void;
  onFindCourses: () => void;
  onApplyAnyway: () => void;
};

export function MissingSkillsModal({
  open,
  job,
  missingSkills,
  onClose,
  onFindCourses,
  onApplyAnyway,
}: MissingSkillsModalProps) {
  if (!open || !job) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl rounded-[2rem] bg-slate-950/95 border border-white/10 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-400">AI Analysis Complete</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">Skills to Improve</h2>
            <p className="mt-2 text-sm text-gray-400">
              These skills are required for this position but not found in your CV
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-3 text-gray-400 hover:text-white bg-white/5 transition"
            aria-label="Close modal"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <div className="rounded-3xl bg-white/5 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-400">Job Title</p>
                <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-2"><FiBriefcase /> {job.company}</span>
                  <span className="inline-flex items-center gap-2"><FiMapPin /> {job.location}</span>
                </div>
              </div>
              <span className="rounded-full bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-200">
                {job.matchScore}% Match
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-white">Missing Skills ({missingSkills.length})</h4>
                <p className="text-sm text-gray-400">Skills you should improve for this opportunity.</p>
              </div>
            </div>

            <div className="space-y-3">
              {missingSkills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-indigo-300" />
                      <div>
                        <p className="text-white font-semibold">{skill.name}</p>
                        <p className="text-sm text-gray-400">{skill.category} — {skill.level} Level</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-indigo-200/20 px-3 py-1 text-sm font-semibold text-indigo-500">
                      Missing
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full sm:w-auto bg-violet-500/10 text-violet-200 hover:bg-violet-500/20"
              onClick={onFindCourses}
            >
              Find Courses
            </Button>
            <Button
              type="button"
              variant="primary"
              className="w-full sm:w-auto bg-violet-600 text-white"
              onClick={onApplyAnyway}
            >
              Apply Anyway
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
