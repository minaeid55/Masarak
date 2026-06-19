export type JobStatus = "Draft" | "Pending Review" | "Rejected" | "Awaiting Payment" | "Active";

export type JobPosting = {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  experience: string;
  type: string;
  location: string;
  salaryRange: string;
  deadline: string;
  status: JobStatus;
  applicants: number;
  matchPercent: number;
  postedAt: string;
};

export type ApplicantStatus = "New" | "Shortlisted" | "Accepted" | "Rejected";

export type ApplicantProfile = {
  id: string;
  name: string;
  role: string;
  company: string;
  matchScore: number;
  experience: string;
  status: ApplicantStatus;
  appliedDate: string;
  matchingSkills: string[];
  missingSkills: string[];
  coverLetter: string;
  cvFileName: string;
};

export type CompanyProfile = {
  name: string;
  website: string;
  industry: string;
  description: string;
};

export type HRSection = "dashboard" | "job-postings" | "applicants" | "company-profile";
