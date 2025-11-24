"use client";

import { useAuth } from "@/components/auth-context";
import { MainLayout } from "@/components/layout/main-layout";
import { TraineeDashboard } from "@/components/dashboards/trainee-dashboard";
import { TrainerDashboard } from "@/components/dashboards/trainer-dashboard";
import { DPDDashboard } from "@/components/dashboards/dpd-dashboard";
import { DPDAdminDashboard } from "@/components/dashboards/dpd-admin-dashboard";
import { EMISAdminDashboard } from "@/components/dashboards/emis-admin-dashboard";

export default function DashboardPage() {
  const { user, isReady } = useAuth();

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <MainLayout>
      {user.role === "trainee" && <TraineeDashboard user={user} />}
      {user.role === "trainer" && <TrainerDashboard user={user} />}
      {user.role === "dpd_rpdc" && <DPDDashboard user={user} />}
      {user.role === "dpd_admin" && <DPDAdminDashboard user={user} />}
      {user.role === "emis_admin" && <EMISAdminDashboard user={user} />}
    </MainLayout>
  );
}
