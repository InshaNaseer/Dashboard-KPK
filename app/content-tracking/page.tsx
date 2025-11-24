"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { TRAINING_MODULES } from "@/lib/data";
import {
  TrendingUp,
  FileCheck,
  Upload,
  AlertCircle,
  CheckCircle2,
  Clock,
  Edit,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ContentTrackingPage() {
  const { user } = useAuth();
  const isAuthorized = user?.role === "dpd_rpdc" || user?.role === "dpd_admin";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to content tracking. Only DPD/RPDC staff
                and the DPD Admin can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredModules = TRAINING_MODULES.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      module.reviewStatus === filterStatus ||
      (!module.reviewStatus && filterStatus === "draft");
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: TRAINING_MODULES.length,
    approved: TRAINING_MODULES.filter((m) => m.reviewStatus === "approved")
      .length,
    pending: TRAINING_MODULES.filter((m) => m.reviewStatus === "pending")
      .length,
    needsRevision: TRAINING_MODULES.filter(
      (m) => m.reviewStatus === "needs-revision"
    ).length,
    draft: TRAINING_MODULES.filter(
      (m) => m.reviewStatus === "draft" || !m.reviewStatus
    ).length,
    aligned: TRAINING_MODULES.filter((m) => m.curriculumAlignment === "aligned")
      .length,
    itResources: TRAINING_MODULES.filter((m) => m.itResourcesAvailable === true)
      .length,
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="rounded-full bg-emerald-100 text-emerald-600">
            Approved
          </Badge>
        );
      case "pending":
        return (
          <Badge className="rounded-full bg-amber-100 text-amber-600">
            Pending
          </Badge>
        );
      case "needs-revision":
        return (
          <Badge className="rounded-full bg-orange-100 text-orange-600">
            Needs Revision
          </Badge>
        );
      case "draft":
        return (
          <Badge className="rounded-full bg-blue-100 text-blue-600">
            Draft
          </Badge>
        );
      default:
        return (
          <Badge className="rounded-full bg-slate-100 text-slate-600">
            Draft
          </Badge>
        );
    }
  };

  const getAlignmentBadge = (alignment?: string) => {
    switch (alignment) {
      case "aligned":
        return (
          <Badge className="rounded-full bg-emerald-100 text-emerald-600">
            Aligned
          </Badge>
        );
      case "needs-review":
        return (
          <Badge className="rounded-full bg-amber-100 text-amber-600">
            Needs Review
          </Badge>
        );
      case "not-aligned":
        return (
          <Badge className="rounded-full bg-red-100 text-red-600">
            Not Aligned
          </Badge>
        );
      default:
        return (
          <Badge className="rounded-full bg-slate-100 text-slate-600">
            Not Reviewed
          </Badge>
        );
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Content Tracking
              </h1>
              <p className="text-sm opacity-90">
                Track content uploads, updates, and review status across all
                training materials
              </p>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Modules</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <FileCheck className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Approved</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.approved}
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
                  <p className="text-sm text-slate-500 mb-1">Pending Review</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.pending}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">SNC Aligned</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.aligned}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <FileCheck className="h-6 w-6 text-purple-600" />
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
                  placeholder="Search modules by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-slate-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="needs-revision">Needs Revision</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content List */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              All Training Modules
            </CardTitle>
            <p className="text-sm text-slate-500">
              Track content status, curriculum alignment, and IT resources
              availability
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredModules.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No modules found matching your criteria
                </div>
              ) : (
                filteredModules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-slate-900 text-lg">
                            {module.title}
                          </h3>
                          {getStatusBadge(module.reviewStatus)}
                          {getAlignmentBadge(module.curriculumAlignment)}
                        </div>
                        <p className="text-sm text-slate-600 mb-3">
                          {module.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {module.duration}
                          </span>
                          <span className="capitalize">
                            {module.type.replace("-", " ")}
                          </span>
                          <span className="capitalize">
                            {module.phase.replace("-", " ")}
                          </span>
                          {module.itResourcesAvailable !== undefined && (
                            <span
                              className={`flex items-center gap-1 ${
                                module.itResourcesAvailable
                                  ? "text-emerald-600"
                                  : "text-red-600"
                              }`}
                            >
                              {module.itResourcesAvailable ? (
                                <CheckCircle2 className="h-4 w-4" />
                              ) : (
                                <AlertCircle className="h-4 w-4" />
                              )}
                              IT Resources:{" "}
                              {module.itResourcesAvailable
                                ? "Available"
                                : "Not Available"}
                            </span>
                          )}
                          {module.lastUpdated && (
                            <span>Updated: {module.lastUpdated}</span>
                          )}
                          {module.reviewedBy && (
                            <span>Reviewed by: {module.reviewedBy}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                      <Link href={`/training-library/${module.id}`}>
                        <Button variant="outline" className="gap-2 rounded-xl">
                          View Module
                        </Button>
                      </Link>
                      {(user?.role === "dpd_rpdc" ||
                        user?.role === "emis_admin") && (
                        <Link href={`/content-management?edit=${module.id}`}>
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                          >
                            <Edit className="h-4 w-4" />
                            Edit Content
                          </Button>
                        </Link>
                      )}
                      {user?.role === "dpd_rpdc" && (
                        <Link href="/content-review">
                          <Button className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                            <FileCheck className="h-4 w-4" />
                            Review
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
