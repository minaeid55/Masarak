"use client";
 
//Upload cv is the page of find jobs  
import { useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Button } from "../../components/ui/Button";

type UploadCVProps = {
  onUploadComplete: () => void;
};

export function UploadCV({ onUploadComplete }: UploadCVProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChooseFile = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    // simulate analysis delay (5s) and store mock analysis tailored to selected role
    window.setTimeout(() => {
      setIsLoading(false);

      // rotate uploadCount to choose a track automatically: 0 -> frontend, 1 -> backend, 2 -> flutter
      let uploadCount = 0;
      try {
        uploadCount = parseInt(localStorage.getItem("uploadCount") || "0", 10) || 0;
      } catch {}
      uploadCount += 1;
      try {
        localStorage.setItem("uploadCount", String(uploadCount));
      } catch {}

      const roles: Array<"frontend" | "backend" | "flutter"> = ["frontend", "backend", "flutter"];
      const role = roles[(uploadCount - 1) % roles.length];

      const analysis = {
        role,
        uploadedAt: new Date().toISOString(),
        detectedSkills: role === "frontend" ? ["React", "JavaScript", "CSS", "HTML"] : role === "flutter" ? ["Dart", "Flutter"] : ["Node.js", "Express", "SQL"],
        // short, analysis-level missing skills summary — detailed per-job missing skills are in job pools
        missingSkills: role === "frontend" ? ["TypeScript", "GraphQL"] : role === "flutter" ? ["State Management", "Platform Channels"] : ["Testing", "Microservices"],
      };

      try {
        localStorage.setItem("lastCvAnalysis", JSON.stringify(analysis));
      } catch (e) {
        // ignore
      }

      onUploadComplete();
    }, 5000);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-[2rem] border-2 border-dashed border-indigo-500/30 bg-slate-950/90 shadow-xl shadow-black/20 p-10 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-500/10 text-indigo-300 text-4xl">
            <FiUploadCloud />
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-white">Upload Your CV</h2>
            <p className="mt-3 text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Upload your CV in PDF or DOCX format to get started
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-3">
              <Button
                type="button"
                onClick={handleChooseFile}
                className="bg-linear-to-r from-indigo-500 to-purple-600 text-white px-10 py-4 rounded-2xl shadow-lg shadow-indigo-500/20"
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Choose File"}
              </Button>
            </div>
            {fileName ? (
              <p className="text-sm text-slate-600">Selected file: {fileName}</p>
            ) : null}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleFileChange}
          />

          {isLoading ? (
            <div className="flex items-center justify-center gap-3 text-slate-700 pt-4">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-violet-500/25 border-t-violet-500" />
              <span className="font-medium">Simulating AI analysis...</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
