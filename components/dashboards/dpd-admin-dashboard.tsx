"use client";

import type { User } from "@/lib/auth";
import { DEMO_USERS } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TRAINING_MODULES, MOCK_FEEDBACK, DISTRICTS } from "@/lib/data";
import {
  Users,
  BookOpen,
  TrendingUp,
  Layers,
  CheckCircle2,
  BarChart3,
  Filter,
  ArrowUpRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { useState } from "react";

export function DPDAdminDashboard({ user }: { user: User }) {
  const usersByRole = {
    trainees: DEMO_USERS.filter((u) => u.role === "trainee").length,
    trainers: DEMO_USERS.filter((u) => u.role === "trainer").length,
    dpdRpdc: DEMO_USERS.filter((u) => u.role === "dpd_rpdc").length,
    dpdAdmin: DEMO_USERS.filter((u) => u.role === "dpd_admin").length,
    emisAdmin: DEMO_USERS.filter((u) => u.role === "emis_admin").length,
  };

  const activeUsers = 342;
  const totalModules = TRAINING_MODULES.length;
  const portalUptime = 99.2;

  const roleDistribution = [
    { name: "Trainees", value: usersByRole.trainees, color: "#6366f1" },
    { name: "Trainers", value: usersByRole.trainers, color: "#10b981" },
    { name: "DPD/RPDC", value: usersByRole.dpdRpdc, color: "#f59e0b" },
    { name: "DPD Admin", value: usersByRole.dpdAdmin, color: "#8b5cf6" },
    { name: "EMIS Admin", value: usersByRole.emisAdmin, color: "#64748b" },
  ];

  const totalCourses = TRAINING_MODULES.length;
  const approvedModules = TRAINING_MODULES.filter(
    (m) => m.reviewStatus === "approved"
  ).length;
  const trainerCount = usersByRole.trainers;
  const traineeCount = usersByRole.trainees;
  const pendingApprovals = TRAINING_MODULES.filter(
    (m) => m.reviewStatus === "pending" || m.reviewStatus === "needs-revision"
  );
  const recentFeedback = MOCK_FEEDBACK.slice(0, 4);
  const topModules = [...TRAINING_MODULES]
    .sort((a, b) => (b.completedBy?.length || 0) - (a.completedBy?.length || 0))
    .slice(0, 4);
  const categories = ["All Programs", "CPD", "TIP", "ECE"];
  const [categoryFilter, setCategoryFilter] = useState<string>(categories[0]);
  const districtData = DISTRICTS.map((district) => ({
    name: district.name,
    completion: district.completionPercentage,
    trainees: district.traineesEnrolled,
  }));

  return (
    <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
      <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">
              System Management & LMS Oversight
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome, {user.name}
            </h1>
            <p className="text-sm opacity-85">
              Oversee LMS deployment, manage users, and ensure smooth system
              operations.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">Portal Status</p>
              <p className="text-2xl font-semibold">Online</p>
            </div>
            <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">Active Users</p>
              <p className="text-2xl font-semibold">{activeUsers}</p>
            </div>
            <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">Uptime</p>
              <p className="text-2xl font-semibold">{portalUptime}%</p>
            </div>
          </div>
        </div>
      </header>
      {/* KPI Cards */}
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Courses",
            value: totalCourses,
            icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
            helper: "Published across phases",
          },
          {
            label: "Approved Modules",
            value: approvedModules,
            icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
            helper: "Ready for deployment",
          },
          {
            label: "Active Trainers",
            value: trainerCount,
            icon: <Users className="h-5 w-5 text-amber-500" />,
            helper: "Verified facilitators",
          },
          {
            label: "Trainees Enrolled",
            value: traineeCount,
            icon: <Layers className="h-5 w-5 text-purple-500" />,
            helper: "Across districts",
          },
        ].map((stat) => (
          <Card
            key={stat.label}
            className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase text-slate-400">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-semibold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500">{stat.helper}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      {/* Content approval spotlight */}
      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-slate-900">
              Content approval queue
            </CardTitle>
            <p className="text-sm text-slate-500">
              {pendingApprovals.length} modules need DPD sign-off right now
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl bg-slate-100 px-4 py-2 text-center">
              <p className="text-xs uppercase text-slate-500">Pending</p>
              <p className="text-xl font-semibold text-slate-900">
                {
                  pendingApprovals.filter((m) => m.reviewStatus === "pending")
                    .length
                }
              </p>
            </div>
            <div className="rounded-2xl bg-amber-50 px-4 py-2 text-center">
              <p className="text-xs uppercase text-amber-600">Needs revision</p>
              <p className="text-xl font-semibold text-amber-600">
                {
                  pendingApprovals.filter(
                    (m) => m.reviewStatus === "needs-revision"
                  ).length
                }
              </p>
            </div>
            <Link href="/content-review">
              <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700 text-sm">
                Open content approval
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          {pendingApprovals.slice(0, 3).map((module) => (
            <div
              key={module.id}
              className="rounded-2xl border border-slate-100 p-4 bg-slate-50/80"
            >
              <p className="text-xs uppercase text-slate-400">Module</p>
              <p className="font-semibold text-slate-900">{module.title}</p>
              <p className="text-xs text-slate-500 mb-3">
                {module.phase.replace("-", " ").toUpperCase()}
              </p>
              <Badge
                className={
                  module.reviewStatus === "needs-revision"
                    ? "rounded-full bg-orange-100 text-orange-600"
                    : "rounded-full bg-amber-100 text-amber-600"
                }
              >
                {module.reviewStatus?.replace("-", " ")}
              </Badge>
            </div>
          ))}
          {pendingApprovals.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-slate-500">
              All caught up! Nothing needs approval.
            </div>
          )}
        </CardContent>
      </Card>
      {/* Analytics Overview */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle className="text-xl text-slate-900">
                District progress snapshot
              </CardTitle>
              <p className="text-sm text-slate-500">
                Filter analytics by program focus
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-slate-400" />
              <select
                className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={districtData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip />
                <Bar
                  dataKey="completion"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  name="Completion %"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Top used modules
            </CardTitle>
            <p className="text-sm text-slate-500">
              Based on completions and recurring delivery
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {topModules.map((module) => {
              const usage =
                module.completedBy?.length ||
                Math.floor(Math.random() * 30) + 15;
              return (
                <div
                  key={module.id}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {module.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {module.phase.replace("-", " ").toUpperCase()}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-indigo-600">
                      {usage} runs
                    </span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{ width: `${Math.min(usage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </section>
      w {/* Content approval & feedback */}
      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Content approval
              </CardTitle>
              <p className="text-sm text-slate-500">
                Track courses/videos needing action
              </p>
            </div>
            <div className="flex gap-2">
              <select className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <option>All statuses</option>
                <option>Pending</option>
                <option>Needs revision</option>
                <option>Approved</option>
              </select>
              <select className="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600">
                <option>All categories</option>
                <option>CPD</option>
                <option>TIP</option>
                <option>ECE</option>
              </select>
              <Link href="/content-review">
                <Button variant="outline" className="rounded-full text-xs">
                  Manage
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-2xl bg-slate-50/80 border border-slate-100 p-4 text-sm text-slate-600 grid grid-cols-4">
              <div>
                <p className="text-xs uppercase text-slate-400">Module title</p>
                <p className="font-semibold text-slate-900">
                  STEM Explorers (Phase 2)
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Created by</p>
                <p>Areesha Parvez</p>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-400">Status</p>
                <Badge className="rounded-full bg-amber-100 text-amber-600">
                  Pending
                </Badge>
              </div>
              <div className="flex items-center justify-end gap-2 text-xs">
                <Button variant="outline" className="rounded-full text-xs">
                  Details
                </Button>
                <Button className="rounded-full text-xs">Approve</Button>
              </div>
            </div>
            {pendingApprovals.slice(0, 3).map((module) => (
              <div
                key={module.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600 grid grid-cols-4"
              >
                <div>
                  <p className="text-xs uppercase text-slate-400">
                    Module title
                  </p>
                  <p className="font-semibold text-slate-900">{module.title}</p>
                  <p className="text-xs text-slate-500">
                    {module.phase.replace("-", " ").toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Category</p>
                  <p>CPD</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Status</p>
                  <Badge
                    className={
                      module.reviewStatus === "needs-revision"
                        ? "rounded-full bg-orange-100 text-orange-600"
                        : "rounded-full bg-amber-100 text-amber-600"
                    }
                  >
                    {module.reviewStatus?.replace("-", " ")}
                  </Badge>
                </div>
                <div className="flex items-center justify-end gap-2 text-xs">
                  <Button variant="outline" className="rounded-full text-xs">
                    View
                  </Button>
                  <Button className="rounded-full text-xs">Publish</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Recent feedback
              </CardTitle>
              <p className="text-sm text-slate-500">
                Latest reports from field trainings
              </p>
            </div>
            <Link href="/feedback-reports">
              <Button variant="outline" className="rounded-full text-sm">
                View all
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">
                      {feedback.userName}
                    </p>
                    <p className="text-xs text-slate-500 capitalize">
                      {feedback.userRole}
                    </p>
                  </div>
                  <Badge className="rounded-full bg-indigo-100 text-indigo-600 capitalize">
                    {feedback.category.replace("-", " ")}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                  {feedback.message}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
      {/* Action Center */}
      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">
            DPD Action Center
          </CardTitle>
          <p className="text-sm text-slate-500">
            Quick links to common oversight tasks
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <Link href="/content-review">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-indigo-300 hover:bg-white transition cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 mb-3">
                <CheckCircle2 className="h-5 w-5 text-indigo-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Pending approvals
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Jump to the approval workflow
              </p>
              <span className="text-sm font-semibold text-indigo-600 inline-flex items-center gap-1">
                Review items <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <Link href="/analytics">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 mb-3">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Filter analytics
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Slice by CPD, TIP, or ECE
              </p>
              <span className="text-sm font-semibold text-emerald-600 inline-flex items-center gap-1">
                Open analytics <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>

          <Link href="/reports">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-amber-300 hover:bg-white transition cursor-pointer">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 mb-3">
                <Filter className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                Drill into districts
              </h3>
              <p className="text-xs text-slate-500 mb-3">
                Open detailed district analytics
              </p>
              <span className="text-sm font-semibold text-amber-600 inline-flex items-center gap-1">
                View reports <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
