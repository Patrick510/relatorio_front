import type React from "react";
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
