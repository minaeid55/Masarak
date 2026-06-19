"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
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
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
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

  const openJobModal = (job: JobPosting) => {
    setSelectedJob(job);
    setIsJobModalOpen(true);
  };
  const closeJobModal = () => {
    setSelectedJob(null);
    setIsJobModalOpen(false);
  };

  const handlePublishJob = (newJob: JobPosting) => {
    setJobs((current) => [newJob, ...current]);
  };

  const handleSaveDraftJob = (draftJob: JobPosting) => {
    setJobs((current) => [draftJob, ...current]);
  };

  const handleSelectApplicant = (applicant: ApplicantProfile) => {
    setApplicants((current) =>
      current.map((item) => (item.id === applicant.id ? { ...item, status: item.status === "New" ? "Shortlisted" : item.status } : item))
    );
  };

  const averageMatch = useMemo(() => {
    if (applicants.length === 0) return 0;
    return Math.round(applicants.reduce((s, a) => s + a.matchScore, 0) / applicants.length);
  }, [applicants]);

  const dashboardContent = (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">HR Dashboard</p>
              <h1 className="mt-4 text-3xl font-semibold text-white">HR Dashboard</h1>
            </div>
            <Button type="button" variant="primary" size="sm" onClick={openPostJobModal}>
              Post New Job
            </Button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Card className="p-6 bg-[#111827] border border-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Active Jobs</p>
              <p className="mt-4 text-4xl font-semibold text-white">{activeJobs}</p>
            </Card>
            <Card className="p-6 bg-[#111827] border border-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total Applicants</p>
              <p className="mt-4 text-4xl font-semibold text-white">{applicants.length}</p>
            </Card>
            <Card className="p-6 bg-[#111827] border border-white/10">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Average Match</p>
              <p className="mt-4 text-4xl font-semibold text-white">{averageMatch}%</p>
            </Card>
          </div>

          <div className="mt-8 overflow-hidden rounded-4xl border border-white/10 bg-[#0b1018] shadow-xl shadow-black/20">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-slate-900/90 text-slate-400">
                <tr>
                  <th className="px-5 py-4">Job Title</th>
                  <th className="px-5 py-4">Applicants</th>
                  <th className="px-5 py-4">Match %</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Posted</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 bg-slate-950/80">
                {jobs.filter((j) => j.status === "Active").map((job) => (
                  <tr key={job.id}>
                    <td className="px-5 py-4 text-white">{job.title}</td>
                    <td className="px-5 py-4 text-slate-300">{job.applicants}</td>
                    <td className="px-5 py-4 text-slate-300">{job.matchPercent}%</td>
                    <td className="px-5 py-4 text-slate-300">{job.status}</td>
                    <td className="px-5 py-4 text-slate-300">{job.postedAt}</td>
                    <td className="px-5 py-4">
                      <Button type="button" variant="secondary" size="sm" onClick={() => openJobModal(job)}>
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/20">
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Company profile</p>
          {!isEditingCompany ? (
            <>
              <h2 className="mt-4 text-2xl font-semibold text-white">{companyProfile.name}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{companyProfile.description}</p>
              <div className="mt-8 space-y-4 text-sm text-slate-300">
                <div>
                  <p className="font-semibold text-slate-100">Industry</p>
                  <p>{companyProfile.industry}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-100">Website</p>
                  <a href={companyProfile.website} target="_blank" rel="noreferrer" className="text-indigo-300 hover:text-white">
                    {companyProfile.website}
                  </a>
                </div>
                <div className="mt-6">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditingCompany(true)}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm text-slate-300">
                Company Name
                <input value={companyProfile.name} onChange={(e) => setCompanyProfile((c) => ({ ...c, name: e.target.value }))} className="input-glass w-full rounded-2xl px-4 py-3 text-white mt-2" />
              </label>
              <label className="block text-sm text-slate-300">
                Website
                <input value={companyProfile.website} onChange={(e) => setCompanyProfile((c) => ({ ...c, website: e.target.value }))} className="input-glass w-full rounded-2xl px-4 py-3 text-white mt-2" />
              </label>
              <label className="block text-sm text-slate-300">
                Industry
                <input value={companyProfile.industry} onChange={(e) => setCompanyProfile((c) => ({ ...c, industry: e.target.value }))} className="input-glass w-full rounded-2xl px-4 py-3 text-white mt-2" />
              </label>
              <label className="block text-sm text-slate-300">
                Description
                <textarea value={companyProfile.description} onChange={(e) => setCompanyProfile((c) => ({ ...c, description: e.target.value }))} className="input-glass w-full rounded-3xl px-4 py-3 text-white mt-2" />
              </label>
              <div className="flex gap-3">
                <Button type="button" variant="primary" size="sm" onClick={() => setIsEditingCompany(false)}>Save</Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => { setIsEditingCompany(false); setCompanyProfile(initialCompany); }}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const jobPostingsContent = (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Job postings</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Manage open roles</h2>
        </div>
        <Button type="button" variant="primary" size="sm" onClick={openPostJobModal}>
          Create new job
        </Button>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1018] shadow-xl shadow-black/20">
        <table className="min-w-full divide-y divide-white/10 text-left text-sm">
          <thead className="bg-slate-900/90 text-slate-400">
            <tr>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Type</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Applicants</th>
              <th className="px-5 py-4">Posted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10 bg-slate-950/80">
            {jobs.map((job) => (
              <tr key={job.id}>
                <td className="px-5 py-4 text-white">{job.title}</td>
                <td className="px-5 py-4 text-slate-300">{job.type}</td>
                <td className="px-5 py-4 text-slate-300">{job.status}</td>
                <td className="px-5 py-4 text-slate-300">{job.applicants}</td>
                <td className="px-5 py-4 text-slate-300">{job.postedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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

  const applicantsContent = (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Applicants</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">Candidate pipeline</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Track candidates, review matching skills, and move promising profiles forward.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1018] shadow-xl shadow-black/20">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm">
            <thead className="bg-slate-900/90 text-slate-400">
              <tr>
                <th className="px-5 py-4">Candidate</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Match</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/80">
              {applicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="px-5 py-4 text-white">{applicant.name}</td>
                  <td className="px-5 py-4 text-slate-300">{applicant.role}</td>
                  <td className="px-5 py-4 text-slate-300">{applicant.matchScore}%</td>
                  <td className="px-5 py-4 text-slate-300">{applicant.status}</td>
                  <td className="px-5 py-4">
                    <Button type="button" variant="secondary" size="sm" onClick={() => handleSelectApplicant(applicant)}>
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-xl shadow-black/20">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Quick insights</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">Applicant stats</h3>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-4">
              <p className="text-sm text-slate-400">Top skills requested</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="rounded-full border border-white/10 px-3 py-1">React</span>
                <span className="rounded-full border border-white/10 px-3 py-1">TypeScript</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Figma</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#111827] p-4">
              <p className="text-sm text-slate-400">Candidate workflow</p>
              <div className="mt-4 grid gap-3">
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>New applications</span>
                  <span>{newApplicants}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Shortlisted</span>
                  <span>{applicants.filter((item) => item.status === "Shortlisted").length}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <span>Rejected</span>
                  <span>{applicants.filter((item) => item.status === "Rejected").length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const companyProfileContent = (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">Company profile</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{companyProfile.name}</h2>
        <p className="mt-4 text-sm leading-6 text-slate-400">{companyProfile.description}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6 bg-[#111827] border border-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Industry</p>
          <p className="mt-4 text-lg font-semibold text-white">{companyProfile.industry}</p>
        </Card>
        <Card className="p-6 bg-[#111827] border border-white/10">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Website</p>
          <a href={companyProfile.website} target="_blank" rel="noreferrer" className="mt-4 block text-lg font-semibold text-indigo-300 hover:text-white">
            {companyProfile.website}
          </a>
        </Card>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-[#0b1018] p-8 shadow-xl shadow-black/20">
        <h3 className="text-2xl font-semibold text-white">Current hiring health</h3>
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
    <main className="mx-auto flex min-h-screen max-w-400 gap-8 px-6 py-10 text-white sm:px-8">
      <div className="hidden w-[320px] xl:block">
        <HRDashboardSidebar activeSection={activeSection} onChange={setActiveSection} />
      </div>
      <div className="flex-1 space-y-8">
        <div className="block xl:hidden">
          <HRDashboardSidebar activeSection={activeSection} onChange={setActiveSection} />
        </div>
        {sectionContent}
      </div>
      <PostJobModal open={isPostJobOpen} onClose={closePostJobModal} onPublish={handlePublishJob} onSaveDraft={handleSaveDraftJob} />
    </main>
  );
}
