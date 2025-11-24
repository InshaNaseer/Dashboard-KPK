"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth-context";
import {
  TRAINING_MODULES,
  MONTHLY_REPORT,
  MOCK_FEEDBACK,
  TRAINEE_PROGRESS_DATA,
} from "@/lib/data";
import { DEMO_USERS } from "@/lib/auth";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  Download,
  Calendar,
  Target,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

export default function AnalyticsPage() {
  const { user } = useAuth();
  const isAuthorized = user?.role === "emis_admin";

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-16 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to analytics. Only EMIS administrators
                can access this section.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const weeklyData = MONTHLY_REPORT.weeklyData;
  const totalUsers = DEMO_USERS.length;
  const activeUsers = MONTHLY_REPORT.totalActiveUsers;
  const completedModules = MONTHLY_REPORT.completedModules;
  const avgCompletion = Math.round(
    TRAINEE_PROGRESS_DATA.reduce((sum, t) => sum + t.completionPercentage, 0) /
      TRAINEE_PROGRESS_DATA.length
  );

  const contentEffectiveness = [
    {
      module: "Foundation of Quality Education",
      views: 245,
      completions: 189,
      effectiveness: 77,
    },
    {
      module: "Active Learning Strategies",
      views: 198,
      completions: 156,
      effectiveness: 79,
    },
    {
      module: "Digital Tools in Education",
      views: 223,
      completions: 178,
      effectiveness: 80,
    },
    {
      module: "Student Assessment Methods",
      views: 187,
      completions: 142,
      effectiveness: 76,
    },
  ];

  const userActivityByRole = [
    {
      role: "Trainees",
      active: DEMO_USERS.filter((u) => u.role === "trainee").length * 45,
      total: DEMO_USERS.filter((u) => u.role === "trainee").length,
    },
    {
      role: "Trainers",
      active: DEMO_USERS.filter((u) => u.role === "trainer").length * 8,
      total: DEMO_USERS.filter((u) => u.role === "trainer").length,
    },
    {
      role: "DPD/RPDC",
      active: DEMO_USERS.filter((u) => u.role === "dpd_rpdc").length * 5,
      total: DEMO_USERS.filter((u) => u.role === "dpd_rpdc").length,
    },
  ];

  const systemPerformance = [
    { metric: "Page Load Time", value: 1.2, target: 2.0, unit: "s" },
    { metric: "API Response Time", value: 150, target: 200, unit: "ms" },
    { metric: "Uptime", value: 99.2, target: 99.0, unit: "%" },
    { metric: "Error Rate", value: 0.1, target: 0.5, unit: "%" },
  ];

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <header className="rounded-3xl bg-linear-to-r from-[#0d436d] via-[#2367a7] to-[#5f3df7] px-6 py-5 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
                <BarChart3 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Analytics Dashboard
                </h1>
                <p className="text-sm opacity-90">
                  Reports on user activity, content effectiveness, and system
                  performance
                </p>
              </div>
            </div>
            <Button
              variant="secondary"
              className="rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-white/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </header>

        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Total Users</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {totalUsers}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">All roles</p>
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
                  <p className="text-sm text-slate-500 mb-1">Active Users</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {activeUsers}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Last 30 days</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Activity className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">
                    Modules Completed
                  </p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {completedModules}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">This month</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <CheckCircle2 className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Avg Completion</p>
                  <p className="text-3xl font-semibold text-slate-900">
                    {avgCompletion}%
                  </p>
                  <p className="text-xs text-slate-500 mt-1">Across trainees</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Target className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Activity Chart */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              User Activity Trends
            </CardTitle>
            <p className="text-sm text-slate-500">
              Weekly active users and module completions
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorCompletions"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#6366f1"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Active Users"
                />
                <Area
                  type="monotone"
                  dataKey="completions"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorCompletions)"
                  name="Completions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Effectiveness */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Content Effectiveness
            </CardTitle>
            <p className="text-sm text-slate-500">
              Module views, completions, and effectiveness rates
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={contentEffectiveness}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="module"
                  stroke="#64748b"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="views"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  name="Views"
                />
                <Bar
                  dataKey="completions"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                  name="Completions"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              System Performance
            </CardTitle>
            <p className="text-sm text-slate-500">
              Key performance indicators and targets
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {systemPerformance.map((metric) => {
                const isGood = metric.value <= metric.target;
                return (
                  <div
                    key={metric.metric}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-slate-900">
                        {metric.metric}
                      </span>
                      <Badge
                        className={
                          isGood
                            ? "rounded-full bg-emerald-100 text-emerald-600"
                            : "rounded-full bg-orange-100 text-orange-600"
                        }
                      >
                        {isGood ? "Good" : "Needs Attention"}
                      </Badge>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-semibold text-slate-900">
                        {metric.value}
                      </span>
                      <span className="text-sm text-slate-500">
                        {metric.unit}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-slate-500">
                      Target: {metric.target} {metric.unit}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* User Activity by Role */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              User Activity by Role
            </CardTitle>
            <p className="text-sm text-slate-500">
              Activity levels across different user roles
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userActivityByRole}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="role" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="active"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  name="Active Users"
                />
                <Bar
                  dataKey="total"
                  fill="#94a3b8"
                  radius={[6, 6, 0, 0]}
                  name="Total Users"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
