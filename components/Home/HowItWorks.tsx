"use client";

// HowItWorks is for home section "How it works" two buttons "Upload CV" and "Find Jobs".
import { FaCloudUploadAlt, FaSearch } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";

export function HowItWorks() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isAuthenticated = status === "authenticated";

  const handleUploadCV = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/find-jobs");
    }
  };

  const handleFindJobs = () => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/find-jobs");
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
      <Button
        onClick={handleUploadCV}
        className="bg-linear-to-r from-[#6f66e9] to-[#a55bf5]  px-8 py-4 rounded-xl text-lg font-semibold shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
        icon={<FaCloudUploadAlt />}
      >
        Upload CV
      </Button>
      <Button
        onClick={handleFindJobs}
        variant="secondary"
        className="px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center gap-2"
        icon={<FaSearch />}
      >
        Find Jobs
      </Button>
    </div>
  );
}
