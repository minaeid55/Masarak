import Image from "next/image";
import { FiTrendingUp } from "react-icons/fi";
import { FaBriefcase, FaGoogle, FaFigma } from "react-icons/fa";
import { Card } from "../ui/Card";
 
// DashboardPreview is a component that shows in home. 
const stats = [
  {
    label: "CV Score",
    value: "94",
    hint: "/100",
    progressClass: "w-[94%]",
  },
  {
    label: "Profile Strength",
    value: "Excellent",
    hint: "",
    progressClass: "w-[85%]",
  },
];

const topMatches = [
  {
    title: "UX Lead",
    subtitle: "Google • Remote",
    score: "98% Match",
    icon: FaGoogle,
    badgeClass: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Product Designer",
    subtitle: "Figma • San Francisco",
    score: "95% Match",
    icon: FaFigma,
    badgeClass: "bg-purple-500/20 text-purple-400",
  },
];

export function DashboardPreview() {
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none">
      <Card className="p-6 rounded-2xl shadow-2xl shadow-indigo-500/20 relative transform lg:rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
              alt="Profile"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full border-2 border-indigo-500/50 object-cover"
            />
            <div>
              <h3 className="text-white font-semibold">Alex Johnson</h3>
              <p className="text-gray-400 text-xs">Senior Product Designer</p>
            </div>
          </div>

          <div className="glass-card px-3 py-1.5 rounded-lg text-xs font-medium text-green-400 flex items-center gap-1">
            <FiTrendingUp className="text-base" />
            Top 5%
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {stats.map(({ label, value, hint, progressClass }) => (
            <div key={label} className="glass-card p-4 rounded-xl bg-white/5">
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <div className="flex items-end gap-2">
                <span className="text-2xl font-bold text-white ">{value}</span>
                {hint ? <span className="text-indigo-400 text-xs mb-1 ">{hint}</span> : null}
              </div>
              <div className="w-full bg-dark-800 rounded-full h-1.5 mt-2">
                <div className={`bg-linear-to-r from-[#6f66e9] to-[#a55bf5] h-1.5 rounded-full ${progressClass}`} />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="text-sm font-medium text-white mb-3 flex items-center gap-2">
            <FaBriefcase className="text-indigo-400" />
            Top Matches
          </p>
          <div className="space-y-3">
            {topMatches.map(({ title, subtitle, score, icon: Icon, badgeClass }) => (
              <div
                key={title}
                className="glass-card p-3 rounded-xl flex items-center justify-between bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded ${badgeClass} flex items-center justify-center`}>
                    <Icon />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{title}</h4>
                    <p className="text-xs text-gray-400">{subtitle}</p>
                  </div>
                </div>
                <span className="text-indigo-400 text-xs font-semibold">{score}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
