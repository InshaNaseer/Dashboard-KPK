"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/auth-context";
import { TRAINING_MODULES } from "@/lib/data";
import {
  Upload,
  FileVideo,
  FileText,
  Image,
  Plus,
  Edit,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function ContentManagementPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthorized = user?.role === "dpd_rpdc" || user?.role === "dpd_admin";
  const canEdit = user?.role === "dpd_rpdc" || user?.role === "dpd_admin";
  const canDelete = user?.role === "dpd_admin";
  const [searchTerm, setSearchTerm] = useState("");
  const [modules] = useState(TRAINING_MODULES);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"video" | "document" | "image">(
    "video"
  );
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "",
    notes: "",
  });
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);
  const [moduleForm, setModuleForm] = useState({
    title: "",
    phase: "phase-1",
    type: "video",
    duration: "",
    description: "",
  });

  const filteredModules = modules.filter(
    (module) =>
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (moduleId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this module? This action cannot be undone."
      )
    ) {
      toast({
        title: "Module deleted",
        description: "The training module has been removed from the system.",
      });
    }
  };

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to content management. Only DPD/RPDC
                staff and the DPD Admin can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#4b3be0] via-[#7846ff] to-[#9c4bff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Content Management
              </h1>
              <p className="text-sm opacity-90">
                Create and manage training modules
              </p>
              <p className="text-xs opacity-80 mt-1">
                {user?.role === "dpd_rpdc"
                  ? "DPD/RPDC staff can upload, edit, and keep IT assets updated. Permanent deletion is restricted."
                  : "DPD Admin has full control, including final publishing and permanent deletions."}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upload Content */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                  <Upload className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Upload Content
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Add new training materials and IT resources
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Button
                  className="w-full gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={() => {
                    setUploadType("video");
                    setUploadDialogOpen(true);
                  }}
                >
                  <FileVideo className="h-4 w-4" />
                  Upload Video
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl border-slate-200 hover:bg-slate-50"
                  onClick={() => {
                    setUploadType("document");
                    setUploadDialogOpen(true);
                  }}
                >
                  <FileText className="h-4 w-4" />
                  Upload Document
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 rounded-xl border-slate-200 hover:bg-slate-50"
                  onClick={() => {
                    setUploadType("image");
                    setUploadDialogOpen(true);
                  }}
                >
                  <Image className="h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Create Module */}
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100">
                  <Plus className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    Create Module
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Build new training modules aligned with SNC
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-600">
                Create comprehensive training modules aligned with the Single
                National Curriculum. Add videos, documents, and interactive
                content.
              </p>
              <Button
                className="w-full gap-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => setModuleDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                New Module
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Manage Existing Content - Admin Access */}
        {canEdit && (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold text-slate-900">
                    Manage Training Materials
                  </CardTitle>
                  <p className="text-sm text-slate-500">
                    Edit, update, or remove existing training modules
                  </p>
                </div>
                <div className="flex-1 max-w-md">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search modules..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredModules.length === 0 ? (
                  <div className="text-center py-8 text-slate-500">
                    No modules found
                  </div>
                ) : (
                  filteredModules.map((module) => (
                    <div
                      key={module.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900 text-lg">
                              {module.title}
                            </h3>
                            {module.reviewStatus && (
                              <Badge
                                className={
                                  module.reviewStatus === "approved"
                                    ? "rounded-full bg-emerald-100 text-emerald-600"
                                    : module.reviewStatus === "pending"
                                    ? "rounded-full bg-amber-100 text-amber-600"
                                    : module.reviewStatus === "needs-revision"
                                    ? "rounded-full bg-orange-100 text-orange-600"
                                    : "rounded-full bg-blue-100 text-blue-600"
                                }
                              >
                                {module.reviewStatus.replace("-", " ")}
                              </Badge>
                            )}
                            {module.curriculumAlignment && (
                              <Badge
                                className={
                                  module.curriculumAlignment === "aligned"
                                    ? "rounded-full bg-emerald-100 text-emerald-600"
                                    : "rounded-full bg-amber-100 text-amber-600"
                                }
                              >
                                SNC:{" "}
                                {module.curriculumAlignment.replace("-", " ")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-slate-600 mb-3">
                            {module.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>{module.duration}</span>
                            <span className="capitalize">
                              {module.type.replace("-", " ")}
                            </span>
                            <span className="capitalize">
                              {module.phase.replace("-", " ")}
                            </span>
                            {module.itResourcesAvailable !== undefined && (
                              <span
                                className={`flex items-center gap-1 ${
                                  module.itResourcesAvailable
                                    ? "text-emerald-600"
                                    : "text-red-600"
                                }`}
                              >
                                {module.itResourcesAvailable ? (
                                  <CheckCircle2 className="h-4 w-4" />
                                ) : (
                                  <AlertCircle className="h-4 w-4" />
                                )}
                                IT Resources
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                        <Link href={`/training-library/${module.id}`}>
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl"
                          >
                            View
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="gap-2 rounded-xl border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                          onClick={() =>
                            toast({
                              title: "Edit Module",
                              description: `Editing module: ${module.title}`,
                            })
                          }
                        >
                          <Edit className="h-4 w-4" />
                          Edit
                        </Button>
                        {canDelete && (
                          <Button
                            variant="outline"
                            className="gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                            onClick={() => handleDelete(module.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Guidelines */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">
              Content Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              <p>
                Ensure all content aligns with the Single National Curriculum
                standards
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              <p>Provide access to existing training content and materials</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              <p>Facilitate the development of content and videos</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-indigo-600 mt-2" />
              <p>Ensure availability of IT resources and assets</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-900">
              Upload{" "}
              {uploadType === "document"
                ? "Document"
                : uploadType === "image"
                ? "Image"
                : "Video"}
            </DialogTitle>
            <DialogDescription>
              Provide basic metadata and choose a file to simulate the upload
              flow.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Title
              </label>
              <Input
                value={uploadForm.title}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, title: e.target.value })
                }
                placeholder="e.g. Active Learning Workshop"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Category
              </label>
              <Input
                value={uploadForm.category}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, category: e.target.value })
                }
                placeholder="CPD / TIP / ECE"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Notes
              </label>
              <Textarea
                value={uploadForm.notes}
                onChange={(e) =>
                  setUploadForm({ ...uploadForm, notes: e.target.value })
                }
                placeholder="Link to script, alignment notes, or IT requirements"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Choose file
              </label>
              <Input type="file" className="mt-1" />
              <p className="text-xs text-slate-500 mt-1">
                Demo uploads are not persisted; this simulates the workflow
                only.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full rounded-full"
              onClick={() => {
                toast({
                  title: "Upload queued",
                  description: `${
                    uploadForm.title || "Content"
                  } (${uploadType}) submitted for processing.`,
                });
                setUploadForm({ title: "", category: "", notes: "" });
                setUploadDialogOpen(false);
              }}
            >
              Submit Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={moduleDialogOpen} onOpenChange={setModuleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-slate-900">
              Create New Module
            </DialogTitle>
            <DialogDescription>
              Capture the essentials for the new training module.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Module title
              </label>
              <Input
                value={moduleForm.title}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, title: e.target.value })
                }
                placeholder="Classroom Observation Checklist"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Phase
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                value={moduleForm.phase}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, phase: e.target.value })
                }
              >
                <option value="phase-1">Phase 1</option>
                <option value="phase-2">Phase 2</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Type
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600"
                value={moduleForm.type}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, type: e.target.value })
                }
              >
                <option value="video">Video</option>
                <option value="infographic">Infographic</option>
                <option value="simulation">Simulation</option>
                <option value="live-recording">Live recording</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Duration
              </label>
              <Input
                value={moduleForm.duration}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, duration: e.target.value })
                }
                placeholder="e.g. 20 mins"
                className="mt-1"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-slate-700">
                Description
              </label>
              <Textarea
                value={moduleForm.description}
                onChange={(e) =>
                  setModuleForm({ ...moduleForm, description: e.target.value })
                }
                rows={4}
                placeholder="Brief description, learning outcomes, and IT requirements."
                className="mt-1"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              className="w-full rounded-full"
              onClick={() => {
                toast({
                  title: "Module drafted",
                  description: `${
                    moduleForm.title || "Untitled module"
                  } saved to drafts for review.`,
                });
                setModuleForm({
                  title: "",
                  phase: "phase-1",
                  type: "video",
                  duration: "",
                  description: "",
                });
                setModuleDialogOpen(false);
              }}
            >
              Save Draft
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
