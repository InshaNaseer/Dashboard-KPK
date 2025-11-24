"use client";

import type { User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  TRAINING_MODULES,
  LIVE_SESSIONS,
  TRAINEE_PROGRESS_DATA,
  TRAINER_ASSIGNMENTS,
} from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Users,
  Video,
  TrendingUp,
  Play,
  Calendar,
  BarChart3,
  ClipboardList,
  AlertTriangle,
} from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

export function TrainerDashboard({ user }: { user: User }) {
  const myModules = TRAINING_MODULES.slice(0, 6);
  const myAssignments = TRAINER_ASSIGNMENTS.filter(
    (assignment) => assignment.trainerId === user.id
  );
  const openAssignments = myAssignments.filter(
    (assignment) => assignment.status !== "completed"
  );
  const nextAssignment = [...openAssignments].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  )[0];

  // Trainer-specific stats
  const myLiveSessions = LIVE_SESSIONS.filter((s) => s.trainerId === user.id);
  const scheduledSessions = myLiveSessions.filter(
    (s) => s.status === "scheduled" || s.status === "live"
  ).length;
  const completedSessions = myLiveSessions.filter(
    (s) => s.status === "completed"
  ).length;
  const totalTrainees = TRAINEE_PROGRESS_DATA.length;
  const activeTrainees = TRAINEE_PROGRESS_DATA.filter((t) => {
    const daysSinceActivity = Math.floor(
      (new Date().getTime() - new Date(t.lastActivity).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return daysSinceActivity <= 7;
  }).length;
  const avgCompletion = Math.round(
    TRAINEE_PROGRESS_DATA.reduce((sum, t) => sum + t.completionPercentage, 0) /
      TRAINEE_PROGRESS_DATA.length
  );

  const stats = useMemo(
    () => [
      {
        label: "Active trainees",
        value: activeTrainees,
        helper: `of ${totalTrainees} total`,
        icon: <Users className="h-5 w-5 text-emerald-500" />,
      },
      {
        label: "Live sessions",
        value: scheduledSessions,
        helper: `${completedSessions} completed`,
        icon: <Video className="h-5 w-5 text-purple-500" />,
      },
      {
        label: "Avg completion",
        value: `${avgCompletion}%`,
        helper: "Across all trainees",
        icon: <TrendingUp className="h-5 w-5 text-blue-500" />,
      },
      {
        label: "Total modules",
        value: TRAINING_MODULES.length,
        helper: "Available for delivery",
        icon: <BookOpen className="h-5 w-5 text-indigo-500" />,
      },
    ],
    [
      activeTrainees,
      totalTrainees,
      scheduledSessions,
      completedSessions,
      avgCompletion,
    ]
  );

  return (
    <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
      <header className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] px-6 py-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">
              Training Delivery & Management
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Hello, {user.name.split(" ")[0]}
            </h1>
            <p className="text-sm opacity-85">
              Deliver training modules, track trainee progress, and collect
              feedback.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/training-delivery">
              <Button className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-white">
                <Video className="mr-2 h-4 w-4" />
                Deliver Training
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">
              Training Overview
            </CardTitle>
            <p className="text-sm text-slate-500">
              Monitor training delivery, live sessions, and trainee progress.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm shadow-indigo-50"
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
                  <p className="text-xs text-slate-500">{stat.helper}</p>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-slate-50/80 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      Upcoming Sessions
                    </p>
                    <p className="text-xl font-semibold text-slate-900">
                      Live Training
                    </p>
                  </div>
                  <Badge className="rounded-full bg-[#f3e8ff] text-[#7c3aed]">
                    {scheduledSessions} scheduled
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-slate-500">
                  Manage synchronous training sessions and real-time
                  interactions.
                </p>
                <div className="mt-4 space-y-3">
                  {myLiveSessions
                    .filter(
                      (s) => s.status === "scheduled" || s.status === "live"
                    )
                    .slice(0, 2)
                    .map((session) => (
                      <div
                        key={session.id}
                        className="flex items-center justify-between rounded-xl bg-white p-3 text-sm"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">
                            {session.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {session.scheduledDate} at {session.scheduledTime}
                          </p>
                        </div>
                        <Badge
                          className={
                            session.status === "live"
                              ? "rounded-full bg-red-100 text-red-600"
                              : "rounded-full bg-blue-100 text-blue-600"
                          }
                        >
                          {session.status === "live" ? "Live" : "Scheduled"}
                        </Badge>
                      </div>
                    ))}
                </div>
                <Link href="/live-sessions">
                  <Button
                    variant="outline"
                    className="mt-4 w-full gap-2 rounded-xl"
                  >
                    <Calendar className="h-4 w-4" />
                    View All Sessions
                  </Button>
                </Link>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-[#1e2337] p-5 text-white shadow-md shadow-indigo-800/20">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  Quick Actions
                </p>
                <p className="text-xl font-semibold">Training Tools</p>
                <p className="mt-1 text-sm text-indigo-100">
                  Access training delivery, progress tracking, and feedback
                  collection.
                </p>
                <div className="mt-4 space-y-2">
                  <Link href="/training-delivery">
                    <Button
                      variant="secondary"
                      className="w-full gap-2 rounded-full bg-white/90 text-slate-900 hover:bg-white"
                    >
                      <Video className="h-4 w-4" />
                      Deliver Training
                    </Button>
                  </Link>
                  <Link href="/trainee-progress">
                    <Button
                      variant="secondary"
                      className="w-full gap-2 rounded-full bg-white/20 text-white hover:bg-white/30"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Track Progress
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Trainee Overview
            </CardTitle>
            <p className="text-sm text-slate-500">
              Quick view of trainee engagement and progress.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {TRAINEE_PROGRESS_DATA.slice(0, 3).map((trainee) => (
              <div
                key={trainee.traineeId}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      {trainee.traineeName}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <Progress
                        value={trainee.completionPercentage}
                        className="h-1.5 flex-1 bg-indigo-100"
                      />
                      <span className="text-xs font-semibold text-slate-700">
                        {trainee.completionPercentage}%
                      </span>
                    </div>
                  </div>
                  <Badge className="rounded-full bg-emerald-100 text-emerald-600">
                    {trainee.completedModules.length}/
                    {trainee.enrolledModules.length}
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Last active: {trainee.lastActivity}
                </p>
              </div>
            ))}
            <Link href="/trainee-progress">
              <Button
                variant="outline"
                className="mt-3 w-full gap-2 rounded-xl"
              >
                <BarChart3 className="h-4 w-4" />
                View All Trainees
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">
              Assignments from DPD/RPDC
            </CardTitle>
            <p className="text-sm text-slate-500">
              Track work delegated by district coordinators.
            </p>
          </CardHeader>
          <CardContent>
            {myAssignments.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                No assignments yet. DPD/RPDC coordinators will assign work here.
              </div>
            ) : (
              <>
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
                  <Badge className="rounded-full bg-indigo-100 text-indigo-600">
                    {openAssignments.length} open
                  </Badge>
                  {nextAssignment && (
                    <span className="flex items-center gap-1 text-slate-600">
                      <Calendar className="h-4 w-4" />
                      Next due: {nextAssignment.dueDate}
                    </span>
                  )}
                  {nextAssignment && (
                    <span className="flex items-center gap-1 text-amber-600">
                      <AlertTriangle className="h-4 w-4" />
                      Priority: {nextAssignment.priority}
                    </span>
                  )}
                </div>
                <div className="space-y-3">
                  {openAssignments.slice(0, 3).map((assignment) => (
                    <div
                      key={assignment.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-slate-900">
                          {assignment.title}
                        </p>
                        <Badge className="rounded-full bg-slate-200 text-slate-700 capitalize">
                          {assignment.status.replace("-", " ")}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        Due {assignment.dueDate} • {assignment.rpdcCenter}
                      </p>
                      {assignment.moduleTitle && (
                        <Link
                          href={`/training-library/${assignment.moduleId}`}
                          className="text-indigo-600 underline text-xs"
                        >
                          {assignment.moduleTitle}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
                <Link href="/assignments">
                  <Button
                    variant="outline"
                    className="mt-4 w-full gap-2 rounded-xl"
                  >
                    <ClipboardList className="h-4 w-4" />
                    Open assignments workspace
                  </Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Available Training Modules */}
      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-slate-900">
                Available Training Modules
              </CardTitle>
              <p className="text-sm text-slate-500">
                Access all training materials for delivery to trainees
              </p>
            </div>
            <Link href="/training-delivery">
              <Button variant="outline" className="gap-2 rounded-xl">
                <BookOpen className="h-4 w-4" />
                View All Modules
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myModules.map((module) => (
              <Link key={module.id} href={`/training-library/${module.id}`}>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm shadow-indigo-50 transition hover:border-indigo-200 hover:shadow-md cursor-pointer">
                  <div className="flex flex-col gap-2">
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {module.phase.replace("-", " ")}
                    </span>
                    <span className="text-base font-semibold text-slate-900">
                      {module.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {module.duration} • {module.type.replace("-", " ")}
                    </span>
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-2 text-indigo-600 hover:bg-indigo-50 w-full"
                      >
                        <Video className="h-4 w-4" />
                        Deliver Module
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
