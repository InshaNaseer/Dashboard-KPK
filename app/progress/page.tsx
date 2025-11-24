"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { TRAINING_MODULES, QUIZ_ATTEMPTS, CERTIFICATES } from "@/lib/data";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  Play,
  Sparkles,
  Trophy,
  FileText,
  Award,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProgressPage() {
  const router = useRouter();
  const { user } = useAuth();

  const phase1 = TRAINING_MODULES.filter((m) => m.phase === "phase-1");
  const phase2 = TRAINING_MODULES.filter((m) => m.phase === "phase-2");
  const completedIds = new Set(
    TRAINING_MODULES.filter((m) => m.completedBy?.includes(user?.id || "")).map(
      (m) => m.id
    )
  );
  const firstIncomplete = TRAINING_MODULES.find((m) => !completedIds.has(m.id));

  const phase1Completed = phase1.filter((m) => completedIds.has(m.id)).length;
  const phase2Completed = phase2.filter((m) => completedIds.has(m.id)).length;
  const totalCompletion = Math.round(
    (completedIds.size / TRAINING_MODULES.length) * 100
  );

  // Quiz results
  const userQuizAttempts = QUIZ_ATTEMPTS.filter(
    (a) => a.traineeId === user?.id
  );
  const quizAverage =
    userQuizAttempts.length > 0
      ? Math.round(
          userQuizAttempts.reduce((sum, a) => sum + a.percentage, 0) /
            userQuizAttempts.length
        )
      : 0;
  const passedQuizzes = userQuizAttempts.filter((a) => a.passed).length;

  // Certificates
  const userCertificates = CERTIFICATES.filter((c) => c.traineeId === user?.id);

  const learningPath = TRAINING_MODULES.map((module, index) => {
    const completed = completedIds.has(module.id);
    const isCurrent = !completed && module.id === firstIncomplete?.id;

    return {
      ...module,
      order: index + 1,
      status: completed ? "completed" : isCurrent ? "in-progress" : "up-next",
      points: module.phase === "phase-1" ? 10 : 20,
    };
  });

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] px-6 py-5 text-white shadow-xl">
          <p className="text-sm opacity-80">My Learning • Personalized path</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Progress tracker
              </h1>
              <p className="text-sm opacity-90">
                You&apos;re {totalCompletion}% through the KPK Teacher Journey
              </p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
                <p className="text-xs uppercase text-white/80">Phase 1</p>
                <p className="text-lg font-semibold">
                  {phase1Completed}/{phase1.length}
                </p>
              </div>
              <div className="rounded-2xl bg-white/20 px-4 py-2 text-center">
                <p className="text-xs uppercase text-white/80">Phase 2</p>
                <p className="text-lg font-semibold">
                  {phase2Completed}/{phase2.length}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Quiz Results & Certificates */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" />
                Quiz Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userQuizAttempts.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm">No quiz attempts yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Average Score
                    </span>
                    <span className="text-2xl font-semibold text-slate-900">
                      {quizAverage}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">
                      Quizzes Passed
                    </span>
                    <span className="text-lg font-semibold text-emerald-600">
                      {passedQuizzes}/{userQuizAttempts.length}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-slate-200 space-y-2">
                    {userQuizAttempts.slice(0, 3).map((attempt) => (
                      <div
                        key={attempt.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50"
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            Quiz Attempt
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(attempt.completedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-semibold ${
                              attempt.passed
                                ? "text-emerald-600"
                                : "text-orange-600"
                            }`}
                          >
                            {attempt.percentage}%
                          </p>
                          <p className="text-xs text-slate-500">
                            {attempt.passed ? "Passed" : "Failed"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl text-slate-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-600" />
                Certificates
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userCertificates.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <Award className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-sm mb-3">No certificates yet</p>
                  <Link href="/training-library">
                    <Button
                      variant="outline"
                      className="gap-2 rounded-xl text-sm"
                    >
                      Browse Modules
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {userCertificates.slice(0, 3).map((certificate) => (
                    <div
                      key={certificate.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100"
                    >
                      <div className="flex items-center gap-3">
                        <Award className="h-8 w-8 text-indigo-600" />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {certificate.moduleTitle ||
                              "Completion Certificate"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {certificate.issuedDate}
                          </p>
                        </div>
                      </div>
                      <Link href="/certificates">
                        <Button
                          variant="outline"
                          className="gap-2 rounded-xl text-xs"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                  {userCertificates.length > 3 && (
                    <Link href="/certificates">
                      <Button
                        variant="outline"
                        className="w-full gap-2 rounded-xl"
                      >
                        View All Certificates
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.5fr,0.8fr]">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl text-slate-900">
                My learning path
              </CardTitle>
              <p className="text-sm text-slate-500">
                Tailored to your skill gaps and training history
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative space-y-4 before:absolute before:left-[22px] before:top-4 before:bottom-4 before:w-1 before:rounded-full before:bg-indigo-100">
                {learningPath.map((module) => (
                  <div
                    key={module.id}
                    className="relative flex gap-4 rounded-3xl border border-slate-100 bg-slate-50/70 p-4 pl-6 text-sm text-slate-700 shadow-sm shadow-indigo-50"
                  >
                    <div className="absolute left-3 top-6 h-3 w-3 rounded-full border-4 border-white shadow ring-4 ring-indigo-100" />
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-100 text-sm font-semibold text-indigo-700">
                      {module.order.toString().padStart(2, "0")}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base font-semibold text-slate-900">
                          {module.title}
                        </p>
                        <Badge
                          className={`rounded-full px-3 py-0.5 text-[11px] ${
                            module.status === "completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : module.status === "in-progress"
                              ? "bg-[#e0d7ff] text-[#4b3be0]"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {module.status === "completed" && "Completed"}
                          {module.status === "in-progress" && "In progress"}
                          {module.status === "up-next" && "Up next"}
                        </Badge>
                      </div>
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        {module.phase.replace("-", " ")}
                      </p>
                      <p className="text-xs text-slate-500">
                        {module.duration} •{" "}
                        {module.type === "video"
                          ? "Video"
                          : module.type === "simulation"
                          ? "Simulation"
                          : "Guide"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end justify-between text-right">
                      <span className="text-xs font-semibold text-indigo-600">
                        +{module.points} points
                      </span>
                      {module.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      ) : module.status === "in-progress" ? (
                        <Play className="h-5 w-5 text-indigo-500" />
                      ) : (
                        <Sparkles className="h-5 w-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Phase progression
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Foundation vs. advanced levels
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold text-slate-700">Phase 1</p>
                    <span className="text-xs text-slate-500">
                      {phase1Completed}/{phase1.length} done
                    </span>
                  </div>
                  <Progress
                    value={(phase1Completed / phase1.length) * 100}
                    className="mt-2 h-3 bg-indigo-100"
                  />
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <p className="font-semibold text-slate-700">Phase 2</p>
                    <span className="text-xs text-slate-500">
                      {phase2Completed}/{phase2.length} done
                    </span>
                  </div>
                  <Progress
                    value={(phase2Completed / phase2.length) * 100}
                    className="mt-2 h-3 bg-indigo-100"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
              <CardHeader className="space-y-1">
                <p className="text-sm uppercase tracking-wide text-indigo-200">
                  Milestones
                </p>
                <CardTitle className="text-2xl">Almost there!</CardTitle>
                <p className="text-sm text-indigo-100">
                  Complete 2 more modules to unlock your Phase 1 certificate.
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2 text-sm text-indigo-100">
                  <div className="flex items-center justify-between">
                    <span>Overall completion</span>
                    <span>{totalCompletion}%</span>
                  </div>
                  <Progress
                    value={totalCompletion}
                    className="h-2 bg-white/20"
                  />
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-yellow-300" />
                    <div>
                      <p className="font-semibold text-white">Next reward</p>
                      <p className="text-xs text-indigo-200">
                        Gold badge • Exclusive cohort webinar
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => router.push("/achievements")}
                  className="w-full rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                >
                  View achievement history
                </button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
