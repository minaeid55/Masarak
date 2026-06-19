"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { HRDashboardSidebar } from "./HRDashboardSidebar";
import { PostJobModal } from "./PostJobModal";
import { companyProfile as initialCompany, hrApplicants, hrJobs } from "../mock-data";
import type { ApplicantProfile, HRSection, JobPosting, CompanyProfile } from "../types";

export function HRDashboard() {
  const [activeSection, setActiveSection] = useState<HRSection>("dashboard");
  const [jobs, setJobs] = useState<JobPosting[]>(hrJobs);
  const [applicants, setApplicants] = useState<ApplicantProfile[]>(hrApplicants);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantProfile | null>(null);
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(initialCompany);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((job) => job.status === "Active").length;
  const pendingJobs = jobs.filter((job) => job.status === "Awaiting Payment" || job.status === "Pending Review").length;
  const newApplicants = applicants.filter((applicant) => applicant.status === "New").length;

  const openPostJobModal = () => setIsPostJobOpen(true);
  const closePostJobModal = () => setIsPostJobOpen(false);

  const openApplicantModal = (app: ApplicantProfile) => {
    setSelectedApplicant(app);
    setIsApplicantModalOpen(true);
  };
  const closeApplicantModal = () => {
    setSelectedApplicant(null);
    setIsApplicantModalOpen(false);
  };

  const handlePublishJob = (newJob: JobPosting) => {
    setJobs((current) => [newJob, ...current]);
  };

  const handleSaveDraftJob = (draftJob: JobPosting) => {
    setJobs((current) => [draftJob, ...current]);
  };

  const handleDeleteJob = (jobId: string) => {
    setJobs((current) => current.filter((job) => job.id !== jobId));
  };

  function handleApplicantAction(action: "Accept" | "Shortlist" | "Reject", applicant: ApplicantProfile) {
    setApplicants((current) =>
      current.map((a) =>
        a.id === applicant.id
          ? { ...a, status: action === "Accept" ? "Accepted" : action === "Shortlist" ? "Shortlisted" : "Rejected" }
          : a
      )
    );
    closeApplicantModal();
  }

  const averageMatch = useMemo(() => {
    if (applicants.length === 0) return 0;
    return Math.round(applicants.reduce((s, a) => s + a.matchScore, 0) / applicants.length);
  }, [applicants]);

  function renderStatusBadge(status: JobPosting["status"]) {
    const base = "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.12em] ";
    switch (status) {
      case "Draft":
        return <span className={base + "bg-white/5 text-slate-300"}>Draft</span>;
      case "Pending Review":
        return <span className={base + "bg-amber-500/15 text-amber-300"}>Pending Review</span>;
      case "Rejected":
        return <span className={base + "bg-rose-500/15 text-rose-300"}>Rejected</span>;
      case "Awaiting Payment":
        return <span className={base + "bg-indigo-500/15 text-indigo-300"}>Awaiting Payment</span>;
      case "Active":
      default:
        return <span className={base + "bg-emerald-500/15 text-emerald-300"}>Active</span>;
    }
  }

  function renderApplicantStatusBadge(status: ApplicantProfile["status"]) {
    const base = "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.12em] ";
    switch (status) {
      case "New":
        return <span className={base + "bg-indigo-500/15 text-indigo-300"}>New</span>;
      case "Shortlisted":
        return <span className={base + "bg-amber-500/15 text-amber-300"}>Shortlisted</span>;
      case "Accepted":
        return <span className={base + "bg-emerald-500/15 text-emerald-300"}>Accepted</span>;
      case "Rejected":
      default:
        return <span className={base + "bg-rose-500/15 text-rose-300"}>Rejected</span>;
    }
  }

  // ---------- Dashboard section ----------
  const dashboardContent = (
    <div className="space-y-8">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/20 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">HR Dashboard</p>
            <h1 className="mt-3 text-2xl font-semibold text-white sm:mt-4 sm:text-3xl">HR Dashboard</h1>
          </div>
          <Button type="button" variant="primary" size="sm" onClick={openPostJobModal}>
            Post New Job
          </Button>
        </div>

        <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-3">
          <Card className="p-5 bg-[#111827] border border-white/10 sm:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 sm:text-sm sm:tracking-[0.3em]">Active Jobs</p>
            <p className="mt-3 text-3xl font-semibold text-white sm:mt-4 sm:text-4xl">{activeJobs}</p>
          </Card>
          <Card className="p-5 bg-[#111827] border border-white/10 sm:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 sm:text-sm sm:tracking-[0.3em]">Total Applicants</p>
            <p className="mt-3 text-3xl font-semibold text-white sm:mt-4 sm:text-4xl">{applicants.length}</p>
          </Card>
          <Card className="p-5 bg-[#111827] border border-white/10 sm:p-6">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400 sm:text-sm sm:tracking-[0.3em]">Average Match</p>
            <p className="mt-3 text-3xl font-semibold text-white sm:mt-4 sm:text-4xl">{averageMatch}%</p>
          </Card>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1018] shadow-xl shadow-black/20 sm:mt-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="whitespace-nowrap px-5 py-4">Job Title</th>
                  <th className="whitespace-nowrap px-5 py-4">Applicants</th>
                  <th className="whitespace-nowrap px-5 py-4">Match %</th>
                  <th className="whitespace-nowrap px-5 py-4">Status</th>
                  <th className="whitespace-nowrap px-5 py-4">Posted</th>
                  <th className="whitespace-nowrap px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-slate-950/80">
                {jobs.filter((j) => j.status === "Active").map((job) => (
                  <tr key={job.id}>
                    <td className="whitespace-nowrap px-5 py-4 text-white">{job.title}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">{job.applicants}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">{job.matchPercent}%</td>
                    <td className="whitespace-nowrap px-5 py-4">{renderStatusBadge(job.status)}</td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-300">{job.postedAt}</td>
                    <td className="whitespace-nowrap px-5 py-4">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          const applicant = applicants.find((a) => a.role === job.title) ?? applicants[0];
                          if (applicant) openApplicantModal(applicant);
                        }}
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // ---------- Job Postings section ----------
  const jobPostingsContent = (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Job postings</p>
          <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Manage open roles</h2>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={openPostJobModal}>
          Create new job
        </Button>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1018] shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="whitespace-nowrap px-5 py-4">Role</th>
                <th className="whitespace-nowrap px-5 py-4">Type</th>
                <th className="whitespace-nowrap px-5 py-4">Status</th>
                <th className="whitespace-nowrap px-5 py-4">Applicants</th>
                <th className="whitespace-nowrap px-5 py-4">Posted</th>
                <th className="whitespace-nowrap px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80">
              {jobs.map((job) => (
                <tr key={job.id}>
                  <td className="whitespace-nowrap px-5 py-4 text-white">{job.title}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">{job.type}</td>
                  <td className="whitespace-nowrap px-5 py-4">{renderStatusBadge(job.status)}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">{job.applicants}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">{job.postedAt}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <div className="flex gap-2">
                      <Button type="button" variant="secondary" size="sm" onClick={() => openPostJobModal()}>
                        Edit
                      </Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteJob(job.id)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // ---------- Applicants section ----------
  const applicantsContent = (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/20 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Applicants</p>
        <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">Candidate pipeline</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Track candidates, review matching skills, and move promising profiles forward.
        </p>
      </div>

      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b1018] shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="whitespace-nowrap px-5 py-4">Candidate</th>
                <th className="whitespace-nowrap px-5 py-4">Role</th>
                <th className="whitespace-nowrap px-5 py-4">Match</th>
                <th className="whitespace-nowrap px-5 py-4">Status</th>
                <th className="whitespace-nowrap px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80">
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="whitespace-nowrap px-5 py-4 text-white">{applicant.name}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">{applicant.role}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-300">{applicant.matchScore}%</td>
                  <td className="whitespace-nowrap px-5 py-4">{renderApplicantStatusBadge(applicant.status)}</td>
                  <td className="whitespace-nowrap px-5 py-4">
                    <Button type="button" variant="secondary" size="sm" onClick={() => openApplicantModal(applicant)}>
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const companyProfileContent = (
    <div className="space-y-6">
      <div className="rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/20 sm:p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Company profile</p>
        {!isEditingCompany ? (
          <>
            <h2 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{companyProfile.name}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">{companyProfile.description}</p>
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <Card className="p-5 bg-[#111827] border border-white/10 sm:p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 sm:text-sm sm:tracking-[0.3em]">Industry</p>
                <p className="mt-3 text-base font-semibold text-white sm:text-lg">{companyProfile.industry}</p>
              </Card>
              <Card className="p-5 bg-[#111827] border border-white/10 sm:p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400 sm:text-sm sm:tracking-[0.3em]">Website</p>
                <a
                  href={companyProfile.website}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-base font-semibold text-indigo-300 hover:text-white sm:text-lg"
                >
                  {companyProfile.website}
                </a>
              </Card>
            </div>
            <div className="mt-6">
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditingCompany(true)}>
                Edit Profile
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-4 space-y-4">
            <label className="block text-sm text-slate-300">
              Company Name
              <input
                value={companyProfile.name}
                onChange={(e) => setCompanyProfile((c) => ({ ...c, name: e.target.value }))}
                className="input-glass w-full rounded-2xl px-4 py-3 text-white mt-2"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Website
              <input
                value={companyProfile.website}
                onChange={(e) => setCompanyProfile((c) => ({ ...c, website: e.target.value }))}
                className="input-glass w-full rounded-2xl px-4 py-3 text-white mt-2"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Industry
              <input
                value={companyProfile.industry}
                onChange={(e) => setCompanyProfile((c) => ({ ...c, industry: e.target.value }))}
                className="input-glass w-full rounded-2xl px-4 py-3 text-white mt-2"
              />
            </label>
            <label className="block text-sm text-slate-300">
              Description
              <textarea
                value={companyProfile.description}
                onChange={(e) => setCompanyProfile((c) => ({ ...c, description: e.target.value }))}
                className="input-glass w-full rounded-3xl px-4 py-3 text-white mt-2"
              />
            </label>
            <div className="flex gap-3">
              <Button type="button" variant="primary" size="sm" onClick={() => setIsEditingCompany(false)}>
                Save
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsEditingCompany(false);
                  setCompanyProfile(initialCompany);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-[1.75rem] border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20 sm:p-8">
        <h3 className="text-xl font-semibold text-white sm:text-2xl">Current hiring health</h3>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card className="p-5 bg-[#111827] border border-white/10">
            <p className="text-sm text-slate-400">Open roles</p>
            <p className="mt-3 text-3xl font-semibold text-white">{totalJobs}</p>
          </Card>
          <Card className="p-5 bg-[#111827] border border-white/10">
            <p className="text-sm text-slate-400">Active jobs</p>
            <p className="mt-3 text-3xl font-semibold text-white">{activeJobs}</p>
          </Card>
          <Card className="p-5 bg-[#111827] border border-white/10">
            <p className="text-sm text-slate-400">Pending review</p>
            <p className="mt-3 text-3xl font-semibold text-white">{pendingJobs}</p>
          </Card>
        </div>
      </div>
    </div>
  );

  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case "job-postings":
        return jobPostingsContent;
      case "applicants":
        return applicantsContent;
      case "company-profile":
        return companyProfileContent;
      default:
        return dashboardContent;
    }
  }, [activeSection, jobs, applicants, dashboardContent, jobPostingsContent, applicantsContent, companyProfileContent]);

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 pt-28 pb-20 text-white sm:px-6 sm:pt-28 sm:pb-20 lg:flex-row lg:gap-8 lg:px-8">
        {/* Sidebar - fixed width and sticky */}
        <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0">
          <div className="sticky top-28">
            <HRDashboardSidebar activeSection={activeSection} onChange={setActiveSection} />
          </div>
        </div>
        
        {/* Main Content - takes remaining space with consistent top spacing */}
        <div className="flex-1 min-w-0">
          {sectionContent}
        </div>
      </div>

      <PostJobModal open={isPostJobOpen} onClose={closePostJobModal} onPublish={handlePublishJob} onSaveDraft={handleSaveDraftJob} />

      {/* Applicant details modal */}
      {isApplicantModalOpen && selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
          <div className="w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1018] shadow-2xl shadow-black/50">
            <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Applicant</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{selectedApplicant.name}</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Applied for <span className="text-slate-200">{selectedApplicant.role}</span>
                  {selectedApplicant.appliedAt ? ` on ${selectedApplicant.appliedAt}` : ""}
                </p>
              </div>
              <button type="button" onClick={closeApplicantModal} className="text-slate-400 hover:text-white">
                Close
              </button>
            </div>

            <div className="max-h-[70vh] space-y-6 overflow-y-auto px-8 py-8">
              <div>
                <p className="text-sm font-semibold text-slate-100">Matching Skills</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {(selectedApplicant.matchingSkills ?? []).length > 0 ? (
                    selectedApplicant.matchingSkills!.map((skill) => (
                      <span key={skill} className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-300">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No matching skills recorded.</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-100">Missing Skills</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  {(selectedApplicant.missingSkills ?? []).length > 0 ? (
                    selectedApplicant.missingSkills!.map((skill) => (
                      <span key={skill} className="rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-rose-300">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500">No missing skills — full match.</span>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-100">Experience</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {selectedApplicant.experience ?? "No experience details provided."}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-100">CV Document</p>
                {selectedApplicant.cvUrl ? (
                  <a
                    href={selectedApplicant.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-white"
                  >
                    Download CV
                  </a>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">No CV uploaded.</p>
                )}
              </div>

              {selectedApplicant.coverLetter && (
                <div>
                  <p className="text-sm font-semibold text-slate-100">Cover Letter</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{selectedApplicant.coverLetter}</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-8 py-6 sm:flex-row sm:items-center sm:justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={() => handleApplicantAction("Reject", selectedApplicant)}>
                Reject
              </Button>
              <Button type="button" variant="secondary" size="sm" onClick={() => handleApplicantAction("Shortlist", selectedApplicant)}>
                Shortlist
              </Button>
              <Button type="button" variant="primary" size="sm" onClick={() => handleApplicantAction("Accept", selectedApplicant)}>
                Accept
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}