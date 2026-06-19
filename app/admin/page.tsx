"use client";

import { Navbar } from "@/components/Navbar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#050509] text-white">
        <Navbar />
        <AdminDashboard />
      </div>
    </ProtectedRoute>
  );
}
