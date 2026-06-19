import { Button } from "@/components/ui/Button";
import type { HRSection } from "../types";

type HRDashboardSidebarProps = {
  activeSection: HRSection;
  onChange: (section: HRSection) => void;
};

const navItems: { key: HRSection; label: string }[] = [
  { key: "dashboard", label: "Dashboard" },
  { key: "job-postings", label: "Job Postings" },
  { key: "applicants", label: "Applicants" },
  { key: "company-profile", label: "Company Profile" },
];

export function HRDashboardSidebar({ activeSection, onChange }: HRDashboardSidebarProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-indigo-300">HR Dashboard</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Recruitment Hub</h2>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Manage jobs, applications, and company details from a single dashboard.
        </p>
      </div>
      <div className="space-y-3 rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-xl shadow-black/10">
        {navItems.map((item) => {
          const isActive = item.key === activeSection;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => onChange(item.key)}
              className={`w-full text-left rounded-2xl px-4 py-4 text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-500/15 text-white shadow-inner shadow-indigo-500/10"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
