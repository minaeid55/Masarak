"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { JobPosting } from "../types";

type PostJobModalProps = {
  open: boolean;
  onClose: () => void;
  onPublish: (newJob: JobPosting) => void;
  onSaveDraft: (draftJob: JobPosting) => void;
};

const experienceOptions = ["Junior", "Mid-level", "Senior"] as const;
const jobTypes = ["Full-time", "Part-time", "Remote", "Contract"] as const;

export function PostJobModal({ open, onClose, onPublish, onSaveDraft }: PostJobModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [experience, setExperience] = useState("Mid-level");
  const [type, setType] = useState("Full-time");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [deadline, setDeadline] = useState("");

  const isReadyToPublish = useMemo(
    () => title.trim().length > 0 && description.trim().length > 0 && location.trim().length > 0,
    [title, description, location]
  );

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setRequiredSkills("");
    setExperience("Mid-level");
    setType("Full-time");
    setLocation("");
    setSalaryRange("");
    setDeadline("");
  };

  const createJob = (status: "Draft" | "Awaiting Payment") => {
    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: title.trim() || "Untitled Role",
      description: description.trim() || "No description provided.",
      requiredSkills: requiredSkills.split(",").map((item) => item.trim()).filter(Boolean),
      experience,
      type,
      location: location.trim() || "Remote",
      salaryRange: salaryRange.trim() || "Not specified",
      deadline: deadline || "TBD",
      status,
      applicants: 0,
      matchPercent: 0,
      postedAt: new Date().toISOString().slice(0, 10),
    };

    if (status === "Awaiting Payment") {
      onPublish(newJob);
    } else {
      onSaveDraft(newJob);
    }

    clearForm();
    onClose();
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="flex h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1018] shadow-2xl shadow-black/50">
        <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-8 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Post Job</p>
            <h3 className="mt-1.5 text-2xl font-semibold text-white">Create a new job posting</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-7 custom-scrollbar">
          <div className="grid gap-5 lg:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Job Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="input-glass mt-3 w-full rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Location
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="input-glass mt-3  w-full rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>

          <div className="mt-5 space-y-2 text-sm text-slate-300">
            <label>Job Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="input-glass mt-3 w-full rounded-3xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-300">
              Required Skills
              <input
                value={requiredSkills}
                onChange={(event) => setRequiredSkills(event.target.value)}
                placeholder="Comma separated"
                className="input-glass mt-3 w-full rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Salary Range
              <input
                value={salaryRange}
                onChange={(event) => setSalaryRange(event.target.value)}
                className="input-glass mt-3 w-full rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <label className="space-y-2 text-sm text-slate-300">
              Experience Level
              <select
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                className="input-glass mt-3 w-full rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {experienceOptions.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Job Type
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="input-glass mt-3 w-full rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {jobTypes.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            </label>
            <label className="space-y-2 text-sm text-slate-300">
              Deadline
              <input
                type="date"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className="input-glass mt-3 w-full  rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              />
            </label>
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10 px-8 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button type="button" variant="ghost" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="button" variant="secondary" size="sm" onClick={() => createJob("Draft")}>Save Draft</Button>
              <Button type="button" variant="primary" size="sm" disabled={!isReadyToPublish} onClick={() => createJob("Awaiting Payment")}>Publish</Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
          transition: background 0.2s;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.5);
        }
        
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }
      `}</style>
    </div>
  );
}