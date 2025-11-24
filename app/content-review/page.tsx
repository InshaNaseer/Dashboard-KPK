"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { TRAINING_MODULES, CONTENT_REVIEWS } from "@/lib/data";
import {
  FileCheck,
  CheckCircle2,
  XCircle,
  Edit,
  FileText,
  Video,
  Image,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function ContentReviewPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthorized = user?.role === "dpd_rpdc" || user?.role === "dpd_admin";
  const isDpdAdmin = user?.role === "dpd_admin";

  const [reviews, setReviews] = useState(CONTENT_REVIEWS);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to content review. Only DPD/RPDC staff
                and the DPD Admin can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const handleApprove = (reviewId: string) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status: "approved" as const,
              reviewedDate: new Date().toISOString().split("T")[0],
            }
          : r
      )
    );
    toast({
      title: "Content approved",
      description:
        "The content has been approved and is ready for publication.",
    });
  };

  const handleRequestRevision = (reviewId: string) => {
    setReviews(
      reviews.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              status: "needs-revision" as const,
              reviewedDate: new Date().toISOString().split("T")[0],
            }
          : r
      )
    );
    toast({
      title: "Revision requested",
      description: "The content creator has been notified to make revisions.",
    });
  };

  const getReviewIcon = (type: string) => {
    switch (type) {
      case "script":
        return <FileText className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      case "audio-visual":
        return <Image className="h-4 w-4" />;
      default:
        return <FileCheck className="h-4 w-4" />;
    }
  };

  const pendingReviews = reviews.filter((r) => r.status === "pending");
  const needsRevision = reviews.filter((r) => r.status === "needs-revision");
  const approved = reviews.filter((r) => r.status === "approved");

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <FileCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Content Review & Approval
              </h1>
              <p className="text-sm opacity-90">
                Review and approve video scripts, audio-visual materials, and
                training modules
              </p>
              <p className="text-xs opacity-80 mt-1">
                {isDpdAdmin
                  ? "DPD Admin provide final publishing sign-off when escalated."
                  : "DPD/RPDC teams manage day-to-day content reviews and SNC alignment."}
              </p>
            </div>
          </div>
        </header>

        {/* Review Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Pending Reviews</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {pendingReviews.length}
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
                  <p className="text-sm text-slate-500 mb-1">Needs Revision</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {needsRevision.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
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
                    {approved.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Reviews */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Pending Reviews
            </CardTitle>
            <p className="text-sm text-slate-500">
              Review and approve content aligned with Single National Curriculum
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  No pending reviews
                </div>
              ) : (
                pendingReviews.map((review) => {
                  const module = TRAINING_MODULES.find(
                    (m) => m.id === review.moduleId
                  );
                  return (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                              {getReviewIcon(review.reviewType)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-lg">
                                {review.moduleTitle}
                              </h3>
                              <p className="text-sm text-slate-500">
                                Review Type:{" "}
                                {review.reviewType.replace("-", " ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge
                              className={
                                review.curriculumAlignment === "aligned"
                                  ? "rounded-full bg-emerald-100 text-emerald-600"
                                  : review.curriculumAlignment ===
                                    "needs-review"
                                  ? "rounded-full bg-amber-100 text-amber-600"
                                  : "rounded-full bg-red-100 text-red-600"
                              }
                            >
                              SNC:{" "}
                              {review.curriculumAlignment.replace("-", " ")}
                            </Badge>
                            <Badge className="rounded-full bg-blue-100 text-blue-600">
                              Created: {review.createdDate}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-700 mb-4 bg-white p-4 rounded-xl border border-slate-200">
                            {review.feedback}
                          </p>
                          {module && (
                            <div className="text-sm text-slate-600 space-y-1">
                              <p>
                                <span className="font-semibold">
                                  Description:
                                </span>{" "}
                                {module.description}
                              </p>
                              <p>
                                <span className="font-semibold">Duration:</span>{" "}
                                {module.duration}
                              </p>
                              <p>
                                <span className="font-semibold">Phase:</span>{" "}
                                {module.phase.replace("-", " ")}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                        <Button
                          onClick={() => handleApprove(review.id)}
                          className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleRequestRevision(review.id)}
                          variant="outline"
                          className="gap-2 rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50"
                        >
                          <Edit className="h-4 w-4" />
                          Request Revision
                        </Button>
                        <Link href={`/training-library/${review.moduleId}`}>
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl"
                          >
                            View Module
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Needs Revision */}
        {needsRevision.length > 0 && (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Content Requiring Revision
              </CardTitle>
              <p className="text-sm text-slate-500">
                Content that has been flagged for updates
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {needsRevision.map((review) => {
                  const module = TRAINING_MODULES.find(
                    (m) => m.id === review.moduleId
                  );
                  return (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-orange-200 bg-orange-50/30 p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100">
                              {getReviewIcon(review.reviewType)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-lg">
                                {review.moduleTitle}
                              </h3>
                              <p className="text-sm text-slate-500">
                                Review Type:{" "}
                                {review.reviewType.replace("-", " ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="rounded-full bg-orange-100 text-orange-600">
                              Needs Revision
                            </Badge>
                            {review.reviewedDate && (
                              <Badge className="rounded-full bg-blue-100 text-blue-600">
                                Reviewed: {review.reviewedDate}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-700 mb-4 bg-white p-4 rounded-xl border border-slate-200">
                            {review.feedback}
                          </p>
                          {review.revisions && review.revisions.length > 0 && (
                            <div className="mb-4">
                              <p className="text-sm font-semibold text-slate-900 mb-2">
                                Required Revisions:
                              </p>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                {review.revisions.map((rev, idx) => (
                                  <li key={idx}>{rev}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-orange-200">
                        <Link href={`/training-library/${review.moduleId}`}>
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl"
                          >
                            View Module
                          </Button>
                        </Link>
                        <Button
                          onClick={() => handleApprove(review.id)}
                          className="gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Approve After Revision
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Approved Content */}
        {approved.length > 0 && (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Approved Content
              </CardTitle>
              <p className="text-sm text-slate-500">
                Content that has been reviewed and approved
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {approved.map((review) => {
                  const module = TRAINING_MODULES.find(
                    (m) => m.id === review.moduleId
                  );
                  return (
                    <div
                      key={review.id}
                      className="rounded-2xl border border-emerald-200 bg-emerald-50/30 p-6"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
                              {getReviewIcon(review.reviewType)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-900 text-lg">
                                {review.moduleTitle}
                              </h3>
                              <p className="text-sm text-slate-500">
                                Review Type:{" "}
                                {review.reviewType.replace("-", " ")}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="rounded-full bg-emerald-100 text-emerald-600">
                              Approved
                            </Badge>
                            {review.reviewedDate && (
                              <Badge className="rounded-full bg-blue-100 text-blue-600">
                                Reviewed: {review.reviewedDate}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-700 mb-2">
                            {review.feedback}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-emerald-200">
                        <Link href={`/training-library/${review.moduleId}`}>
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl"
                          >
                            View Module
                          </Button>
                        </Link>
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
