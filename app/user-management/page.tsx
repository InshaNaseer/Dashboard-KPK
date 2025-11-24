"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import { DEMO_USERS } from "@/lib/auth";
import {
  Users,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Mail,
  Shield,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import type { User } from "@/lib/auth";

export default function UserManagementPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAuthorized = user?.role === "dpd_admin";

  const [users, setUsers] = useState(DEMO_USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "trainee" as User["role"],
  });

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to user management. Only the DPD Admin
                can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
      });
      return;
    }

    const userExists = users.find((u) => u.email === newUser.email);
    if (userExists) {
      toast({
        title: "Error",
        description: "A user with this email already exists",
      });
      return;
    }

    const newUserObj: User = {
      id: String(users.length + 1),
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      avatar: "👤",
    };

    setUsers([...users, newUserObj]);
    setNewUser({ name: "", email: "", role: "trainee" });
    setShowCreateModal(false);
    toast({
      title: "User created",
      description: `${newUserObj.name} has been added to the system.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find((u) => u.id === userId);
    if (
      confirm(
        `Are you sure you want to delete ${userToDelete?.name}? This action cannot be undone.`
      )
    ) {
      setUsers(users.filter((u) => u.id !== userId));
      toast({
        title: "User deleted",
        description: `${userToDelete?.name} has been removed from the system.`,
      });
    }
  };

  const handleUpdateRole = (userId: string, newRole: User["role"]) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    const updatedUser = users.find((u) => u.id === userId);
    toast({
      title: "Role updated",
      description: `${
        updatedUser?.name
      }'s role has been changed to ${newRole.replace("_", " ")}.`,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "trainee":
        return "bg-indigo-100 text-indigo-600";
      case "trainer":
        return "bg-emerald-100 text-emerald-600";
      case "dpd_rpdc":
        return "bg-amber-100 text-amber-600";
      case "dpd_admin":
        return "bg-purple-100 text-purple-600";
      case "emis_admin":
        return "bg-slate-100 text-slate-600";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const stats = {
    total: users.length,
    trainees: users.filter((u) => u.role === "trainee").length,
    trainers: users.filter((u) => u.role === "trainer").length,
    dpdRpdc: users.filter((u) => u.role === "dpd_rpdc").length,
    admins: users.filter(
      (u) => u.role === "dpd_admin" || u.role === "emis_admin"
    ).length,
  };

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  User Management
                </h1>
                <p className="text-sm opacity-90">
                  Create, delete, and assign roles to users
                </p>
              </div>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-slate-900 shadow-md transition hover:bg-white"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Create User
            </Button>
          </div>
        </header>

        {/* Statistics */}
        <div className="grid gap-6 md:grid-cols-5">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Users</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.total}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Trainees</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.trainees}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Trainers</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.trainers}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">DPD/RPDC</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.dpdRpdc}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Admins</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {stats.admins}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Create User Modal */}
        {showCreateModal && (
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-slate-900">
                Create New User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  placeholder="Enter user's full name"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="user@kpk.edu"
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-2 block">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      role: e.target.value as User["role"],
                    })
                  }
                  className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="trainee">Trainee</option>
                  <option value="trainer">Trainer</option>
                  <option value="dpd_rpdc">DPD/RPDC Staff</option>
                  <option value="dpd_admin">DPD Admin</option>
                  <option value="emis_admin">EMIS Admin</option>
                </select>
              </div>
              <div className="flex items-center gap-3 pt-4">
                <Button
                  onClick={handleCreateUser}
                  className="flex-1 gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <UserPlus className="h-4 w-4" />
                  Create User
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateModal(false);
                    setNewUser({ name: "", email: "", role: "trainee" });
                  }}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-slate-400" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="all">All Roles</option>
                  <option value="trainee">Trainee</option>
                  <option value="trainer">Trainer</option>
                  <option value="dpd_rpdc">DPD/RPDC</option>
                  <option value="dpd_admin">DPD Admin</option>
                  <option value="emis_admin">EMIS Admin</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              All Users
            </CardTitle>
            <p className="text-sm text-slate-500">
              Manage user accounts and assign roles
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  No users found
                </div>
              ) : (
                filteredUsers.map((userItem) => (
                  <div
                    key={userItem.id}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                          {userItem.avatar || "👤"}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 text-lg mb-1">
                            {userItem.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Mail className="h-4 w-4" />
                            <span>{userItem.email}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`rounded-full ${getRoleBadgeColor(
                          userItem.role
                        )}`}
                      >
                        {userItem.role.replace("_", " ")}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-slate-500 mb-2 block">
                          Change Role
                        </label>
                        <select
                          value={userItem.role}
                          onChange={(e) =>
                            handleUpdateRole(
                              userItem.id,
                              e.target.value as User["role"]
                            )
                          }
                          className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="trainee">Trainee</option>
                          <option value="trainer">Trainer</option>
                          <option value="dpd_rpdc">DPD/RPDC Staff</option>
                          <option value="dpd_admin">DPD Admin</option>
                          <option value="emis_admin">EMIS Admin</option>
                        </select>
                      </div>
                      <Button
                        variant="outline"
                        className="gap-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteUser(userItem.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
