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
  {
    id: "job-6",
    title: "Data Analyst",
    company: "Eagle Analytics",
    location: "Cairo, Egypt",
    experience: "Mid-level",
    salaryRange: "EGP 11,500 - 15,500",
    status: "Active",
    postedAt: "2026-06-13",
    applicants: 18,
    matchPercent: 88,
  },
  {
    id: "job-7",
    title: "Customer Success Lead",
    company: "Beacon HR",
    location: "Remote",
    experience: "Senior",
    salaryRange: "EGP 16,000 - 20,000",
    status: "Active",
    postedAt: "2026-06-11",
    applicants: 12,
    matchPercent: 90,
  },
  {
    id: "job-8",
    title: "Mobile Developer",
    company: "AppSpace",
    location: "Giza, Egypt",
    experience: "Mid-level",
    salaryRange: "EGP 13,000 - 17,500",
    status: "Awaiting Payment",
    postedAt: "2026-06-14",
    applicants: 11,
    matchPercent: 81,
  },
  {
    id: "job-9",
    title: "Growth Marketing Specialist",
    company: "SparkReach",
    location: "Cairo, Egypt",
    experience: "Mid-level",
    salaryRange: "EGP 12,000 - 15,000",
    status: "Pending Review",
    postedAt: "2026-06-16",
    applicants: 17,
    matchPercent: 75,
  },
  {
    id: "job-10",
    title: "QA Automation Engineer",
    company: "Nova Systems",
    location: "Alexandria, Egypt",
    experience: "Mid-level",
    salaryRange: "EGP 13,500 - 17,500",
    status: "Active",
    postedAt: "2026-06-09",
    applicants: 19,
    matchPercent: 86,
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
  {
    id: "applicant-4",
    name: "Yara Samir",
    role: "Data Analyst",
    matchScore: 83,
    experience: "4 years",
    status: "Applied",
    appliedDate: "2026-06-18",
    matchingSkills: [
      { name: "Power BI", category: "Analytics", level: "Advanced" },
      { name: "Python", category: "Data", level: "Intermediate" },
    ],
    missingSkills: [
      { name: "SQL Optimization", category: "Database", level: "Intermediate" },
    ],
    coverLetter:
      "I’m passionate about using data to drive business decisions and improve hiring outcomes.",
    cvFile: "Yara_Samir_CV.pdf",
  },
  {
    id: "applicant-5",
    name: "Hani Darwish",
    role: "DevOps Engineer",
    matchScore: 75,
    experience: "6 years",
    status: "Shortlisted",
    appliedDate: "2026-06-16",
    matchingSkills: [
      { name: "Docker", category: "DevOps", level: "Advanced" },
      { name: "AWS", category: "Cloud", level: "Intermediate" },
    ],
    missingSkills: [
      { name: "Kubernetes", category: "Cloud", level: "Intermediate" },
    ],
    coverLetter:
      "My background in automation and infrastructure helps teams release faster and more reliably.",
    cvFile: "Hani_Darwish_CV.pdf",
  },
  {
    id: "applicant-6",
    name: "Maya Fathy",
    role: "HR Coordinator",
    matchScore: 88,
    experience: "5 years",
    status: "Applied",
    appliedDate: "2026-06-17",
    matchingSkills: [
      { name: "HR Operations", category: "HR", level: "Advanced" },
      { name: "Talent Sourcing", category: "Recruiting", level: "Intermediate" },
    ],
    missingSkills: [
      { name: "Employer Branding", category: "HR", level: "Intermediate" },
    ],
    coverLetter:
      "I have a strong track record of improving onboarding and candidate communication for high-growth teams.",
    cvFile: "Maya_Fathy_CV.pdf",
  },
];

export const companyProfile: CompanyProfile = {
  name: "Masarak Talent",
  website: "https://masarak.ai",
  industry: "Recruitment Technology",
  description:
    "Masarak Talent helps companies connect with the right candidates using AI-powered matching, CV screening, and hiring analytics. Our platform is built for faster hiring decisions and better candidate experiences.",
};
