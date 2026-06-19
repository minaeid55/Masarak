export type AdminUserType = "Job Seeker" | "HR" | "Admin";
export type UserStatus = "Active" | "Pending" | "Banned";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  type: AdminUserType;
  status: UserStatus;
  company?: string;
  joinedAt: string;
};

export type HRApproval = {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  website: string;
  registrationDate: string;
  documents: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type FeedbackEntry = {
  id: string;
  title: string;
  sender: string;
  message: string;
  date: string;
  status: "Open" | "Resolved" | "Responded";
};

export type ActivityLog = {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ipAddress: string;
  details: string;
};

export type AdminDashboardJob = {
  id: string;
  title: string;
  company: string;
  status: string;
  applicants: number;
  matchPercent: number;
};

export const users: AdminUser[] = [
  {
    id: "user-1",
    name: "Nada Hassan",
    email: "nada.hassan@example.com",
    type: "Job Seeker",
    status: "Active",
    joinedAt: "2026-04-12",
  },
  {
    id: "user-2",
    name: "Hussein Saleh",
    email: "hussein.saleh@example.com",
    type: "HR",
    status: "Pending",
    company: "Vertex HR",
    joinedAt: "2026-05-25",
  },
  {
    id: "user-3",
    name: "Marwa El-Sayed",
    email: "marwa.elsayed@example.com",
    type: "HR",
    status: "Active",
    company: "Pulse Recruit",
    joinedAt: "2026-03-18",
  },
  {
    id: "user-4",
    name: "Ahmed Khaled",
    email: "ahmed.khaled@example.com",
    type: "Job Seeker",
    status: "Banned",
    joinedAt: "2025-12-09",
  },
];

export const hrApprovals: HRApproval[] = [
  {
    id: "approval-1",
    company: "Skyline Talent",
    contactPerson: "Mayar Farouk",
    email: "mayar.farouk@skyline.com",
    website: "https://skylinehr.com",
    registrationDate: "2026-06-10",
    documents: "Business registration, tax license",
    status: "Pending",
  },
  {
    id: "approval-2",
    company: "Prime Recruit",
    contactPerson: "Youssef Adel",
    email: "youssef.adel@prime.com",
    website: "https://primerecruit.com",
    registrationDate: "2026-06-14",
    documents: "Business registration, company profile",
    status: "Pending",
  },
];

export const feedbackEntries: FeedbackEntry[] = [
  {
    id: "feedback-1",
    title: "Resume upload feedback missing",
    sender: "Amira Mostafa",
    message: "I could not upload my CV after multiple attempts. The file kept failing during analysis.",
    date: "2026-06-17",
    status: "Open",
  },
  {
    id: "feedback-2",
    title: "HR approval flow needs update",
    sender: "Omar Zaki",
    message: "Please add a reason field for rejected HR submissions and more detailed admin notes.",
    date: "2026-06-15",
    status: "Resolved",
  },
];

export const activityLogs: ActivityLog[] = [
  {
    id: "log-1",
    timestamp: "2026-06-18 14:12",
    user: "Admin User",
    action: "Approved HR registration",
    ipAddress: "192.168.1.84",
    details: "Approved Skyline Talent HR account.",
  },
  {
    id: "log-2",
    timestamp: "2026-06-18 10:05",
    user: "HR - Marwa El-Sayed",
    action: "Edited company profile",
    ipAddress: "192.168.1.102",
    details: "Updated company description for Pulse Recruit.",
  },
  {
    id: "log-3",
    timestamp: "2026-06-17 08:40",
    user: "Job Seeker - Nada Hassan",
    action: "Uploaded CV",
    ipAddress: "192.168.1.120",
    details: "Uploaded resume for job matching.",
  },
];

export const activeJobs: AdminDashboardJob[] = [
  {
    id: "active-job-1",
    title: "Senior Frontend Developer",
    company: "Mosaic Labs",
    status: "Active",
    applicants: 21,
    matchPercent: 92,
  },
  {
    id: "active-job-2",
    title: "Product Designer",
    company: "NextBridge",
    status: "Active",
    applicants: 14,
    matchPercent: 78,
  },
];
