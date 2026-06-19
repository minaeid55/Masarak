import { FaCheckCircle } from "react-icons/fa";
// Features.tsx is for home section "Features" behind Upload cv button.
const features = [
  { label: "Free Analysis" },
  { label: "Smart Matching" },
  { label: "Privacy First" },
];

export function Features() {
  return (
    <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-400">
      {features.map(({ label }) => (
        <div key={label} className="flex items-center gap-2">
          <FaCheckCircle className="text-indigo-400" />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
