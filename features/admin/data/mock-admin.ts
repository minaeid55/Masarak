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
  {
    id: "user-5",
    name: "Nour El-Gendy",
    email: "nour.elgendy@example.com",
    type: "HR",
    status: "Active",
    company: "TalentSphere",
    joinedAt: "2026-02-08",
  },
  {
    id: "user-6",
    name: "Amr Samir",
    email: "amr.samir@example.com",
    type: "Job Seeker",
    status: "Active",
    joinedAt: "2026-05-03",
  },
  {
    id: "user-7",
    name: "Fatma Raouf",
    email: "fatma.raouf@example.com",
    type: "HR",
    status: "Pending",
    company: "Bridge Talent",
    joinedAt: "2026-06-11",
  },
  {
    id: "user-8",
    name: "Yara Anwar",
    email: "yara.anwar@example.com",
    type: "Job Seeker",
    status: "Active",
    joinedAt: "2026-03-28",
  },
  {
    id: "user-9",
    name: "Karim Fouad",
    email: "karim.fouad@example.com",
    type: "HR",
    status: "Active",
    company: "NovaSource",
    joinedAt: "2026-01-20",
  },
  {
    id: "user-10",
    name: "Samar Hossam",
    email: "samar.hossam@example.com",
    type: "Admin",
    status: "Active",
    joinedAt: "2025-10-05",
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
  {
    id: "approval-3",
    company: "Pulse Recruit",
    contactPerson: "Marwa El-Sayed",
    email: "marwa.elsayed@pulserecruit.com",
    website: "https://pulserecruit.com",
    registrationDate: "2026-05-20",
    documents: "Tax certificate, business license",
    status: "Approved",
  },
  {
    id: "approval-4",
    company: "Anchor HR",
    contactPerson: "Hala Mostafa",
    email: "hala.mostafa@anchorhr.com",
    website: "https://anchorhr.co",
    registrationDate: "2026-06-01",
    documents: "Business registration, VAT certificate",
    status: "Approved",
  },
  {
    id: "approval-5",
    company: "FutureBridge",
    contactPerson: "Omar Zaki",
    email: "omar.zaki@futurebridge.com",
    website: "https://futurebridge.com",
    registrationDate: "2026-06-17",
    documents: "Company profile, partnership agreement",
    status: "Pending",
  },
  {
    id: "approval-6",
    company: "TalentEdge",
    contactPerson: "Aya Naguib",
    email: "aya.naguib@talentedge.com",
    website: "https://talentedge.me",
    registrationDate: "2026-06-05",
    documents: "Business registration, national ID copy",
    status: "Rejected",
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
  {
    id: "feedback-3",
    title: "Match score seems low for senior profiles",
    sender: "Salma Kamal",
    message: "Senior candidates with strong CVs are given low match scores for technical roles.",
    date: "2026-06-16",
    status: "Responded",
  },
  {
    id: "feedback-4",
    title: "Need filter by experience level",
    sender: "Tamer Ibrahim",
    message: "Please add an experience filter for job searches and candidate shortlists.",
    date: "2026-06-14",
    status: "Open",
  },
  {
    id: "feedback-5",
    title: "Verification email takes too long",
    sender: "Noha Salem",
    message: "The OTP email arrives after several minutes, this causes users to drop off.",
    date: "2026-06-18",
    status: "Open",
  },
  {
    id: "feedback-6",
    title: "Dashboard charts need a date range picker",
    sender: "Rana Sherif",
    message: "It would be useful to filter analytics by week, month, or quarter.",
    date: "2026-06-19",
    status: "Open",
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
  {
    id: "log-4",
    timestamp: "2026-06-17 11:22",
    user: "Admin User",
    action: "Rejected HR registration",
    ipAddress: "192.168.1.89",
    details: "Rejected TalentEdge due to missing tax documents.",
  },
  {
    id: "log-5",
    timestamp: "2026-06-16 09:15",
    user: "HR - Hussein Saleh",
    action: "Posted new job",
    ipAddress: "192.168.1.110",
    details: "Created job posting for UX Researcher at Vertex HR.",
  },
  {
    id: "log-6",
    timestamp: "2026-06-15 13:50",
    user: "Job Seeker - Amr Samir",
    action: "Updated profile",
    ipAddress: "192.168.1.121",
    details: "Added new portfolio link and completed work history.",
  },
  {
    id: "log-7",
    timestamp: "2026-06-14 17:03",
    user: "Admin User",
    action: "Resolved feedback",
    ipAddress: "192.168.1.84",
    details: "Marked HR approval flow issue as resolved.",
  },
  {
    id: "log-8",
    timestamp: "2026-06-19 08:30",
    user: "HR - Fatma Raouf",
    action: "Uploaded verification documents",
    ipAddress: "192.168.1.107",
    details: "Submitted documents for Bridge Talent approval.",
  },
];

export const activeJobs: AdminDashboardJob[] = [
  {
    id: "active-job-1",
    title: "Senior Frontend Developer",
    company: "Mosaic Labs",
    status: "Active",
    applicants: 25,
    matchPercent: 90,
  },
  {
    id: "active-job-2",
    title: "Product Designer",
    company: "NextBridge",
    status: "Active",
    applicants: 18,
    matchPercent: 80,
  },
  {
    id: "active-job-3",
    title: "Talent Acquisition Manager",
    company: "Masarak",
    status: "Pending Review",
    applicants: 10,
    matchPercent: 86,
  },
  {
    id: "active-job-4",
    title: "Data Analyst",
    company: "Eagle Analytics",
    status: "Active",
    applicants: 22,
    matchPercent: 89,
  },
  {
    id: "active-job-5",
    title: "HR Business Partner",
    company: "Studio 47",
    status: "Draft",
    applicants: 1,
    matchPercent: 0,
  },
  {
    id: "active-job-6",
    title: "QA Automation Engineer",
    company: "Nova Systems",
    status: "Active",
    applicants: 23,
    matchPercent: 88,
  },
];
