import { Features } from "./Features";
import { HowItWorks } from "./HowItWorks";
import { DashboardPreview } from "./DashboardPreview";

export function Hero() {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 lg:pt-40 lg:pb-28 relative overflow-hidden min-h-[90vh] flex items-center"
    >
      <div className="absolute top-1/4 left-1/4 w-125 h-125 bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-125 h-125 bg-purple-600/20 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-indigo-400 font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              AI-Powered Career Growth
            </div>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
              Unlock Your True Potential with <span className="bg-linear-to-r from-[#746ddd] to-[#a55bf5] bg-clip-text text-transparent">Smart AI</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              Connect with top companies instantly. Our AI analyzes your CV, identifies skill gaps, and matches you with your dream job.
            </p>
            <HowItWorks />
            <Features />
          </div>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
