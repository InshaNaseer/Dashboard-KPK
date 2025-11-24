"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/components/auth-context";
import { TRAINEE_PROGRESS_DATA, TRAINING_MODULES } from "@/lib/data";
import {
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  BarChart3,
  Search,
  Download,
  Mail,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function TraineeProgressPage() {
  const { user } = useAuth();
  const isAuthorized =
    user?.role === "trainer" ||
    user?.role === "dpd_rpdc" ||
    user?.role === "dpd_admin";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrainee, setSelectedTrainee] = useState<string | null>(null);

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to trainee progress tracking. Only
                trainers, DPD/RPDC staff, and the DPD Admin can access this
                section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredTrainees = TRAINEE_PROGRESS_DATA.filter(
    (trainee) =>
      trainee.traineeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trainee.traineeEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedTraineeData = selectedTrainee
    ? TRAINEE_PROGRESS_DATA.find((t) => t.traineeId === selectedTrainee)
    : null;

  const stats = {
    total: TRAINEE_PROGRESS_DATA.length,
    active: TRAINEE_PROGRESS_DATA.filter((t) => {
      const daysSinceActivity = Math.floor(
        (new Date().getTime() - new Date(t.lastActivity).getTime()) /
          (1000 * 60 * 60 * 24)
      );
      return daysSinceActivity <= 7;
    }).length,
    avgCompletion: Math.round(
      TRAINEE_PROGRESS_DATA.reduce(
        (sum, t) => sum + t.completionPercentage,
        0
      ) / TRAINEE_PROGRESS_DATA.length
    ),
    avgScore: Math.round(
      TRAINEE_PROGRESS_DATA.filter((t) => t.averageScore).reduce(
        (sum, t) => sum + (t.averageScore || 0),
        0
      ) / TRAINEE_PROGRESS_DATA.filter((t) => t.averageScore).length
    ),
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Trainee Progress Tracking
                </h1>
                <p className="text-sm opacity-90">
                  Track trainees' progress and performance via LMS reporting
                  tools
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-white/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Trainees</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Active Trainees</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.active}
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
                  <p className="text-sm text-slate-500 mb-1">Avg Completion</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.avgCompletion}%
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Average Score</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.avgScore}%
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search trainees by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1fr,0.6fr]">
          {/* Trainee List */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                All Trainees
              </CardTitle>
              <p className="text-sm text-slate-500">
                View progress and performance metrics for each trainee
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTrainees.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    No trainees found
                  </div>
                ) : (
                  filteredTrainees.map((trainee) => (
                    <div
                      key={trainee.traineeId}
                      className={`rounded-2xl border p-6 cursor-pointer transition-all ${
                        selectedTrainee === trainee.traineeId
                          ? "border-indigo-300 bg-indigo-50/50 shadow-md"
                          : "border-slate-200 bg-slate-50/50 hover:border-indigo-200 hover:shadow-sm"
                      }`}
                      onClick={() =>
                        setSelectedTrainee(
                          selectedTrainee === trainee.traineeId
                            ? null
                            : trainee.traineeId
                        )
                      }
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-lg mb-1">
                            {trainee.traineeName}
                          </h3>
                          <p className="text-sm text-slate-500 mb-3">
                            {trainee.traineeEmail}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                              {trainee.completedModules.length} completed
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-blue-600" />
                              {trainee.totalTimeSpent}
                            </span>
                            {trainee.averageScore && (
                              <span className="flex items-center gap-1">
                                <BarChart3 className="h-4 w-4 text-purple-600" />
                                Score: {trainee.averageScore}%
                              </span>
                            )}
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-slate-500">
                              <span>Overall Progress</span>
                              <span className="font-semibold text-slate-700">
                                {trainee.completionPercentage}%
                              </span>
                            </div>
                            <Progress
                              value={trainee.completionPercentage}
                              className="h-2 bg-indigo-100"
                            />
                          </div>
                          <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                            <span>Phase 1: {trainee.phase1Progress}%</span>
                            <span>Phase 2: {trainee.phase2Progress}%</span>
                            <span>Last active: {trainee.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Trainee Details */}
          {selectedTraineeData && (
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Trainee Details
                </CardTitle>
                <p className="text-sm text-slate-500">
                  {selectedTraineeData.traineeName}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-900">
                      Enrolled Modules
                    </p>
                    <Badge className="rounded-full bg-indigo-100 text-indigo-600">
                      {selectedTraineeData.enrolledModules.length}
                    </Badge>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedTraineeData.enrolledModules.map((moduleId) => {
                      const module = TRAINING_MODULES.find(
                        (m) => m.id === moduleId
                      );
                      const isCompleted =
                        selectedTraineeData.completedModules.includes(moduleId);
                      const isInProgress =
                        selectedTraineeData.inProgressModules.includes(
                          moduleId
                        );
                      if (!module) return null;
                      return (
                        <div
                          key={moduleId}
                          className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">
                              {module.title}
                            </p>
                            <p className="text-xs text-slate-500">
                              {module.phase.replace("-", " ")} •{" "}
                              {module.duration}
                            </p>
                          </div>
                          {isCompleted ? (
                            <Badge className="rounded-full bg-emerald-100 text-emerald-600">
                              Completed
                            </Badge>
                          ) : isInProgress ? (
                            <Badge className="rounded-full bg-blue-100 text-blue-600">
                              In Progress
                            </Badge>
                          ) : (
                            <Badge className="rounded-full bg-slate-100 text-slate-600">
                              Not Started
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Completion Rate</span>
                    <span className="font-semibold text-slate-900">
                      {selectedTraineeData.completionPercentage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Total Time Spent</span>
                    <span className="font-semibold text-slate-900">
                      {selectedTraineeData.totalTimeSpent}
                    </span>
                  </div>
                  {selectedTraineeData.averageScore && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Average Score</span>
                      <span className="font-semibold text-slate-900">
                        {selectedTraineeData.averageScore}%
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Last Activity</span>
                    <span className="font-semibold text-slate-900">
                      {selectedTraineeData.lastActivity}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-slate-200">
                  <Button variant="outline" className="flex-1 gap-2 rounded-xl">
                    <Mail className="h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2 rounded-xl">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
