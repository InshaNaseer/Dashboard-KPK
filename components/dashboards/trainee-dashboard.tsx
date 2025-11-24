"use client";

import type { User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TRAINING_MODULES } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Plus,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

export function TraineeDashboard({ user }: { user: User }) {
  const router = useRouter();
  const { toast } = useToast();
  const completedModules = TRAINING_MODULES.filter((m) =>
    m.completedBy?.includes(user.id)
  ).length;
  const totalModules = TRAINING_MODULES.length;
  const completionPercentage = Math.round(
    (completedModules / totalModules) * 100
  );

  const phase1Modules = TRAINING_MODULES.filter((m) => m.phase === "phase-1");
  const phase1Completed = phase1Modules.filter((m) =>
    m.completedBy?.includes(user.id)
  ).length;

  const assignedModules = TRAINING_MODULES.slice(0, 6);

  const skillPills = [
    {
      label: "Active Learning",
      score: 22,
      color: "bg-[#fcefee] text-[#d946ef]",
    },
    {
      label: "Community Outreach",
      score: 18,
      color: "bg-[#eff6ff] text-[#2563eb]",
    },
    {
      label: "Digital Pedagogy",
      score: 17,
      color: "bg-[#f0fdf4] text-[#22c55e]",
    },
    { label: "Psychology", score: 12, color: "bg-[#fdf2f8] text-[#db2777]" },
    {
      label: "STEM Facilitation",
      score: 15,
      color: "bg-[#fef3c7] text-[#d97706]",
    },
    { label: "Inclusivity", score: 16, color: "bg-[#ecfeff] text-[#0891b2]" },
  ];

  const interestTags = [
    "Leadership",
    "Soft Skills",
    "Mentoring",
    "Quizzes",
    "Parent Engagement",
    "Digital Skills",
  ];

  const upcomingSchedule = [
    {
      title: "Phase 2 Intensive Workshop",
      subtitle: "Hybrid • 9:00 AM",
      date: "Nov 29",
      status: "Live soon",
    },
    {
      title: "Mentor Connect Circle",
      subtitle: "Virtual • 3:00 PM",
      date: "Dec 01",
      status: "Reminder set",
    },
    {
      title: "People Analytics 101",
      subtitle: "Course • Self-paced",
      date: "Dec 03",
      status: "Continue",
    },
  ];

  const recommendedCourse = {
    title: "Advanced Community Engagement",
    details: "Tailored for your interest in leadership & outreach.",
    session: "Introduction to People Analytics • Online",
    datetime: "Nov 23 • 11:00 AM",
  };

  const handleReminderClick = () => {
    toast({
      title: "Reminder scheduled",
      description: "We will notify you 24 hours before the session.",
    });
  };

  const handleGoForDetailsClick = () => {
    router.push("/training-library");
    toast({
      title: "Opening catalog",
      description: "Loading recommended course details...",
    });
  };

  return (
    <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-linear-to-r from-[#4b3be0] via-[#7846ff] to-[#9c4bff] px-6 py-5 text-white shadow-xl">
        <div>
          <p className="text-sm opacity-80">My Learning Analytics</p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-sm opacity-90">
            Keep the streak alive — you are {completionPercentage}% through the
            pathway.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:bg-white/25">
          <Bell className="h-4 w-4" />4 alerts
        </button>
      </header>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <section className="space-y-6">
          <Card className="overflow-hidden rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-100 to-indigo-200 text-4xl">
                  {user.avatar ?? "👩‍🏫"}
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-indigo-500">
                    Trainee
                  </p>
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {user.name}
                  </h2>
                  <p className="text-sm text-slate-500">{user.email}</p>
                </div>
              </div>
              <div className="grid flex-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Modules done
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {completedModules}
                  </p>
                  <p className="text-xs text-slate-500">
                    of {totalModules} assigned
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Current phase
                  </p>
                  <p className="text-lg font-semibold text-slate-900">
                    Phase 1
                  </p>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Completion</span>
                      <span>
                        {Math.round(
                          (phase1Completed / phase1Modules.length) * 100
                        )}
                        %
                      </span>
                    </div>
                    <Progress
                      value={(phase1Completed / phase1Modules.length) * 100}
                      className="h-2 bg-indigo-100"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    My Skills
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Based on course completions
                  </p>
                </div>
                <button className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Manage
                  <ChevronRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                {skillPills.map((skill) => (
                  <div
                    key={skill.label}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold ${skill.color}`}
                  >
                    <span>{skill.label}</span>
                    <span className="text-xs opacity-75">
                      Score {skill.score}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    My Interests
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Used to recommend courses
                  </p>
                </div>
                <button className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Manage
                  <ChevronRight className="h-3 w-3" />
                </button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {interestTags.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-slate-100 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
                <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-indigo-300 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50">
                  <Plus className="h-4 w-4" />
                  Add digital skill
                </button>
              </CardContent>
            </Card>
          </div>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  My Assigned Modules
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Continue from where you left off
                </p>
              </div>
              <button
                onClick={() => {
                  router.push("/training-library");
                  toast({
                    title: "Opening catalog",
                    description: "Browsing all available training modules...",
                  });
                }}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100"
              >
                View catalog
                <ChevronRight className="h-4 w-4" />
              </button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignedModules.map((module) => {
                  const isCompleted = module.completedBy?.includes(user.id);
                  return (
                    <div
                      key={module.id}
                      className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-sm text-slate-700 transition hover:border-indigo-200 hover:bg-white md:flex-row md:items-center"
                    >
                      <div className="flex flex-1 flex-col">
                        <span className="text-xs uppercase tracking-wide text-slate-400">
                          {module.phase.replace("-", " ")}
                        </span>
                        <span className="text-base font-semibold text-slate-900">
                          {module.title}
                        </span>
                        <span className="text-xs text-slate-500">
                          {module.duration} • {module.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 md:justify-end">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
                            <Sparkles className="h-3.5 w-3.5" />
                            In progress
                          </span>
                        )}
                        <button
                          onClick={() => {
                            router.push(`/training-library/${module.id}`);
                            toast({
                              title: "Opening module",
                              description: `Loading ${module.title}...`,
                            });
                          }}
                          className="inline-flex h-9 items-center gap-2 rounded-full bg-indigo-600 px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                        >
                          Continue
                          <ChevronRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="rounded-3xl bg-linear-to-br from-[#fef3c7] via-[#fde68a] to-[#facc15] p-6 shadow-lg shadow-yellow-100">
            <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wide text-yellow-800">
              <Star className="h-4 w-4" />
              New course in the catalog
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-slate-900">
              {recommendedCourse.title}
            </h3>
            <p className="mt-1 text-sm text-slate-700">
              {recommendedCourse.details}
            </p>
            <div className="mt-4 rounded-2xl bg-white/80 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">
                {recommendedCourse.session}
              </p>
              <p className="text-xs text-slate-500">
                {recommendedCourse.datetime}
              </p>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleReminderClick}
                className="flex-1 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:bg-white"
              >
                Remind me later
              </button>
              <button
                onClick={handleGoForDetailsClick}
                className="flex-1 rounded-full bg-[#3cb179] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#32a16c]"
              >
                Go for details
              </button>
            </div>
          </div>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Today&apos;s Schedule
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Stay on top of your commitments
                </p>
              </div>
              <button className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                <Calendar className="h-3.5 w-3.5" />
                View month
              </button>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingSchedule.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-4"
                >
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-white text-center text-sm font-semibold text-slate-900 shadow-sm">
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      Due
                    </span>
                    <span>{item.date}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                    {item.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
            <CardHeader className="space-y-2">
              <p className="text-sm uppercase tracking-wide text-indigo-200">
                Momentum
              </p>
              <CardTitle className="text-2xl font-semibold">
                Learning streak
              </CardTitle>
              <p className="text-sm text-indigo-200">
                You&apos;ve logged in 5 days in a row. Keep it up!
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between text-indigo-100">
                  <span>Weekly goal</span>
                  <span>3 / 5 hrs</span>
                </div>
                <Progress value={60} className="h-2 bg-white/20" />
              </div>
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm text-indigo-100">
                <BookOpen className="h-5 w-5" />
                <div>
                  <p className="text-white">Next best action</p>
                  <p className="text-xs text-indigo-200">
                    Finish &quot;Digital Tools in Education&quot; today
                  </p>
                </div>
              </div>
              <button className="w-full rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white">
                Mark progress
              </button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
