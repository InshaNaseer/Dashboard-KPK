"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/components/auth-context";
import {
  TRAINER_ASSIGNMENTS,
  TRAINING_MODULES,
  type TrainerAssignment,
} from "@/lib/data";
import { DEMO_USERS, type User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertTriangle,
  Calendar,
  ClipboardList,
  Filter,
  User as UserIcon,
} from "lucide-react";

const STATUS_OPTIONS = ["All statuses", "pending", "in-progress", "completed"];
const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-emerald-100 text-emerald-700",
};

export default function AssignmentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const authorizedRoles: Array<User["role"]> = [
    "dpd_rpdc",
    "dpd_admin",
    "trainer",
  ];

  if (!user || !authorizedRoles.includes(user.role)) {
    return (
      <MainLayout>
        <div className="flex min-h-[60vh] items-center justify-center rounded-[32px] bg-[#f6f7fb] p-6 text-center">
          <Card className="max-w-lg border-0 bg-white p-8 shadow-md shadow-indigo-100">
            <CardTitle className="text-xl text-slate-900">
              Assignments module restricted
            </CardTitle>
            <p className="mt-3 text-sm text-slate-600">
              Only trainers and DPD/RPDC staff can view assignment workflows.
            </p>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const canAssign = user.role === "dpd_rpdc" || user.role === "dpd_admin";
  const trainerOptions = DEMO_USERS.filter(
    (demoUser) => demoUser.role === "trainer"
  );

  const [assignments, setAssignments] =
    useState<TrainerAssignment[]>(TRAINER_ASSIGNMENTS);
  const [statusFilter, setStatusFilter] = useState<string>(STATUS_OPTIONS[0]);
  const [trainerFilter, setTrainerFilter] = useState<string>("All trainers");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formState, setFormState] = useState({
    title: "",
    trainerId: trainerOptions[0]?.id ?? "",
    description: "",
    moduleId: "",
    dueDate: "",
    priority: "medium",
    supportNeeded: "",
  });

  const visibleAssignments = useMemo(() => {
    return assignments
      .filter((assignment) => {
        const matchesStatus =
          statusFilter === STATUS_OPTIONS[0] ||
          assignment.status === statusFilter;
        const matchesTrainer =
          trainerFilter === "All trainers" ||
          assignment.trainerId === trainerFilter;
        const matchesSearch =
          assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assignment.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        return matchesStatus && matchesTrainer && matchesSearch;
      })
      .sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
  }, [assignments, statusFilter, trainerFilter, searchTerm]);

  const stats = useMemo(() => {
    const open = assignments.filter((a) => a.status !== "completed").length;
    const urgent = assignments.filter(
      (a) => a.priority === "high" && a.status !== "completed"
    ).length;
    const completed = assignments.filter(
      (a) => a.status === "completed"
    ).length;
    return [
      {
        label: "Open assignments",
        value: open,
        helper: "Need trainer attention",
      },
      { label: "High priority", value: urgent, helper: "Flagged by RPDC" },
      {
        label: "Completed tasks",
        value: completed,
        helper: "Ready to archive",
      },
    ];
  }, [assignments]);

  const handleStatusChange = (
    id: string,
    status: TrainerAssignment["status"]
  ) => {
    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === id
          ? {
              ...assignment,
              status,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : assignment
      )
    );
    toast({
      title: "Assignment updated",
      description: `Status changed to ${status}.`,
    });
  };

  const handleCreateAssignment = () => {
    if (!canAssign) return;
    if (!formState.title || !formState.trainerId || !formState.dueDate) {
      toast({
        title: "Missing details",
        description: "Please fill title, trainer, and due date.",
        variant: "destructive",
      });
      return;
    }
    const trainer = trainerOptions.find((t) => t.id === formState.trainerId);
    const module = TRAINING_MODULES.find((m) => m.id === formState.moduleId);
    const newAssignment: TrainerAssignment = {
      id: `assign-${Date.now()}`,
      title: formState.title,
      description: formState.description || "No description provided.",
      trainerId: formState.trainerId,
      trainerName: trainer?.name || "Trainer",
      moduleId: formState.moduleId || undefined,
      moduleTitle: module?.title,
      dueDate: formState.dueDate,
      priority: formState.priority as TrainerAssignment["priority"],
      status: "pending",
      requestedBy: user.name,
      rpdcCenter:
        user.role === "dpd_admin" ? "Central DPD" : "District RPDC Assignment",
      supportNeeded: formState.supportNeeded || undefined,
      lastUpdated: new Date().toISOString().split("T")[0],
    };
    setAssignments((prev) => [newAssignment, ...prev]);
    setIsDialogOpen(false);
    setFormState({
      title: "",
      trainerId: trainerOptions[0]?.id ?? "",
      description: "",
      moduleId: "",
      dueDate: "",
      priority: "medium",
      supportNeeded: "",
    });
    toast({
      title: "Assignment created",
      description: "Trainer has been notified about the new task.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#14365c] via-[#1d4c86] to-[#6747d7] px-6 py-5 text-white shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-white/80">
                DPD/RPDC → Trainer workflow
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                Assignment tracker
              </h1>
              <p className="text-sm opacity-85">
                Manage district instructions, training deliverables, and trainer
                follow-ups with a single view.
              </p>
            </div>
            {canAssign && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-full bg-white text-[#14365c] hover:bg-white/90">
                    + Assign work
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-slate-900">
                      Assign work to a trainer
                    </DialogTitle>
                    <DialogDescription>
                      Capture the key deliverables, ownership, and due dates.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Title
                      </label>
                      <Input
                        className="mt-1"
                        value={formState.title}
                        onChange={(e) =>
                          setFormState({ ...formState, title: e.target.value })
                        }
                        placeholder="e.g. Facilitate Active Learning pilot"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Trainer
                      </label>
                      <select
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                        value={formState.trainerId}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            trainerId: e.target.value,
                          })
                        }
                      >
                        {trainerOptions.map((trainer) => (
                          <option key={trainer.id} value={trainer.id}>
                            {trainer.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Module (optional)
                      </label>
                      <select
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                        value={formState.moduleId}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            moduleId: e.target.value,
                          })
                        }
                      >
                        <option value="">Not linked</option>
                        {TRAINING_MODULES.map((module) => (
                          <option key={module.id} value={module.id}>
                            {module.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Due date
                      </label>
                      <Input
                        type="date"
                        className="mt-1"
                        value={formState.dueDate}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            dueDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Priority
                      </label>
                      <select
                        className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                        value={formState.priority}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            priority: e.target.value,
                          })
                        }
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Description
                      </label>
                      <Textarea
                        rows={3}
                        className="mt-1"
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          })
                        }
                        placeholder="What outcome is needed?"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-semibold text-slate-700">
                        Support needed (optional)
                      </label>
                      <Textarea
                        rows={2}
                        className="mt-1"
                        value={formState.supportNeeded}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            supportNeeded: e.target.value,
                          })
                        }
                        placeholder="IT kit, transport, access, etc."
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="rounded-full"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateAssignment}
                      className="rounded-full bg-indigo-600 hover:bg-indigo-700"
                    >
                      Save assignment
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card
              key={stat.label}
              className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100"
            >
              <CardContent className="p-6">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-semibold text-slate-900 mt-2">
                  {stat.value}
                </p>
                <p className="text-xs text-slate-500">{stat.helper}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Assignment queue
              </CardTitle>
              <p className="text-sm text-slate-500">
                DPD/RPDC instructions issued to trainers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600">
                <Filter className="h-4 w-4 text-slate-400" />
                <select
                  className="bg-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <select
                className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600"
                value={trainerFilter}
                onChange={(e) => setTrainerFilter(e.target.value)}
              >
                <option>All trainers</option>
                {trainerOptions.map((trainer) => (
                  <option key={trainer.id} value={trainer.id}>
                    {trainer.name}
                  </option>
                ))}
              </select>
              <Input
                className="rounded-full"
                placeholder="Search assignment"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {visibleAssignments.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 p-10 text-center text-slate-500">
                <ClipboardList className="h-10 w-10 mb-3 text-slate-300" />
                No assignments match your filters.
              </div>
            ) : (
              visibleAssignments.map((assignment) => {
                const moduleLink = assignment.moduleId
                  ? `/training-library/${assignment.moduleId}`
                  : null;
                const canUpdate =
                  canAssign ||
                  (user.role === "trainer" && user.id === assignment.trainerId);
                return (
                  <div
                    key={assignment.id}
                    className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-sm uppercase text-slate-400">
                          Due {assignment.dueDate}
                        </p>
                        <p className="text-xl font-semibold text-slate-900">
                          {assignment.title}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="rounded-full bg-slate-200 text-slate-700 capitalize">
                          {assignment.status.replace("-", " ")}
                        </Badge>
                        <Badge
                          className={`rounded-full capitalize ${
                            PRIORITY_COLORS[assignment.priority]
                          }`}
                        >
                          {assignment.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      {assignment.description}
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                      <span className="flex items-center gap-1">
                        <UserIcon className="h-4 w-4" />
                        {assignment.trainerName}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {assignment.lastUpdated} • last update
                      </span>
                      <span>{assignment.rpdcCenter}</span>
                      {moduleLink && assignment.moduleTitle && (
                        <Link
                          href={moduleLink}
                          className="text-indigo-600 underline"
                        >
                          {assignment.moduleTitle}
                        </Link>
                      )}
                      {assignment.supportNeeded && (
                        <span className="flex items-center gap-1 text-amber-600">
                          <AlertTriangle className="h-4 w-4" />
                          {assignment.supportNeeded}
                        </span>
                      )}
                    </div>
                    {canUpdate && (
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {assignment.status !== "in-progress" && (
                          <Button
                            variant="outline"
                            className="rounded-full"
                            onClick={() =>
                              handleStatusChange(assignment.id, "in-progress")
                            }
                          >
                            Mark in progress
                          </Button>
                        )}
                        {assignment.status !== "completed" && (
                          <Button
                            className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                            onClick={() =>
                              handleStatusChange(assignment.id, "completed")
                            }
                          >
                            Mark completed
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
