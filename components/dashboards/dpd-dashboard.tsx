"use client";

import type { User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { DISTRICTS, TRAINING_MODULES, CONTENT_REVIEWS } from "@/lib/data";
import {
  Users,
  BookOpen,
  TrendingUp,
  MapPin,
  FileCheck,
  Upload,
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { AuthorityAccessCard } from "@/components/dashboards/authority-access-card";

export function DPDDashboard({ user }: { user: User }) {
  const totalTrainees = DISTRICTS.reduce(
    (sum, d) => sum + d.traineesEnrolled,
    0
  );
  const avgCompletion = Math.round(
    DISTRICTS.reduce((sum, d) => sum + d.completionPercentage, 0) /
      DISTRICTS.length
  );

  const chartData = DISTRICTS.map((d) => ({
    name: d.name,
    completion: d.completionPercentage,
    trainees: d.traineesEnrolled,
  }));

  // Content Development & Finalization Stats
  const pendingReviews = CONTENT_REVIEWS.filter(
    (r) => r.status === "pending"
  ).length;
  const needsRevision = CONTENT_REVIEWS.filter(
    (r) => r.status === "needs-revision"
  ).length;
  const approvedContent = TRAINING_MODULES.filter(
    (m) => m.reviewStatus === "approved"
  ).length;
  const draftContent = TRAINING_MODULES.filter(
    (m) => m.reviewStatus === "draft"
  ).length;
  const alignedContent = TRAINING_MODULES.filter(
    (m) => m.curriculumAlignment === "aligned"
  ).length;
  const itResourcesAvailable = TRAINING_MODULES.filter(
    (m) => m.itResourcesAvailable === true
  ).length;

  return (
    <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
      <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">
              Content Development & Finalization
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome, {user.name}
            </h1>
            <p className="text-sm opacity-85">
              Manage content development, review training materials, and ensure
              curriculum alignment.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">Pending Reviews</p>
              <p className="text-2xl font-semibold">{pendingReviews}</p>
            </div>
            <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">
                Approved Content
              </p>
              <p className="text-2xl font-semibold">{approvedContent}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content Development & Finalization Section */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">
              Content Development Dashboard
            </CardTitle>
            <p className="text-sm text-slate-500">
              Track content uploads, reviews, and curriculum alignment status.
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Pending Reviews",
                value: pendingReviews,
                helper: "Awaiting approval",
                icon: <Clock className="h-5 w-5 text-amber-500" />,
              },
              {
                label: "Needs Revision",
                value: needsRevision,
                helper: "Requires updates",
                icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
              },
              {
                label: "Approved Content",
                value: approvedContent,
                helper: "Ready for use",
                icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
              },
              {
                label: "Draft Content",
                value: draftContent,
                helper: "In development",
                icon: <Edit className="h-5 w-5 text-blue-500" />,
              },
              {
                label: "Curriculum Aligned",
                value: alignedContent,
                helper: "SNC compliant",
                icon: <FileCheck className="h-5 w-5 text-indigo-500" />,
              },
              {
                label: "IT Resources",
                value: itResourcesAvailable,
                helper: "Assets available",
                icon: <Upload className="h-5 w-5 text-purple-500" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-500 shadow-sm shadow-indigo-50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </p>
                  {stat.icon}
                </div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs">{stat.helper}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
          <CardHeader className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-indigo-200">
              Quick Actions
            </p>
            <CardTitle className="text-2xl">Content Management</CardTitle>
            <p className="text-sm text-indigo-100">
              Access content review, upload, and tracking tools.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/content-review">
              <Button className="w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                <FileCheck className="h-4 w-4" />
                Review Content
              </Button>
            </Link>
            <Link href="/content-management">
              <Button
                variant="outline"
                className="w-full gap-2 rounded-xl border-indigo-400/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Upload className="h-4 w-4" />
                Manage Content
              </Button>
            </Link>
            <Link href="/content-tracking">
              <Button
                variant="outline"
                className="w-full gap-2 rounded-xl border-indigo-400/30 bg-white/10 text-white hover:bg-white/20"
              >
                <TrendingUp className="h-4 w-4" />
                Track Content
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Content Review Status */}
      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-slate-900">
                Content Review Status
              </CardTitle>
              <p className="text-sm text-slate-500">
                Monitor pending reviews and content requiring attention.
              </p>
            </div>
            <Link href="/content-review">
              <Button className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                <FileCheck className="h-4 w-4" />
                View All Reviews
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {CONTENT_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-slate-900">
                        {review.moduleTitle}
                      </h4>
                      <Badge
                        className={
                          review.status === "approved"
                            ? "rounded-full bg-emerald-100 text-emerald-600"
                            : review.status === "needs-revision"
                            ? "rounded-full bg-orange-100 text-orange-600"
                            : "rounded-full bg-amber-100 text-amber-600"
                        }
                      >
                        {review.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">
                      {review.feedback}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>Type: {review.reviewType}</span>
                      <span>•</span>
                      <span>
                        Alignment:{" "}
                        {review.curriculumAlignment.replace("-", " ")}
                      </span>
                      <span>•</span>
                      <span>Date: {review.createdDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* District Operations Section */}
      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">
              Oversight KPIs
            </CardTitle>
            <p className="text-sm text-slate-500">
              Live snapshot across trainees, trainers, and content.
            </p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-3">
            {[
              {
                label: "Total trainees",
                value: totalTrainees,
                helper: "Across 4 districts",
                icon: <Users className="h-5 w-5 text-indigo-500" />,
              },
              {
                label: "Active trainers",
                value: 12,
                helper: "District mentors",
                icon: <MapPin className="h-5 w-5 text-amber-500" />,
              },
              {
                label: "Modules published",
                value: TRAINING_MODULES.length,
                helper: "All phases",
                icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-500 shadow-sm shadow-indigo-50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {stat.label}
                  </p>
                  {stat.icon}
                </div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-xs">{stat.helper}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
          <CardHeader className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-indigo-200">
              Alerts
            </p>
            <CardTitle className="text-2xl">District focus</CardTitle>
            <p className="text-sm text-indigo-100">
              Automated checks show two districts trending below target.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-indigo-100">
            {DISTRICTS.filter((d) => d.status !== "completed").map(
              (district) => (
                <div key={district.id} className="rounded-2xl bg-white/10 p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-white">{district.name}</p>
                    <Badge className="rounded-full bg-indigo-50/30 text-white">
                      {district.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-xs text-indigo-200">
                    Completion {district.completionPercentage}% ·{" "}
                    {district.traineesEnrolled} trainees
                  </p>
                </div>
              )
            )}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-blue-100">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">
            Pilot districts overview
          </CardTitle>
          <p className="text-sm text-slate-500">
            Progress bars update daily from EMIS sync.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {DISTRICTS.map((district) => (
              <div
                key={district.id}
                className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm shadow-indigo-50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-slate-900">
                    {district.name}
                  </p>
                  <Badge
                    className={
                      district.status === "completed"
                        ? "rounded-full bg-emerald-100 text-emerald-600"
                        : district.status === "in-progress"
                        ? "rounded-full bg-amber-100 text-amber-600"
                        : "rounded-full bg-slate-200 text-slate-600"
                    }
                  >
                    {district.status.replace("-", " ")}
                  </Badge>
                </div>
                <div className="mt-3 space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Completion</span>
                      <span>{district.completionPercentage}%</span>
                    </div>
                    <Progress
                      value={district.completionPercentage}
                      className="h-2 bg-indigo-100"
                    />
                  </div>
                  <p className="text-xs text-slate-500">
                    {district.traineesEnrolled} trainees enrolled
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AuthorityAccessCard />

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              District-wise completion & enrollment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "12px",
                    color: "var(--color-foreground)",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="completion"
                  fill="var(--color-primary)"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="trainees"
                  fill="var(--color-accent)"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              District statistics
            </CardTitle>
            <p className="text-sm text-slate-500">
              Summary table for quick export.
            </p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            {DISTRICTS.map((district) => (
              <div
                key={district.id}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">
                    {district.name}
                  </p>
                  <span className="text-xs text-slate-500">
                    {district.traineesEnrolled} trainees
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="h-2 flex-1 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                      style={{ width: `${district.completionPercentage}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {district.completionPercentage}%
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
