"use client";

import { useParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TRAINING_MODULES } from "@/lib/data";
import { useAuth } from "@/components/auth-context";
import { useToast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  CheckCircle2,
  Play,
  BookOpen,
  Clock,
  Award,
  Tag,
  Download,
  FileText,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { QUIZZES, DISCUSSIONS } from "@/lib/data";

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const allowedRoles = ["trainee", "trainer", "dpd_rpdc", "dpd_admin"];

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to this training module. Only trainees,
                trainers, DPD/RPDC staff, and the DPD Admin can view module
                details.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const module = TRAINING_MODULES.find((m) => m.id === (params.id as string));

  if (!module) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">Module not found</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const isCompleted = module.completedBy?.includes(user?.id || "");
  const moduleQuiz = QUIZZES.find((q) => q.moduleId === module.id);
  const moduleDiscussions = DISCUSSIONS.filter((d) => d.moduleId === module.id);

  const handleMarkComplete = () => {
    toast({
      title: "Module completed!",
      description: `Congratulations! You've completed "${module.title}".`,
    });
  };

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Module content is being downloaded for offline access.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Library
        </button>

        {/* Module Header */}
        <header className="rounded-3xl bg-linear-to-r from-[#4b3be0] via-[#7846ff] to-[#9c4bff] px-6 py-6 text-white shadow-xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wide">
                  {module.phase.replace("-", " ")}
                </span>
                {module.badge && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold">
                    <Award className="h-3 w-3" />
                    {module.badge}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-semibold tracking-tight mb-3">
                {module.title}
              </h1>
              <p className="text-sm opacity-90 leading-relaxed">
                {module.description}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-xs font-semibold">
              <Clock className="h-3.5 w-3.5" />
              {module.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 text-xs font-semibold capitalize">
              <BookOpen className="h-3.5 w-3.5" />
              {module.type.replace("-", " ")}
            </span>
          </div>
        </header>

        {/* Video Player */}
        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100 overflow-hidden">
          <div className="aspect-video bg-slate-100 relative group">
            <img
              src={module.videoUrl || "/placeholder.svg"}
              alt="Module video"
              className="w-full h-full object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="h-8 w-8 text-white ml-1" fill="white" />
              </div>
            </button>
          </div>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Module Overview */}
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Module Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  {module.description}
                </p>
              </CardContent>
            </Card>

            {/* Learning Content */}
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Learning Content
                </CardTitle>
              </CardHeader>
              <CardContent className="text-slate-700 leading-relaxed space-y-4">
                <p>{module.script}</p>
                <p className="text-sm text-slate-600">
                  This comprehensive module covers all essential aspects of the
                  topic and provides practical insights that can be directly
                  applied in classroom settings. The content has been developed
                  by subject matter experts and aligned with current educational
                  standards.
                </p>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            {moduleQuiz && user?.role === "trainee" && (
              <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-indigo-600" />
                    Module Quiz
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">
                      {moduleQuiz.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {moduleQuiz.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                      <span>{moduleQuiz.questions.length} questions</span>
                      <span>{moduleQuiz.totalPoints} points</span>
                      {moduleQuiz.timeLimit && (
                        <span>{moduleQuiz.timeLimit} mins time limit</span>
                      )}
                      <span>{moduleQuiz.attemptsAllowed} attempts allowed</span>
                    </div>
                    <Link href={`/quiz/${moduleQuiz.id}`}>
                      <Button className="w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                        <FileText className="h-4 w-4" />
                        Start Quiz
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Discussions Section */}
            {user?.role === "trainee" && (
              <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-indigo-600" />
                      Discussions
                    </CardTitle>
                    <Link href={`/discussions?module=${module.id}`}>
                      <Button
                        variant="outline"
                        className="gap-2 rounded-xl text-sm"
                      >
                        View All
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  {moduleDiscussions.length === 0 ? (
                    <div className="text-center py-6 text-slate-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                      <p className="text-sm">
                        No discussions yet. Start a conversation!
                      </p>
                      <Link href={`/discussions?module=${module.id}`}>
                        <Button
                          variant="outline"
                          className="mt-4 gap-2 rounded-xl"
                        >
                          <MessageSquare className="h-4 w-4" />
                          Start Discussion
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {moduleDiscussions.slice(0, 2).map((discussion) => (
                        <div
                          key={discussion.id}
                          className="rounded-xl border border-slate-200 p-4"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm">
                                {discussion.title}
                              </h4>
                              <p className="text-xs text-slate-500 mt-1">
                                by {discussion.authorName}
                              </p>
                            </div>
                            <span className="text-xs text-slate-500">
                              {discussion.replies.length} replies
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 line-clamp-2">
                            {discussion.content}
                          </p>
                        </div>
                      ))}
                      <Link href={`/discussions?module=${module.id}`}>
                        <Button
                          variant="outline"
                          className="w-full gap-2 rounded-xl mt-2"
                        >
                          View All Discussions
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Completion Status */}
            {user?.role === "trainee" && (
              <Card
                className={`rounded-3xl border-0 shadow-md ${
                  isCompleted
                    ? "bg-emerald-50 shadow-emerald-100 border border-emerald-200"
                    : "bg-white shadow-indigo-100"
                }`}
              >
                <CardContent className="pt-6">
                  <Button
                    onClick={handleMarkComplete}
                    className={`w-full gap-2 rounded-xl ${
                      isCompleted
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                    disabled={isCompleted}
                  >
                    {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                    {isCompleted ? "Completed" : "Mark as Completed"}
                  </Button>
                  {isCompleted && (
                    <p className="text-xs text-emerald-700 text-center mt-3 font-medium">
                      ✓ You have completed this module
                    </p>
                  )}
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    className="w-full gap-2 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50 mt-3"
                  >
                    <Download className="h-4 w-4" />
                    Download for Offline
                  </Button>
                  {module.badge?.includes("Offline") && (
                    <p className="text-xs text-slate-500 text-center mt-2">
                      ✓ This module supports offline access
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Module Tags */}
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader className="flex items-center gap-2">
                <Tag className="h-5 w-5 text-indigo-600" />
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Module Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {module.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Information */}
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-semibold text-slate-900">
                    {module.duration}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500">Content Type</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {module.type.replace("-", " ")}
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500">Phase</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {module.phase.replace("-", " ")}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
