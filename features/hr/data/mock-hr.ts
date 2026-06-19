export type JobStatus =
  | "Draft"
  | "Pending Review"
  | "Rejected"
  | "Awaiting Payment"
  | "Active";

export type Skill = {
  name: string;
  category: string;
  level: string;
};

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  experience: string;
  salaryRange: string;
  status: JobStatus;
  postedAt: string;
  applicants: number;
  matchPercent: number;
};

export type Applicant = {
  id: string;
  name: string;
  role: string;
  matchScore: number;
  experience: string;
  status: "Applied" | "Shortlisted" | "Accepted" | "Rejected";
  appliedDate: string;
  matchingSkills: Skill[];
  missingSkills: Skill[];
  coverLetter: string;
  cvFile: string;
};

export type CompanyProfile = {
  name: string;
  website: string;
  industry: string;
  description: string;
};

export const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "Mosaic Labs",
    location: "Cairo, Egypt",
    experience: "Senior",
    salaryRange: "EGP 18,000 - 23,000",
    status: "Active",
    postedAt: "2026-06-12",
    applicants: 21,
    matchPercent: 92,
  },
  {
    id: "job-2",
    title: "Product Designer",
    company: "NextBridge",
    location: "Remote",
    experience: "Mid-level",
    salaryRange: "EGP 12,500 - 16,000",
    status: "Awaiting Payment",
    postedAt: "2026-06-15",
    applicants: 14,
    matchPercent: 78,
  },
  {
    id: "job-3",
    title: "Talent Acquisition Manager",
    company: "Masarak",
    location: "Hybrid — Cairo",
    experience: "Senior",
    salaryRange: "EGP 20,000 - 27,000",
    status: "Pending Review",
    postedAt: "2026-06-18",
    applicants: 8,
    matchPercent: 84,
  },
  {
    id: "job-4",
    title: "Backend Engineer",
    company: "PixelTree",
    location: "Alexandria, Egypt",
    experience: "Mid-level",
    salaryRange: "EGP 14,000 - 18,000",
    status: "Rejected",
    postedAt: "2026-06-10",
    applicants: 9,
    matchPercent: 68,
  },
  {
    id: "job-5",
    title: "HR Business Partner",
    company: "Studio 47",
    location: "Cairo, Egypt",
    experience: "Mid-level",
    salaryRange: "EGP 13,000 - 17,000",
    status: "Draft",
    postedAt: "2026-06-19",
    applicants: 0,
    matchPercent: 0,
  },
];

export const applicants: Applicant[] = [
  {
    id: "applicant-1",
    name: "Lina Mahmoud",
    role: "Frontend Developer",
    matchScore: 91,
    experience: "5 years",
    status: "Applied",
    appliedDate: "2026-06-17",
    matchingSkills: [
      { name: "React", category: "Frontend", level: "Advanced" },
      { name: "TypeScript", category: "Frontend", level: "Advanced" },
      { name: "Tailwind CSS", category: "UI", level: "Intermediate" },
    ],
    missingSkills: [
      { name: "GraphQL", category: "API", level: "Intermediate" },
      { name: "Redux Toolkit", category: "State", level: "Intermediate" },
    ],
    coverLetter:
      "I am excited to apply to this role because I enjoy building performance-driven web experiences and collaborating closely with designers.",
    cvFile: "Lina_Mahmoud_CV.pdf",
  },
  {
    id: "applicant-2",
    name: "Omar Adel",
    role: "Product Designer",
    matchScore: 85,
    experience: "4 years",
    status: "Shortlisted",
    appliedDate: "2026-06-16",
    matchingSkills: [
      { name: "Figma", category: "Design", level: "Advanced" },
      { name: "User Research", category: "UX", level: "Intermediate" },
    ],
    missingSkills: [
      { name: "Motion Design", category: "Visual", level: "Intermediate" },
    ],
    coverLetter:
      "I enjoy turning product strategy into delightful user flows and shipping scalable design systems.",
    cvFile: "Omar_Adel_CV.pdf",
  },
  {
    id: "applicant-3",
    name: "Sara Nader",
    role: "Backend Engineer",
    matchScore: 77,
    experience: "3 years",
    status: "Rejected",
    appliedDate: "2026-06-15",
    matchingSkills: [
      { name: "Node.js", category: "Backend", level: "Intermediate" },
      { name: "SQL", category: "Database", level: "Intermediate" },
    ],
    missingSkills: [
      { name: "NestJS", category: "Framework", level: "Intermediate" },
      { name: "Microservices", category: "Architecture", level: "Intermediate" },
    ],
    coverLetter:
      "I am looking for a place where I can grow into a technical lead while solving meaningful backend challenges.",
    cvFile: "Sara_Nader_CV.pdf",
  },
];

export const companyProfile: CompanyProfile = {
  name: "Masarak Talent",
  website: "https://masarak.ai",
  industry: "Recruitment Technology",
  description:
    "Masarak Talent helps companies connect with the right candidates using AI-powered matching, CV screening, and hiring analytics.",
};
