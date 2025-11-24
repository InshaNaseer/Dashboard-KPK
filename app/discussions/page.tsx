"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { DISCUSSIONS, TRAINING_MODULES } from "@/lib/data";
import {
  MessageSquare,
  Plus,
  Heart,
  Reply,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

export default function DiscussionsPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const moduleFilter = searchParams.get("module");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({
    title: "",
    content: "",
  });
  const [discussions, setDiscussions] = useState(DISCUSSIONS);

  if (user?.role !== "trainee") {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                Only trainees can access discussions
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredDiscussions = discussions.filter((discussion) => {
    const matchesModule = !moduleFilter || discussion.moduleId === moduleFilter;
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesModule && matchesSearch;
  });

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.content) {
      toast({
        title: "Error",
        description: "Please fill in both title and content",
      });
      return;
    }

    const module = moduleFilter
      ? TRAINING_MODULES.find((m) => m.id === moduleFilter)
      : null;
    const newDiscussionItem = {
      id: String(discussions.length + 1),
      moduleId: moduleFilter || "1",
      moduleTitle: module?.title || "General",
      authorId: user?.id || "",
      authorName: user?.name || "",
      title: newDiscussion.title,
      content: newDiscussion.content,
      createdAt: new Date().toISOString(),
      replies: [],
      likes: 0,
    };

    setDiscussions([newDiscussionItem, ...discussions]);
    setNewDiscussion({ title: "", content: "" });
    setShowNewDiscussion(false);
    toast({
      title: "Discussion created",
      description: "Your discussion has been posted successfully.",
    });
  };

  const handleLike = (discussionId: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === discussionId ? { ...d, likes: d.likes + 1 } : d
      )
    );
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#2f2fad] via-[#5f3df7] to-[#873cff] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <MessageSquare className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Discussions
                </h1>
                <p className="text-sm opacity-90">
                  Participate in discussions, share ideas, and learn from peers
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowNewDiscussion(!showNewDiscussion)}
              className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>
        </header>

        {/* Create New Discussion */}
        {showNewDiscussion && (
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">
                Create New Discussion
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  value={newDiscussion.title}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter discussion title..."
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Content
                </label>
                <Textarea
                  value={newDiscussion.content}
                  onChange={(e) =>
                    setNewDiscussion({
                      ...newDiscussion,
                      content: e.target.value,
                    })
                  }
                  placeholder="Share your thoughts, ask questions, or start a conversation..."
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={handleCreateDiscussion}
                  className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="h-4 w-4" />
                  Post Discussion
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewDiscussion(false);
                    setNewDiscussion({ title: "", content: "" });
                  }}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </CardContent>
        </Card>

        {/* Discussions List */}
        <div className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
              <CardContent className="py-16 text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                <p className="text-slate-600 text-lg mb-2">
                  No discussions found
                </p>
                <p className="text-sm text-slate-500 mb-4">
                  Be the first to start a discussion!
                </p>
                <Button
                  onClick={() => setShowNewDiscussion(true)}
                  className="gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Plus className="h-4 w-4" />
                  Start Discussion
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDiscussions.map((discussion) => {
              const module = TRAINING_MODULES.find(
                (m) => m.id === discussion.moduleId
              );
              return (
                <Card
                  key={discussion.id}
                  className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100"
                >
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {module && (
                              <Link href={`/training-library/${module.id}`}>
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                >
                                  {discussion.moduleTitle}
                                </Badge>
                              </Link>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">
                            {discussion.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-3">
                            {discussion.content}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-slate-500">
                            <span>by {discussion.authorName}</span>
                            <span>•</span>
                            <span>
                              {new Date(
                                discussion.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                        <button
                          onClick={() => handleLike(discussion.id)}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition text-slate-600"
                        >
                          <Heart className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition text-slate-600">
                          <Reply className="h-4 w-4" />
                          <span>{discussion.replies.length} replies</span>
                        </button>
                        {discussion.replies.length > 0 && (
                          <div className="ml-auto">
                            <Button
                              variant="outline"
                              className="gap-2 rounded-xl text-sm"
                            >
                              View Replies
                            </Button>
                          </div>
                        )}
                      </div>
                      {discussion.replies.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-3">
                          {discussion.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className="rounded-xl bg-slate-50 p-4"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <span className="text-sm font-semibold text-slate-900">
                                  {reply.authorName}
                                </span>
                                <span className="text-xs text-slate-500">
                                  {new Date(
                                    reply.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-sm text-slate-600">
                                {reply.content}
                              </p>
                              <button className="flex items-center gap-1 mt-2 text-xs text-slate-500 hover:text-slate-700">
                                <Heart className="h-3 w-3" />
                                <span>{reply.likes}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
}
