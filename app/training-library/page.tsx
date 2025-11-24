"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAINING_MODULES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Play, Search, Sparkles, Tag, Zap } from "lucide-react";
import { useAuth } from "@/components/auth-context";

export default function TrainingLibraryPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [selectedPhase, setSelectedPhase] = useState<
    "all" | "phase-1" | "phase-2"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");

  const phases = ["all", "phase-1", "phase-2"] as const;

  const allowedRoles = ["trainee", "trainer", "dpd_rpdc", "dpd_admin"];

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to the training library. Only trainees,
                trainers, DPD/RPDC staff, and the DPD Admin can view training
                modules.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredModules = useMemo(() => {
    const byPhase =
      selectedPhase === "all"
        ? TRAINING_MODULES
        : TRAINING_MODULES.filter((m) => m.phase === selectedPhase);
    if (!searchTerm.trim()) {
      return byPhase;
    }
    return byPhase.filter((module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedPhase, searchTerm]);

  return (
    <MainLayout>
      <div className="space-y-10 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <section className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] p-6 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/80">
                Digital modules
              </p>
              <h1 className="text-4xl font-semibold tracking-tight">
                Training library
              </h1>
              <p className="mt-2 text-sm opacity-85">
                Curated lessons, simulations, and guides tailored to your
                learning plan.
              </p>
              <div className="mt-4 flex gap-3 text-sm">
                <div className="rounded-2xl bg-white/15 px-4 py-2 text-center">
                  <p className="text-xs uppercase text-white/70">Phase 1</p>
                  <p className="text-lg font-semibold">
                    {
                      TRAINING_MODULES.filter((m) => m.phase === "phase-1")
                        .length
                    }{" "}
                    modules
                  </p>
                </div>
                <div className="rounded-2xl bg-white/15 px-4 py-2 text-center">
                  <p className="text-xs uppercase text-white/70">Phase 2</p>
                  <p className="text-lg font-semibold">
                    {
                      TRAINING_MODULES.filter((m) => m.phase === "phase-2")
                        .length
                    }{" "}
                    modules
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-48 w-64 overflow-hidden rounded-3xl bg-white/10 shadow-lg">
              <Image
                src="/digital-education-tools.jpg"
                alt="Training library hero"
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle className="text-2xl text-slate-900">
                  Discover modules
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Mix of live recordings, simulations, and on-demand videos.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <div className="flex flex-1 items-center rounded-full border border-slate-200 bg-slate-50 px-3">
                  <Search className="h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search modules"
                    className="border-none bg-transparent text-sm focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {phases.map((phase) => (
                    <Button
                      key={phase}
                      onClick={() => setSelectedPhase(phase)}
                      variant={selectedPhase === phase ? "default" : "outline"}
                      className={`rounded-full px-4 capitalize ${
                        selectedPhase === phase
                          ? "bg-[#5f3df7] text-white hover:bg-[#4b2ed4]"
                          : ""
                      }`}
                    >
                      {phase === "all" ? "All" : phase.replace("-", " ")}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {filteredModules.map((module) => (
                  <div
                    key={module.id}
                    className="group flex cursor-pointer flex-col rounded-3xl border border-slate-100 bg-slate-50/80 p-5 text-sm text-slate-600 shadow-sm shadow-indigo-50 transition hover:border-indigo-200 hover:bg-white"
                    onClick={() =>
                      router.push(`/training-library/${module.id}`)
                    }
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Badge className="mb-3 rounded-full bg-[#f3e8ff] text-[#7c3aed]">
                          {module.phase.replace("-", " ")}
                        </Badge>
                        <h3 className="text-xl font-semibold text-slate-900">
                          {module.title}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">
                          {module.type.replace("-", " ")}
                        </p>
                      </div>
                      <Tag className="h-5 w-5 text-indigo-400" />
                    </div>
                    <p className="mt-3 text-sm text-slate-500 line-clamp-2">
                      {module.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                      <span className="rounded-full bg-white px-3 py-1 text-slate-600">
                        {module.duration}
                      </span>
                      {module.badge && (
                        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
                          {module.badge}
                        </span>
                      )}
                      {module.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-indigo-100 px-3 py-1 text-indigo-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Sparkles className="h-4 w-4 text-indigo-400" />
                        AI picks for you
                      </div>
                      <Button
                        onClick={() => {
                          router.push(`/training-library/${module.id}`);
                          toast({
                            title: "Opening module",
                            description: `Loading ${module.title}...`,
                          });
                        }}
                        className="rounded-full bg-[#5f3df7] px-5 text-sm font-semibold text-white shadow-md transition hover:bg-[#4b2ed4]"
                      >
                        View module
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              {filteredModules.length === 0 && (
                <div className="mt-6 rounded-3xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  No modules found for this filter, try another combination.
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardHeader>
                <CardTitle className="text-xl text-slate-900">
                  My picks
                </CardTitle>
                <p className="text-sm text-slate-500">
                  Continue where you left off
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {TRAINING_MODULES.slice(0, 3).map((module) => (
                  <div
                    key={module.id}
                    className="rounded-2xl border border-slate-100 p-4 text-sm text-slate-600"
                  >
                    <p className="text-base font-semibold text-slate-900">
                      {module.title}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                      {module.phase.replace("-", " ")}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{module.duration}</span>
                      <Button
                        variant="ghost"
                        className="rounded-full text-indigo-600 hover:bg-indigo-50"
                        onClick={() =>
                          router.push(`/training-library/${module.id}`)
                        }
                      >
                        Resume
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
              <CardHeader className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-indigo-200">
                  Skill booster
                </p>
                <CardTitle className="text-2xl">Hand-picked bundle</CardTitle>
                <p className="text-sm text-indigo-100">
                  Complete these modules to unlock +60 points.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl bg-white/10 p-3 text-sm text-indigo-100">
                  <div className="flex items-center gap-3">
                    <Zap className="h-5 w-5 text-yellow-300" />
                    <div>
                      <p className="text-white">Digital mastery path</p>
                      <p className="text-xs text-indigo-200">
                        3 modules • 2 hrs total
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-indigo-100">
                  <div className="flex items-center justify-between">
                    <span>Completion progress</span>
                    <span>40%</span>
                  </div>
                  <Progress value={40} className="h-2 bg-white/20" />
                </div>
                <Button
                  className="w-full rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
                  onClick={() => router.push("/training-library/3")}
                >
                  Start bundle
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
