"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { MOCK_FEEDBACK } from "@/lib/data";
import {
  Wrench,
  Bug,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  MessageSquare,
  User,
  Calendar,
  XCircle,
  RefreshCw,
  Database,
  Activity,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function SupportTroubleshootingPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthorized =
    user?.role === "dpd_admin" || user?.role === "emis_admin";

  const [issues, setIssues] = useState(
    MOCK_FEEDBACK.filter(
      (f) => f.category === "bug" || f.category === "login-problem"
    )
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState("");

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to support & troubleshooting. Only DPD
                Admin and EMIS administrators can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: issues.length,
    new: issues.filter((i) => i.status === "new").length,
    inReview: issues.filter((i) => i.status === "in-review").length,
    resolved: issues.filter((i) => i.status === "resolved").length,
    highPriority: issues.filter((i) => i.priority === "high").length,
  };

  const handleResolve = (issueId: string) => {
    setIssues(
      issues.map((i) =>
        i.id === issueId ? { ...i, status: "resolved" as const } : i
      )
    );
    toast({
      title: "Issue resolved",
      description: "The issue has been marked as resolved.",
    });
    setSelectedIssue(null);
    setResolutionNote("");
  };

  const handleStatusChange = (
    issueId: string,
    newStatus: "new" | "in-review" | "resolved"
  ) => {
    setIssues(
      issues.map((i) => (i.id === issueId ? { ...i, status: newStatus } : i))
    );
    toast({
      title: "Status updated",
      description: `Issue status changed to ${newStatus.replace("-", " ")}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge className="rounded-full bg-blue-100 text-blue-600">New</Badge>
        );
      case "in-review":
        return (
          <Badge className="rounded-full bg-amber-100 text-amber-600">
            In Review
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="rounded-full bg-emerald-100 text-emerald-600">
            Resolved
          </Badge>
        );
      default:
        return (
          <Badge className="rounded-full bg-slate-100 text-slate-600">
            {status}
          </Badge>
        );
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return (
          <Badge className="rounded-full bg-red-100 text-red-600">High</Badge>
        );
      case "medium":
        return (
          <Badge className="rounded-full bg-orange-100 text-orange-600">
            Medium
          </Badge>
        );
      case "low":
        return (
          <Badge className="rounded-full bg-blue-100 text-blue-600">Low</Badge>
        );
      default:
        return (
          <Badge className="rounded-full bg-slate-100 text-slate-600">
            {priority}
          </Badge>
        );
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Support & Troubleshooting
              </h1>
              <p className="text-sm opacity-90">
                Provide technical support, track bug resolution, and offer
                system debugging
              </p>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-5">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Issues</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Bug className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">New Issues</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.new}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">In Review</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.inReview}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <RefreshCw className="h-6 w-6 text-amber-600" />
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
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">High Priority</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.highPriority}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search issues by description or user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in-review">In Review</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Issues List */}
        <div className="grid gap-6 lg:grid-cols-[1fr,0.6fr]">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Technical Issues & Bugs
              </CardTitle>
              <p className="text-sm text-slate-500">
                Track and resolve system issues and bugs
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredIssues.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No issues found
                  </div>
                ) : (
                  filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className={`rounded-2xl border p-6 cursor-pointer transition-all ${
                        selectedIssue === issue.id
                          ? "border-indigo-300 bg-indigo-50/50 shadow-md"
                          : "border-slate-200 bg-slate-50/50 hover:border-indigo-200 hover:shadow-sm"
                      }`}
                      onClick={() =>
                        setSelectedIssue(
                          selectedIssue === issue.id ? null : issue.id
                        )
                      }
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getStatusBadge(issue.status)}
                            {getPriorityBadge(issue.priority)}
                            <Badge className="rounded-full bg-slate-100 text-slate-600 capitalize">
                              {issue.category.replace("-", " ")}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-700 mb-3">
                            {issue.message}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {issue.userName}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {issue.createdDate}
                            </span>
                            <span className="capitalize">
                              {issue.userRole.replace("_", " ")}
                            </span>
                          </div>
                        </div>
                      </div>
                      {selectedIssue === issue.id && (
                        <div className="pt-4 border-t border-slate-200 space-y-3">
                          <div>
                            <label className="text-xs font-semibold text-slate-700 mb-2 block">
                              Resolution Notes
                            </label>
                            <Textarea
                              value={resolutionNote}
                              onChange={(e) =>
                                setResolutionNote(e.target.value)
                              }
                              placeholder="Add notes about the resolution..."
                              rows={3}
                              className="w-full rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              onClick={() => handleResolve(issue.id)}
                              className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                              Mark Resolved
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() =>
                                handleStatusChange(issue.id, "in-review")
                              }
                              className="gap-2 rounded-xl"
                            >
                              <RefreshCw className="h-4 w-4" />
                              Mark In Review
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions & System Debugging */}
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                  <RefreshCw className="h-4 w-4" />
                  Run System Diagnostics
                </Button>
                <Button variant="outline" className="w-full gap-2 rounded-xl">
                  <Database className="h-4 w-4" />
                  Check Database Health
                </Button>
                <Button variant="outline" className="w-full gap-2 rounded-xl">
                  <Activity className="h-4 w-4" />
                  View System Logs
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  System Status
                </p>
                <CardTitle className="text-xl">Platform Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-indigo-100">
                {[
                  {
                    label: "LMS Status",
                    status: "Operational",
                    color: "text-emerald-400",
                  },
                  {
                    label: "Android App",
                    status: "Deployed",
                    color: "text-emerald-400",
                  },
                  {
                    label: "API Services",
                    status: "Running",
                    color: "text-emerald-400",
                  },
                  {
                    label: "Database",
                    status: "Connected",
                    color: "text-emerald-400",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl bg-white/10 p-3"
                  >
                    <span>{item.label}</span>
                    <span className={item.color}>{item.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
