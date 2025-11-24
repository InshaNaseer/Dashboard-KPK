"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { LIVE_SESSIONS, TRAINING_MODULES } from "@/lib/data";
import {
  Video,
  Calendar,
  Clock,
  Users,
  Play,
  CheckCircle2,
  XCircle,
  ExternalLink,
  MessageSquare,
  Link as LinkIcon,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function LiveSessionsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthorized = user?.role === "trainer" || user?.role === "dpd_rpdc";

  const [sessions] = useState(
    LIVE_SESSIONS.filter(
      (s) => s.trainerId === user?.id || user?.role === "dpd_rpdc"
    )
  );
  const GOOGLE_MEET_BASE = "https://meet.google.com/";

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to live sessions. Only trainers and
                DPD/RPDC staff can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const scheduledSessions = sessions.filter(
    (s) => s.status === "scheduled" || s.status === "live"
  );
  const completedSessions = sessions.filter((s) => s.status === "completed");
  const cancelledSessions = sessions.filter((s) => s.status === "cancelled");

  const ensureMeetingLink = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return undefined;
    if (session.meetingLink && session.meetingLink.startsWith("http")) {
      return session.meetingLink;
    }
    const slug =
      session.meetingLink ||
      `${session.moduleId || "session"}-${session.scheduledDate}`.replace(
        /[^a-z0-9]/gi,
        ""
      );
    return `${GOOGLE_MEET_BASE}${slug.toLowerCase()}`;
  };

  const handleStartSession = (sessionId: string) => {
    const link = ensureMeetingLink(sessionId);
    toast({
      title: "Starting session",
      description: "Google Meet room is opening in a new tab.",
    });
    if (link) {
      window.open(link, "_blank");
    }
  };

  const handleJoinSession = (sessionId: string) => {
    const meetingLink = ensureMeetingLink(sessionId);
    if (meetingLink) {
      window.open(meetingLink, "_blank");
    } else {
      toast({
        title: "Session link not available",
        description: "Please contact the trainer for the meeting link.",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return (
          <Badge className="rounded-full bg-red-100 text-red-600">
            Live Now
          </Badge>
        );
      case "scheduled":
        return (
          <Badge className="rounded-full bg-blue-100 text-blue-600">
            Scheduled
          </Badge>
        );
      case "completed":
        return (
          <Badge className="rounded-full bg-emerald-100 text-emerald-600">
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="rounded-full bg-slate-100 text-slate-600">
            Cancelled
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

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <Video className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Live Training Sessions
                </h1>
                <p className="text-sm opacity-90">
                  Manage synchronous (live) and asynchronous (self-paced)
                  training programs
                </p>
              </div>
            </div>
            {user?.role === "trainer" && (
              <Button
                className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-white"
                onClick={() =>
                  toast({
                    title: "Create Session",
                    description: "Session creation form will open here.",
                  })
                }
              >
                <Video className="mr-2 h-4 w-4" />
                Schedule Session
              </Button>
            )}
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Sessions</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {sessions.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Video className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Scheduled</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {scheduledSessions.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Completed</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {completedSessions.length}
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
                  <p className="text-sm text-slate-500 mb-1">
                    Total Participants
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {sessions.reduce((sum, s) => sum + s.participants, 0)}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled/Live Sessions */}
        {scheduledSessions.length > 0 && (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Upcoming & Live Sessions
              </CardTitle>
              <p className="text-sm text-slate-500">
                Synchronous training sessions for real-time interactions
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledSessions.map((session) => {
                  const module = session.moduleId
                    ? TRAINING_MODULES.find((m) => m.id === session.moduleId)
                    : null;
                  const meetLink = ensureMeetingLink(session.id);
                  return (
                    <div
                      key={session.id}
                      className={`rounded-2xl border p-6 ${
                        session.status === "live"
                          ? "border-red-200 bg-red-50/30"
                          : "border-blue-200 bg-blue-50/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                                session.status === "live"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              <Video className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-lg">
                                {session.title}
                              </h3>
                              {getStatusBadge(session.status)}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">
                            {session.description}
                          </p>
                          {module && (
                            <div className="mb-3">
                              <Link href={`/training-library/${module.id}`}>
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                >
                                  Related: {module.title}
                                </Badge>
                              </Link>
                            </div>
                          )}
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {session.scheduledDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {session.scheduledTime} ({session.duration})
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {session.participants}/{session.maxParticipants}{" "}
                              participants
                            </span>
                            {meetLink && (
                              <button
                                className="inline-flex items-center gap-1 text-indigo-600 underline"
                                onClick={() => window.open(meetLink, "_blank")}
                              >
                                <LinkIcon className="h-4 w-4" />
                                Google Meet
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                        {user?.role === "trainer" &&
                          session.status === "scheduled" && (
                            <Button
                              onClick={() => handleStartSession(session.id)}
                              className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                            >
                              <Play className="h-4 w-4" />
                              Start Session
                            </Button>
                          )}
                        {session.status === "live" && meetLink && (
                          <Button
                            onClick={() => window.open(meetLink, "_blank")}
                            className="gap-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Join Live Session
                          </Button>
                        )}
                        {session.status === "scheduled" && (
                          <Button
                            variant="outline"
                            onClick={() => handleJoinSession(session.id)}
                            className="gap-2 rounded-xl"
                          >
                            <LinkIcon className="h-4 w-4" />
                            Get Google Meet Link
                          </Button>
                        )}
                        {session.status === "scheduled" &&
                          user?.role === "trainer" && (
                            <Button
                              variant="outline"
                              className="gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                              onClick={() =>
                                toast({
                                  title: "Session cancelled",
                                  description:
                                    "The session has been cancelled.",
                                })
                              }
                            >
                              <XCircle className="h-4 w-4" />
                              Cancel
                            </Button>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Completed Sessions */}
        {completedSessions.length > 0 && (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Completed Sessions
              </CardTitle>
              <p className="text-sm text-slate-500">
                Past training sessions with recordings and feedback
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedSessions.map((session) => {
                  const module = session.moduleId
                    ? TRAINING_MODULES.find((m) => m.id === session.moduleId)
                    : null;
                  return (
                    <div
                      key={session.id}
                      className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                              <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-lg">
                                {session.title}
                              </h3>
                              {getStatusBadge(session.status)}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">
                            {session.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {session.scheduledDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {session.participants} participants
                            </span>
                            {session.feedbackCount !== undefined && (
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {session.feedbackCount} feedback
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-emerald-200">
                        {session.recordingUrl && (
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl"
                            onClick={() =>
                              window.open(session.recordingUrl, "_blank")
                            }
                          >
                            <Video className="h-4 w-4" />
                            View Recording
                          </Button>
                        )}
                        {session.feedbackCount !== undefined &&
                          session.feedbackCount > 0 && (
                            <Button
                              variant="outline"
                              className="gap-2 rounded-xl"
                            >
                              <MessageSquare className="h-4 w-4" />
                              View Feedback ({session.feedbackCount})
                            </Button>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
}
