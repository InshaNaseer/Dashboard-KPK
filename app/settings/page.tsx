"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth-context";
import { DEMO_USERS } from "@/lib/auth";
import {
  Power,
  Users,
  Settings,
  Shield,
  Database,
  Bell,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function SettingsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [portalOnline, setPortalOnline] = useState(true);
  const [selectedUserEmail, setSelectedUserEmail] = useState(
    DEMO_USERS[0]?.email || ""
  );
  const [selectedRole, setSelectedRole] = useState("trainee");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const isAuthorized = user?.role === "emis_admin";

  const selectedUser = DEMO_USERS.find((u) => u.email === selectedUserEmail);

  useEffect(() => {
    if (selectedUser) {
      setSelectedRole(selectedUser.role);
    }
  }, [selectedUserEmail, selectedUser]);

  const handleUpdateRole = () => {
    if (!selectedUser) return;

    toast({
      title: "Role updated successfully",
      description: `${
        selectedUser.name
      }'s role has been changed to ${selectedRole
        .replace("_", " ")
        .toUpperCase()}.`,
    });
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    toast({
      title: emailNotifications
        ? "Email notifications disabled"
        : "Email notifications enabled",
      description: emailNotifications
        ? "System updates will no longer be sent via email."
        : "You will receive system updates via email.",
    });
  };

  const handleToggleAutoBackup = () => {
    setAutoBackup(!autoBackup);
    toast({
      title: autoBackup ? "Auto backup disabled" : "Auto backup enabled",
      description: autoBackup
        ? "Daily database backups have been disabled."
        : "Daily database backups are now active.",
    });
  };

  const handleToggleMaintenanceMode = () => {
    setMaintenanceMode(!maintenanceMode);
    toast({
      title: maintenanceMode
        ? "Maintenance alerts disabled"
        : "Maintenance alerts enabled",
      description: maintenanceMode
        ? "Scheduled maintenance alerts are now disabled."
        : "You will receive alerts for scheduled maintenance.",
    });
  };

  const handlePortalToggle = () => {
    setPortalOnline(!portalOnline);
    toast({
      title: portalOnline ? "Portal taken offline" : "Portal brought online",
      description: portalOnline
        ? "The portal is now in maintenance mode. Users cannot access it."
        : "The portal is now online and accessible to all users.",
    });
  };

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <Shield className="w-16 h-16 mx-auto mb-4 text-indigo-500" />
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                Access Restricted
              </h2>
              <p className="text-slate-600">
                You do not have access to settings. Only EMIS Administrators can
                manage system settings.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#4b3be0] via-[#7846ff] to-[#9c4bff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Settings className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                System Settings
              </h1>
              <p className="text-sm opacity-90">
                Configure and manage system-wide settings
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          {/* Portal Status Control */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                  <Power className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Portal Status
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Control system availability
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/60 p-5">
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">
                    Portal Online Status
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Toggle the entire portal availability for users
                  </p>
                </div>
                <button
                  onClick={handlePortalToggle}
                  className={`relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-300 shadow-sm ${
                    portalOnline ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      portalOnline ? "translate-x-8" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div
                className={`rounded-2xl p-4 ${
                  portalOnline
                    ? "bg-emerald-50 border border-emerald-200"
                    : "bg-amber-50 border border-amber-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      portalOnline ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                  />
                  <p
                    className={`text-sm font-semibold ${
                      portalOnline ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {portalOnline
                      ? "✓ Portal is ONLINE"
                      : "✗ Portal is OFFLINE"}
                  </p>
                </div>
                <p
                  className={`text-xs mt-2 ${
                    portalOnline ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {portalOnline
                    ? "All users can access the portal normally"
                    : "Users will see a maintenance message and cannot access the portal"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    User Management
                  </CardTitle>
                  <p className="text-sm text-slate-500">Manage user accounts</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 block mb-2">
                  Select User to Manage
                </label>
                <select
                  value={selectedUserEmail}
                  onChange={(e) => setSelectedUserEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                  {DEMO_USERS.map((u) => (
                    <option key={u.email} value={u.email}>
                      {u.name} - {u.role.replace("_", " ").toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* User Details */}
              {selectedUser && (
                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50/60 p-5 space-y-4">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-3">
                      User Information
                    </p>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500">Name:</span>
                        <span className="font-semibold text-slate-900">
                          {selectedUser.name}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-slate-200">
                        <span className="text-slate-500">Email:</span>
                        <span className="font-semibold text-slate-900">
                          {selectedUserEmail}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-t border-slate-200">
                        <span className="text-slate-500">Current Role:</span>
                        <span className="inline-flex px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                          {selectedUser.role.replace("_", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Change Role */}
                  <div className="pt-4 border-t border-slate-200">
                    <label className="text-xs text-slate-500 uppercase font-semibold tracking-wide block mb-3">
                      Change User Role
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    >
                      <option value="trainee">Trainee (Teacher)</option>
                      <option value="trainer">Trainer</option>
                      <option value="dpd_rpdc">DPD/RPDC Staff</option>
                      <option value="dpd_admin">DPD Admin</option>
                      <option value="emis_admin">EMIS Admin</option>
                    </select>
                    <Button
                      onClick={handleUpdateRole}
                      className="mt-3 w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                    >
                      <Save className="h-4 w-4" />
                      Update Role
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* System Information */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    System Information
                  </CardTitle>
                  <p className="text-sm text-slate-500">Portal details</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-sm text-slate-500">Portal Name:</span>
                <span className="text-sm font-semibold text-slate-900">
                  KPK Teacher Training Portal
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-sm text-slate-500">Version:</span>
                <span className="inline-flex px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                  1.0.0
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-slate-100">
                <span className="text-sm text-slate-500">Total Users:</span>
                <span className="text-sm font-semibold text-slate-900">
                  {DEMO_USERS.length}
                </span>
              </div>
              <div className="flex justify-between items-center py-2.5">
                <span className="text-sm text-slate-500">Last Updated:</span>
                <span className="text-sm font-semibold text-slate-900">
                  November 21, 2025
                </span>
              </div>
            </CardContent>
          </Card>

          {/* System Preferences */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100">
                  <Bell className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    System Preferences
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Notification settings
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Email Notifications
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Send system updates via email
                  </p>
                </div>
                <button
                  onClick={handleToggleEmailNotifications}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-sm ${
                    emailNotifications ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Auto Backup
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Daily database backups
                  </p>
                </div>
                <button
                  onClick={handleToggleAutoBackup}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-sm ${
                    autoBackup ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      autoBackup ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                <div>
                  <p className="font-semibold text-slate-900 text-sm">
                    Maintenance Mode
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Scheduled maintenance alerts
                  </p>
                </div>
                <button
                  onClick={handleToggleMaintenanceMode}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 shadow-sm ${
                    maintenanceMode ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                      maintenanceMode ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
