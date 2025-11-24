"use client";

import type React from "react";

import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/auth-context";
import { MOCK_FEEDBACK, TRAINING_MODULES } from "@/lib/data";
import {
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Send,
  Sparkles,
} from "lucide-react";

export default function FeedbackPage() {
  const { user } = useAuth();

  const isEmisAdmin = user?.role === "emis_admin";
  if (isEmisAdmin) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                EMIS oversight no longer manages feedback in this portal. Please
                refer issues to the DPD operations team.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  const [activeTab, setActiveTab] = useState<"submit" | "view">("submit");
  const [formData, setFormData] = useState({
    category: "suggestion",
    priority: "medium",
    message: "",
    moduleId: "",
    moduleTitle: "",
  });
  const [feedbackList, setFeedbackList] = useState(MOCK_FEEDBACK);

  const userFeedback = feedbackList.filter((f) => f.userId === user?.id);
  const canViewAll = user?.role === "dpd_rpdc" || user?.role === "dpd_admin";
  const displayFeedback = canViewAll ? feedbackList : userFeedback;

  const stats = useMemo(() => {
    const newItems = feedbackList.filter((f) => f.status === "new").length;
    const inReview = feedbackList.filter(
      (f) => f.status === "in-review"
    ).length;
    const resolved = feedbackList.filter((f) => f.status === "resolved").length;
    return [
      { label: "New items", value: newItems, helper: "Waiting for triage" },
      { label: "In review", value: inReview, helper: "Being investigated" },
      { label: "Resolved", value: resolved, helper: "Closed this week" },
    ];
  }, [feedbackList]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a unique ID by finding the max ID and incrementing it
    const maxId = feedbackList.reduce((max, feedback) => {
      const idNum = parseInt(feedback.id, 10);
      return isNaN(idNum) ? max : Math.max(max, idNum);
    }, 0);
    const newFeedback = {
      id: String(maxId + 1),
      userId: user?.id || "",
      userName: user?.name || "",
      userRole: user?.role || "trainee",
      category: formData.category as any,
      priority: formData.priority as any,
      message: formData.message,
      status: "new" as const,
      createdDate: new Date().toISOString().split("T")[0],
      moduleId: formData.moduleId || undefined,
      moduleTitle: formData.moduleTitle || undefined,
    };
    setFeedbackList([newFeedback, ...feedbackList]);
    setFormData({
      category: "suggestion",
      priority: "medium",
      message: "",
      moduleId: "",
      moduleTitle: "",
    });
    setActiveTab("view");
  };

  const updateFeedbackStatus = (
    id: string,
    newStatus: "new" | "in-review" | "resolved"
  ) => {
    setFeedbackList(
      feedbackList.map((f) => (f.id === id ? { ...f, status: newStatus } : f))
    );
  };

  return (
    <MainLayout>
      <div className="space-y-10 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <section className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/80">
                Support center
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                Feedback & help desk
              </h1>
              <p className="mt-2 text-sm opacity-90">
                Tell us what&apos;s working and where we can improve. Your voice
                shapes the KPK training experience.
              </p>
            </div>
            <div className="flex gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white/15 px-4 py-2 text-center"
                >
                  <p className="text-xs uppercase text-white/70">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <p className="text-[11px] text-white/70">{stat.helper}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTab("submit")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "submit"
                ? "bg-[#5f3df7] text-white shadow-md"
                : "bg-white text-slate-600 shadow hover:bg-slate-50"
            }`}
          >
            <Send className="h-4 w-4" />
            Submit feedback
          </button>
          <button
            onClick={() => setActiveTab("view")}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "view"
                ? "bg-[#5f3df7] text-white shadow-md"
                : "bg-white text-slate-600 shadow hover:bg-slate-50"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            View feedback log
          </button>
        </div>

        {/* Submit Form */}
        {activeTab === "submit" && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">
                  Share your feedback
                </CardTitle>
                <p className="text-sm text-slate-500">
                  We respond within 24 business hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none"
                      >
                        <option value="bug">Bug report</option>
                        <option value="suggestion">Suggestion</option>
                        <option value="content-issue">Content issue</option>
                        <option value="content-effectiveness">
                          Content Effectiveness
                        </option>
                        <option value="platform-usability">
                          Platform Usability
                        </option>
                        <option value="login-problem">Login problem</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Priority
                      </label>
                      <select
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData({ ...formData, priority: e.target.value })
                        }
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  {(user?.role === "trainer" || user?.role === "dpd_rpdc") && (
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Module (Optional)
                      </label>
                      <select
                        value={formData.moduleId}
                        onChange={(e) => {
                          const module = TRAINING_MODULES.find(
                            (m) => m.id === e.target.value
                          );
                          setFormData({
                            ...formData,
                            moduleId: e.target.value,
                            moduleTitle: module?.title || "",
                          });
                        }}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-indigo-300 focus:outline-none"
                      >
                        <option value="">Select a module (optional)</option>
                        {TRAINING_MODULES.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.title}
                          </option>
                        ))}
                      </select>
                      <p className="mt-1 text-xs text-slate-400">
                        Select a module to provide feedback on delivery,
                        engagement, or issues encountered
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Message
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={
                        user?.role === "trainer"
                          ? "Describe module delivery experience, trainee engagement, or issues encountered..."
                          : "Describe your feedback in detail..."
                      }
                      rows={5}
                      className="mt-2 rounded-3xl border border-slate-200 bg-white text-sm text-slate-700 shadow-sm focus-visible:ring-[#5f3df7]"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#5f3df7] px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#4b2ed4]"
                  >
                    <Send className="h-4 w-4" />
                    Send feedback
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  Response playbook
                </p>
                <CardTitle className="text-2xl">What happens next</CardTitle>
                <p className="text-sm text-indigo-100">
                  We triage every submission in three simple steps.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Triage",
                    desc: "The support desk reviews your note within 24h.",
                    icon: <AlertTriangle className="h-4 w-4" />,
                  },
                  {
                    title: "Investigation",
                    desc: "Subject leads dig into the request and update the status.",
                    icon: <BarChart3 className="h-4 w-4" />,
                  },
                  {
                    title: "Resolution",
                    desc: "We resolve or assign next steps, then notify you.",
                    icon: <Sparkles className="h-4 w-4" />,
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 text-sm text-indigo-100"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white">
                      {step.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{step.title}</p>
                      <p className="text-xs text-indigo-200">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback List */}
        {activeTab === "view" && (
          <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-2xl text-slate-900">
                  Feedback timeline
                </CardTitle>
                <p className="text-sm text-slate-500">
                  {canViewAll
                    ? "Viewing all submissions"
                    : "Only showing your submissions"}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {displayFeedback.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-sm text-slate-500">
                    No feedback yet. Submit your first note to see it appear
                    here.
                  </div>
                ) : (
                  displayFeedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm shadow-indigo-50"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold text-slate-900">
                            {feedback.userName}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-slate-400">
                            {feedback.userRole.replace("_", " ")} ·{" "}
                            {feedback.createdDate}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            className={
                              feedback.priority === "high"
                                ? "rounded-full bg-red-100 text-red-600"
                                : feedback.priority === "medium"
                                ? "rounded-full bg-amber-100 text-amber-600"
                                : "rounded-full bg-slate-200 text-slate-700"
                            }
                          >
                            {feedback.priority}
                          </Badge>
                          <Badge className="rounded-full bg-indigo-100 text-indigo-600">
                            {feedback.category.replace("-", " ")}
                          </Badge>
                        </div>
                      </div>
                      <p className="mt-3 text-slate-600">{feedback.message}</p>
                      {canViewAll && (
                        <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-3">
                          <select
                            value={feedback.status}
                            onChange={(e) =>
                              updateFeedbackStatus(
                                feedback.id,
                                e.target.value as any
                              )
                            }
                            className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 focus:border-indigo-300 focus:outline-none"
                          >
                            <option value="new">New</option>
                            <option value="in-review">In review</option>
                            <option value="resolved">Resolved</option>
                          </select>
                          <span
                            className={`text-xs font-semibold capitalize ${
                              feedback.status === "resolved"
                                ? "text-emerald-600"
                                : feedback.status === "in-review"
                                ? "text-indigo-500"
                                : "text-slate-500"
                            }`}
                          >
                            {feedback.status.replace("-", " ")}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  Need quick help?
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Reach the right support stream instantly.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Login or access issues",
                    contact: "login.support@kpk.edu.pk",
                  },
                  {
                    title: "Content corrections",
                    contact: "dpd.content@kpk.edu.pk",
                  },
                  {
                    title: "Technical bugs",
                    contact: "emis.support@kpk.edu.pk",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600"
                  >
                    <p className="text-base font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.contact}</p>
                  </div>
                ))}
                <div className="rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 p-4 text-sm text-slate-700">
                  <p className="text-base font-semibold text-slate-900">
                    Live support window
                  </p>
                  <p className="text-xs text-slate-500">
                    Mon - Fri · 9:00 AM - 5:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
