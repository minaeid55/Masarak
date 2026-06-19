import { PASSWORD_RESET_STEPS } from "@/features/auth/constants/auth-content";

type AuthStepIndicatorProps = {
  currentStep: number;
};

export function AuthStepIndicator({ currentStep }: AuthStepIndicatorProps) {
  return (
    <div className="flex items-center justify-between mb-10 relative">
      <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />

      {PASSWORD_RESET_STEPS.map((step) => {
        const isActive = currentStep === step.id;
        const isDone = currentStep > step.id;

        return (
          <div key={step.id} className="flex flex-col items-center z-10">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                ${
                  isDone
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                    : isActive
                      ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-110"
                      : "bg-white/10 text-gray-400"
                }`}
            >
              {isDone ? "✓" : step.id}
            </div>
            <span
              className={`text-xs mt-2 transition-colors ${
                isActive
                  ? "text-indigo-400 font-medium"
                  : isDone
                    ? "text-green-400"
                    : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
