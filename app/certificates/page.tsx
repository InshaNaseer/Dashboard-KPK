"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";
import { CERTIFICATES, TRAINING_MODULES } from "@/lib/data";
import { Award, Download, CheckCircle2, FileText } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function CertificatesPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  if (user?.role !== "trainee") {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                Only trainees can access certificates
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const userCertificates = CERTIFICATES.filter((c) => c.traineeId === user.id);

  const handleDownload = (certificateId: string) => {
    toast({
      title: "Download started",
      description: "Your certificate is being downloaded.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                My Certificates
              </h1>
              <p className="text-sm opacity-90">
                Track your learning achievements and download certificates
              </p>
            </div>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Total Certificates
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {userCertificates.length}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Award className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Module Certificates
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {
                      userCertificates.filter(
                        (c) => c.certificateType === "module"
                      ).length
                    }
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Phase Certificates
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {
                      userCertificates.filter(
                        (c) => c.certificateType === "phase"
                      ).length
                    }
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates List */}
        {userCertificates.length === 0 ? (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <Award className="h-16 w-16 mx-auto mb-4 text-slate-300" />
              <p className="text-slate-600 text-lg mb-2">No certificates yet</p>
              <p className="text-sm text-slate-500 mb-4">
                Complete modules and quizzes to earn certificates
              </p>
              <Link href="/training-library">
                <Button className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white">
                  <FileText className="h-4 w-4" />
                  Browse Modules
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {userCertificates.map((certificate) => {
              const module = certificate.moduleId
                ? TRAINING_MODULES.find((m) => m.id === certificate.moduleId)
                : null;
              return (
                <Card
                  key={certificate.id}
                  className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100 overflow-hidden"
                >
                  <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="h-12 w-12" />
                      <div className="text-right">
                        <p className="text-xs opacity-90">Certificate No.</p>
                        <p className="text-sm font-semibold">
                          {certificate.certificateNumber}
                        </p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {certificate.certificateType === "module" &&
                      certificate.moduleTitle
                        ? certificate.moduleTitle
                        : certificate.certificateType === "phase"
                        ? "Phase Completion Certificate"
                        : "Training Completion Certificate"}
                    </h3>
                    <p className="text-sm opacity-90">
                      Issued to {certificate.traineeName}
                    </p>
                  </div>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Issued Date</span>
                        <span className="font-semibold text-slate-900">
                          {certificate.issuedDate}
                        </span>
                      </div>
                      {module && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Module</span>
                          <Link href={`/training-library/${module.id}`}>
                            <span className="font-semibold text-indigo-600 hover:underline">
                              {module.title}
                            </span>
                          </Link>
                        </div>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Type</span>
                        <span className="font-semibold text-slate-900 capitalize">
                          {certificate.certificateType}
                        </span>
                      </div>
                      <div className="pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleDownload(certificate.id)}
                          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition"
                        >
                          <Download className="h-4 w-4" />
                          Download Certificate
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
