"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import {
  activeJobs as initialActiveJobs,
  activityLogs as initialActivityLogs,
  feedbackEntries as initialFeedback,
  hrApprovals as initialHrApprovals,
  users as initialUsers,
  type ActivityLog,
  type AdminDashboardJob,
  type AdminUser,
  type FeedbackEntry,
  type HRApproval,
} from "@/features/admin/data/mock-admin";

const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "approvals", label: "HR Approvals" },
  { id: "users", label: "User Management" },
  { id: "feedback", label: "Feedback" },
] as const;

type SectionId = (typeof sections)[number]["id"];

type UserFilters = {
  type: string;
  status: string;
};

const userStatusStyles: Record<AdminUser["status"], string> = {
  Active: "bg-emerald-500/15 text-emerald-300",
  Pending: "bg-amber-500/15 text-amber-300",
  Banned: "bg-rose-500/15 text-rose-300",
};

function badge(text: string, className: string) {
  return (
    <span className={"inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.18em] " + className}>
      {text}
    </span>
  );
}

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<SectionId>("dashboard");
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);
  const [approvals, setApprovals] = useState<HRApproval[]>(initialHrApprovals);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>(initialFeedback);
  const [activityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [filters, setFilters] = useState<UserFilters>({ type: "All", status: "All" });
  const [search, setSearch] = useState("");
  const [activeApprovalDoc, setActiveApprovalDoc] = useState<HRApproval | null>(null);
  const [approveTarget, setApproveTarget] = useState<HRApproval | null>(null);
  const [rejectTarget, setRejectTarget] = useState<HRApproval | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectDetails, setRejectDetails] = useState("");
  const [banTarget, setBanTarget] = useState<AdminUser | null>(null);
  const [banReason, setBanReason] = useState("");
  const [banDuration, setBanDuration] = useState("30 days");
  const [banDetails, setBanDetails] = useState("");
  const [responseTarget, setResponseTarget] = useState<FeedbackEntry | null>(null);
  const [responseText, setResponseText] = useState("");

  const pendingApprovals = approvals.filter((item) => item.status === "Pending").length;
  const totalUsers = users.length;
  const totalApplications = 156; // mock aggregated number
  const activeJobCount = initialActiveJobs.length;

  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        const matchesType = filters.type === "All" || user.type === filters.type;
        const matchesStatus = filters.status === "All" || user.status === filters.status;
        const matchesSearch =
          !search ||
          user.name.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase());
        return matchesType && matchesStatus && matchesSearch;
      }),
    [users, filters, search]
  );

  const handleApproval = (approval: HRApproval) => {
    setApproveTarget(approval);
  };

  const handleConfirmApprove = () => {
    if (!approveTarget) return;

    setApprovals((current) =>
      current.map((approval) =>
        approval.id === approveTarget.id ? { ...approval, status: "Approved" } : approval
      )
    );
    setApproveTarget(null);
  };

  const handleRejectClick = (approval: HRApproval) => {
    setRejectTarget(approval);
    setRejectReason("");
    setRejectDetails("");
  };

  const handleConfirmReject = () => {
    if (!rejectTarget) return;

    setApprovals((current) =>
      current.map((approval) =>
        approval.id === rejectTarget.id ? { ...approval, status: "Rejected" } : approval
      )
    );
    setRejectTarget(null);
    setRejectReason("");
    setRejectDetails("");
  };

  const handleUserBanToggle = (user: AdminUser) => {
    setBanTarget(user);
    setBanReason("");
    setBanDuration("30 days");
    setBanDetails("");
  };

  const handleConfirmBan = () => {
    if (!banTarget) return;

    setUsers((current) =>
      current.map((user) =>
        user.id === banTarget.id ? { ...user, status: "Banned" } : user
      )
    );
    setBanTarget(null);
    setBanReason("");
    setBanDuration("30 days");
    setBanDetails("");
  };

  const handleDeleteUser = (userId: string) => {
    setUsers((current) => current.filter((user) => user.id !== userId));
  };

  const handleResolveFeedback = (feedbackId: string) => {
    setFeedback((current) =>
      current.map((item) =>
        item.id === feedbackId ? { ...item, status: "Resolved" } : item
      )
    );
  };

  const sectionContent = useMemo(() => {
    switch (activeSection) {
      case "approvals":
        return (
          <div className="space-y-6">
            <div className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold text-white">Pending HR Approvals</h2>
              <p className="mt-2 text-sm text-slate-400">
                Review newly registered HR accounts and verify their documents.
              </p>
            </div>
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-slate-950/90 shadow-xl shadow-black/10">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                <thead className="bg-slate-900/90 text-slate-400">
                  <tr>
                    <th className="px-5 py-4">Company</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Website</th>
                    <th className="px-5 py-4">Registered</th>
                    <th className="px-5 py-4">documents</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 bg-slate-950/80">
                  {approvals.map((approval) => (
                    <tr key={approval.id}>
                      <td className="px-5 py-4 text-white">{approval.company}</td>
                      <td className="px-5 py-4 text-slate-300">{approval.contactPerson}</td>
                      <td className="px-5 py-4 text-slate-300">{approval.email}</td>
                      <td className="px-5 py-4 text-slate-300">{approval.website}</td>
                      <td className="px-5 py-4 text-slate-300">{approval.registrationDate}</td>
                      <td className="px-5 py-4 ">
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setActiveApprovalDoc(approval)}
                        >
                          View Docs
                        </Button>
                      </td>
                      <td className="px-5 py-4 flex flex-wrap gap-2  ">
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => handleApproval(approval)}
                        >
                          Approve
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRejectClick(approval)}
                        >
                          Reject
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "users":
        return (
          <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-[1fr_auto]">
              <div className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
                <h2 className="text-2xl font-semibold text-white">User Management</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Filter users by role, status, and search for quick moderation.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <select
                  value={filters.type}
                  onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))}
                  className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
                >
                  <option>All Users</option>
                  <option>Job Seeker</option>
                  <option>HR</option>
                  <option>Admin</option>
                </select>
                <select
                  value={filters.status}
                  onChange={(event) => setFilters((current) => ({ ...current, status: event.target.value }))}
                  className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Pending</option>
                  <option>Banned</option>
                </select>
              </div>
            </div>
            <div className="rounded-4xl border border-white/10 bg-slate-950/90 p-6 shadow-xl shadow-black/10">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-white">Users</h3>
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search users..."
                  className="input-glass w-full max-w-md rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10 text-left text-sm">
                  <thead className="bg-slate-900/90 text-slate-400">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Joined</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 bg-slate-950/80">
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 text-white">{user.name}</td>
                        <td className="px-6 py-4 text-slate-300">{user.email}</td>
                        <td className="px-6 py-4 text-slate-300">{user.type}</td>
                        <td className="px-6 py-4">{badge(user.status, userStatusStyles[user.status])}</td>
                        <td className="px-6 py-4 text-slate-300">{user.joinedAt}</td>
                        <td className="px-6 py-4 flex flex-wrap gap-2">
                          {user.status === "Banned" ? (
                            <Button
                              type="button"
                              variant="secondary"
                              size="sm"
                              onClick={() =>
                                setUsers((current) =>
                                  current.map((u) =>
                                    u.id === user.id ? { ...u, status: "Active" } : u
                                  )
                                )
                              }
                            >
                              Unban
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserBanToggle(user)}
                            >
                              Ban
                            </Button>
                          )}
                          <Button
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            Delete
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
      case "feedback":
        return (
          <div className="space-y-6">
            <div className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
              <h2 className="text-2xl font-semibold text-white">Feedback</h2>
              <p className="mt-2 text-sm text-slate-400">Track user feedback and close requests with admin actions.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {feedback.map((item) => (
                <Card key={item.id} className="rounded-4xl border border-white/10 bg-slate-950/90 p-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <p className="mt-1 text-xs font-bold tracking-[0.22em] text-slate-500">{item.sender}</p>
                    </div>
                    <p className="text-sm text-slate-300 leading-7">{item.message}</p>
                    <div className="flex items-center justify-between text-sm text-slate-400">
                      <span>{item.date}</span>
                      {badge(item.status, item.status === "Resolved" ? "bg-emerald-500/15 text-emerald-300" : item.status === "Responded" ? "bg-indigo-500/15 text-indigo-300" : "bg-slate-700/70 text-slate-200")}
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setResponseTarget(item);
                          setResponseText("");
                        }}
                      >
                        Respond
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleResolveFeedback(item.id)}
                      >
                        Mark Resolved
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
         default:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 xl:grid-cols-3">
              <Card className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
                <p className="text-sm font-bold tracking-[0.3em] text-slate-400">Total Users</p>
                <p className="mt-4 text-4xl font-semibold text-white">{totalUsers}</p>
              </Card>
              <Card className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
                <p className="text-sm font-bold tracking-[0.3em] text-slate-400">Pending HR Approvals</p>
                <p className="mt-4 text-4xl font-semibold text-white">{pendingApprovals}</p>
              </Card>
              <Card className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
                <p className="text-sm font-bold tracking-[0.3em] text-slate-400">Active Jobs</p>
                <p className="mt-4 text-4xl font-semibold text-white">{activeJobCount}</p>
              </Card>

            </div>
            <div className="grid gap-4 xl:grid-cols-1">
              <Card className="rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-xl shadow-black/20">
                <p className="text-sm font-bold tracking-[0.3em] text-slate-400">Total Applications</p>
                <p className="mt-4 text-4xl font-semibold text-white">{totalApplications}</p>
              </Card>
            </div>
          </div>
        );
    }
  }, [activeSection, approvals, activityLogs, feedback, filters.type, filters.status, search, users]);

  return (
    <div className="min-h-screen bg-[#050509] text-white font-sans antialiased">
      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-8 xl:grid-cols-[280px_1fr]">
          <aside className="space-y-6 rounded-4xl border border-white/10 bg-[#0b1018] p-6 shadow-2xl shadow-black/20">
            <div className="space-y-2">
              <p className="text-sm font-bold tracking-[0.3em] text-indigo-300">Admin Console</p>
              <h1 className="text-3xl font-semibold text-white">Platform administration</h1>
              <p className="text-sm text-slate-400">Monitor HR approvals, users, feedback, and activity from one place.</p>
            </div>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  type="button"
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full rounded-3xl px-5 py-4 text-left text-sm font-medium transition ${section.id === activeSection
                    ? "bg-indigo-500/10 text-white ring-1 ring-indigo-500/30"
                    : "text-slate-300 hover:bg-white/5"
                    }`}
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </aside>

          <section className="space-y-6">{sectionContent}</section>
        </div>
      </main>

      <Modal
        open={Boolean(activeApprovalDoc)}
        title={activeApprovalDoc?.company ?? "Company Documents"}
        onClose={() => setActiveApprovalDoc(null)}
        size="lg"
      >
        {activeApprovalDoc ? (
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-900/70 p-6 border border-white/10">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Company Name</p>
                  <p className="text-lg font-semibold text-white">{activeApprovalDoc.company}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Contact Person</p>
                  <p className="text-white">{activeApprovalDoc.contactPerson}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Email</p>
                  <p className="text-white">{activeApprovalDoc.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-1">Website</p>
                  <p className="text-indigo-400 hover:text-indigo-300 break-all">
                    <a href={activeApprovalDoc.website} target="_blank" rel="noopener noreferrer">
                      {activeApprovalDoc.website}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900/70 p-6 border border-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Verification Documents</p>
              <div className="bg-slate-950/50 rounded-2xl p-8 border-2 border-dashed border-slate-700 text-center">
                <div className="text-4xl mb-3">📄</div>
                <p className="font-semibold text-white mb-1">Document Verification Required</p>
                <p className="text-sm text-slate-400 mb-4">{activeApprovalDoc.documents}</p>
                <div className="text-xs text-slate-500 space-y-1">
                  <p>✓ Business registration certificate</p>
                  <p>✓ Tax license</p>
                  <p>✓ Company profile verification</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(approveTarget)}
        title="Approve HR Registration"
        onClose={() => setApproveTarget(null)}
        size="md"
        footer={
          <div className="flex flex-wrap gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setApproveTarget(null)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleConfirmApprove}
            >
              Approve Registration
            </Button>
          </div>
        }
      >
        {approveTarget ? (
          <div className="space-y-4">
            <div className="rounded-3xl bg-emerald-500/10 p-4 text-sm text-emerald-300 border border-emerald-500/20">
              <p className="font-semibold">Approve {approveTarget.company}?</p>
              <p className="mt-2 text-xs leading-6">
                ✓ HR account will be activated immediately<br />
                ✓ Contact person will receive login credentials<br />
                ✓ They can start posting jobs right away
              </p>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-4 border border-slate-700">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-2">Company Details</p>
              <div className="space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-400">Name:</span> {approveTarget.company}</p>
                <p><span className="text-slate-400">Contact:</span> {approveTarget.contactPerson}</p>
                <p><span className="text-slate-400">Email:</span> {approveTarget.email}</p>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(rejectTarget)}
        title="Reject HR Registration"
        onClose={() => {
          setRejectTarget(null);
          setRejectReason("");
          setRejectDetails("");
        }}
        size="md"
        footer={
          <div className="flex flex-wrap gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setRejectTarget(null);
                setRejectReason("");
                setRejectDetails("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="bg-rose-600! hover:bg-rose-700!"
              onClick={handleConfirmReject}
            >
              Reject Registration
            </Button>
          </div>
        }
      >
        {rejectTarget ? (
          <div className="space-y-5">
            <div className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-300 border border-rose-500/20">
              <p className="font-semibold">Reject {rejectTarget.company}?</p>
              <p className="mt-2 text-xs">They will be notified with your rejection reason.</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Reason for Rejection</label>
              <select
                value={rejectReason}
                onChange={(event) => setRejectReason(event.target.value)}
                className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
              >
                <option value="">Select a reason...</option>
                <option value="Incomplete documentation">Incomplete documentation</option>
                <option value="Invalid business registration">Invalid business registration</option>
                <option value="Suspicious activity">Suspicious activity</option>
                <option value="Does not meet requirements">Does not meet requirements</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Message to Company</label>
              <textarea
                value={rejectDetails}
                onChange={(event) => setRejectDetails(event.target.value)}
                className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200 min-h-20"
                placeholder="Explain the rejection reason and what they can do to reapply..."
              />
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(banTarget)}
        title="Ban User"
        onClose={() => {
          setBanTarget(null);
          setBanReason("");
          setBanDuration("30 days");
          setBanDetails("");
        }}
        size="md"
        footer={
          <div className="flex flex-wrap gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setBanTarget(null);
                setBanReason("");
                setBanDuration("30 days");
                setBanDetails("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="bg-rose-600! hover:bg-rose-700!"
              onClick={handleConfirmBan}
            >
              Ban User
            </Button>
          </div>
        }
      >
        {banTarget ? (
          <div className="space-y-5">
            <div className="rounded-3xl bg-rose-500/10 p-4 text-sm text-rose-300 border border-rose-500/20">
              <p className="font-semibold">Ban {banTarget.name}?</p>
              <p className="mt-1 text-xs">Email: {banTarget.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Reason for Ban</label>
              <select
                value={banReason}
                onChange={(event) => setBanReason(event.target.value)}
                className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
              >
                <option value="">Select a reason...</option>
                <option value="Spam activity">Spam activity</option>
                <option value="Harassment">Harassment</option>
                <option value="Inappropriate content">Inappropriate content</option>
                <option value="Fraud">Fraud</option>
                <option value="Policy violation">Policy violation</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Ban Duration</label>
              <select
                value={banDuration}
                onChange={(event) => setBanDuration(event.target.value)}
                className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
              >
                <option value="7 days">7 days</option>
                <option value="30 days">30 days</option>
                <option value="90 days">90 days</option>
                <option value="1 year">1 year</option>
                <option value="Permanent">Permanent</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Additional Details</label>
              <textarea
                value={banDetails}
                onChange={(event) => setBanDetails(event.target.value)}
                className="input-glass w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200 min-h-24"
                placeholder="Explain the reason for the ban to help the user understand..."
              />
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal
        open={Boolean(responseTarget)}
        title={responseTarget?.title ?? "Respond to Feedback"}
        onClose={() => {
          setResponseTarget(null);
          setResponseText("");
        }}
        size="md"
        footer={
          <div className="flex flex-wrap gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setResponseTarget(null);
                setResponseText("");
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                if (responseTarget) {
                  setFeedback((current) =>
                    current.map((item) =>
                      item.id === responseTarget.id ? { ...item, status: "Responded" } : item
                    )
                  );
                }
                setResponseTarget(null);
                setResponseText("");
              }}
            >
              Send Response
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-300">Write a response for the user feedback message.</p>
          <textarea
            value={responseText}
            onChange={(event) => setResponseText(event.target.value)}
            className="input-glass min-h-45 w-full rounded-2xl border border-indigo-500/10 bg-slate-950/70 px-4 py-3 text-sm text-gray-200"
            placeholder="Type your response here..."
          />
        </div>
      </Modal>
    </div>
  );
}
