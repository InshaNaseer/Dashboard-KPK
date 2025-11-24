"use client";

import type React from "react";

import { useAuth } from "@/components/auth-context";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isReady } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isReady, isLoggedIn, router]);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
