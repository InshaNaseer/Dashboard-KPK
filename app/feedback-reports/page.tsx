"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { MOCK_FEEDBACK } from "@/lib/data";
import {
  FileText,
  Download,
  Calendar,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Filter,
  Search,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function FeedbackReportsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthorized =
    user?.role === "dpd_admin" || user?.role === "emis_admin";

  const [dateRange, setDateRange] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to feedback reports. Only DPD Admin and
                EMIS administrators can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredFeedback = MOCK_FEEDBACK.filter((f) => {
    const matchesCategory =
      categoryFilter === "all" || f.category === categoryFilter;
    return matchesCategory;
  });

  const feedbackByCategory = [
    {
      name: "Bug Reports",
      value: MOCK_FEEDBACK.filter((f) => f.category === "bug").length,
      color: "#ef4444",
    },
    {
      name: "Suggestions",
      value: MOCK_FEEDBACK.filter((f) => f.category === "suggestion").length,
      color: "#3b82f6",
    },
    {
      name: "Content Issues",
      value: MOCK_FEEDBACK.filter((f) => f.category === "content-issue").length,
      color: "#f59e0b",
    },
    {
      name: "Platform Usability",
      value: MOCK_FEEDBACK.filter((f) => f.category === "platform-usability")
        .length,
      color: "#8b5cf6",
    },
    {
      name: "Content Effectiveness",
      value: MOCK_FEEDBACK.filter((f) => f.category === "content-effectiveness")
        .length,
      color: "#10b981",
    },
  ];

  const feedbackByStatus = [
    {
      name: "New",
      value: MOCK_FEEDBACK.filter((f) => f.status === "new").length,
      color: "#3b82f6",
    },
    {
      name: "In Review",
      value: MOCK_FEEDBACK.filter((f) => f.status === "in-review").length,
      color: "#f59e0b",
    },
    {
      name: "Resolved",
      value: MOCK_FEEDBACK.filter((f) => f.status === "resolved").length,
      color: "#10b981",
    },
  ];

  const feedbackByPriority = [
    {
      name: "High",
      value: MOCK_FEEDBACK.filter((f) => f.priority === "high").length,
      color: "#ef4444",
    },
    {
      name: "Medium",
      value: MOCK_FEEDBACK.filter((f) => f.priority === "medium").length,
      color: "#f59e0b",
    },
    {
      name: "Low",
      value: MOCK_FEEDBACK.filter((f) => f.priority === "low").length,
      color: "#3b82f6",
    },
  ];

  const stats = {
    total: MOCK_FEEDBACK.length,
    resolved: MOCK_FEEDBACK.filter((f) => f.status === "resolved").length,
    pending: MOCK_FEEDBACK.filter((f) => f.status !== "resolved").length,
    avgResponseTime: "2.5 days",
  };

  const handleGenerateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report has been generated and is ready for download.`,
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Feedback Reports
                </h1>
                <p className="text-sm opacity-90">
                  Generate periodic reports based on user feedback and platform
                  performance
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-white/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Export All
            </Button>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Feedback</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <MessageSquare className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Resolved</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.resolved}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Pending</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.pending}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Avg Response</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.avgResponseTime}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Generation */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Generate Reports
            </CardTitle>
            <p className="text-sm text-slate-500">
              Create periodic reports for different time periods and categories
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Daily Report
                    </h3>
                    <p className="text-xs text-slate-500">Last 24 hours</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleGenerateReport("Daily")}
                  variant="outline"
                  className="w-full gap-2 rounded-xl text-sm"
                >
                  <Download className="h-4 w-4" />
                  Generate
                </Button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Weekly Report
                    </h3>
                    <p className="text-xs text-slate-500">Last 7 days</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleGenerateReport("Weekly")}
                  variant="outline"
                  className="w-full gap-2 rounded-xl text-sm"
                >
                  <Download className="h-4 w-4" />
                  Generate
                </Button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Monthly Report
                    </h3>
                    <p className="text-xs text-slate-500">Last 30 days</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleGenerateReport("Monthly")}
                  variant="outline"
                  className="w-full gap-2 rounded-xl text-sm"
                >
                  <Download className="h-4 w-4" />
                  Generate
                </Button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                    <FileText className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">
                      Custom Report
                    </h3>
                    <p className="text-xs text-slate-500">Select date range</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleGenerateReport("Custom")}
                  variant="outline"
                  className="w-full gap-2 rounded-xl text-sm"
                >
                  <Download className="h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">
                Feedback by Category
              </CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of feedback types
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={feedbackByCategory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#64748b"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">
                Feedback by Status
              </CardTitle>
              <p className="text-sm text-slate-500">
                Current status distribution
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={feedbackByStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {feedbackByStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        {/* Feedback Summary */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-semibold text-slate-900">
                  Feedback Summary
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Detailed breakdown of all user feedback
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-slate-400" />
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Categories</option>
                  <option value="bug">Bug Reports</option>
                  <option value="suggestion">Suggestions</option>
                  <option value="content-issue">Content Issues</option>
                  <option value="platform-usability">Platform Usability</option>
                  <option value="content-effectiveness">
                    Content Effectiveness
                  </option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="rounded-full bg-slate-100 text-slate-600 capitalize">
                          {feedback.category.replace("-", " ")}
                        </Badge>
                        <Badge
                          className={
                            feedback.priority === "high"
                              ? "rounded-full bg-red-100 text-red-600"
                              : feedback.priority === "medium"
                              ? "rounded-full bg-orange-100 text-orange-600"
                              : "rounded-full bg-blue-100 text-blue-600"
                          }
                        >
                          {feedback.priority} priority
                        </Badge>
                        <Badge
                          className={
                            feedback.status === "resolved"
                              ? "rounded-full bg-emerald-100 text-emerald-600"
                              : feedback.status === "in-review"
                              ? "rounded-full bg-amber-100 text-amber-600"
                              : "rounded-full bg-blue-100 text-blue-600"
                          }
                        >
                          {feedback.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">
                        {feedback.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>{feedback.userName}</span>
                        <span>•</span>
                        <span className="capitalize">
                          {feedback.userRole.replace("_", " ")}
                        </span>
                        <span>•</span>
                        <span>{feedback.createdDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
