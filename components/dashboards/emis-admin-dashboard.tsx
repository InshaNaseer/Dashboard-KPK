"use client"

import type { User } from "@/lib/auth"
import { DEMO_USERS } from "@/lib/auth"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TRAINING_MODULES } from "@/lib/data"
import { Users, BookOpen, Activity, TrendingUp, ShieldCheck, Database } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useState } from "react"

export function EMISAdminDashboard({ user }: { user: User }) {
  const [portalOnline, setPortalOnline] = useState(true)

  const usersByRole = {
    trainees: DEMO_USERS.filter((u) => u.role === "trainee").length,
    trainers: DEMO_USERS.filter((u) => u.role === "trainer").length,
    dpdRpdc: DEMO_USERS.filter((u) => u.role === "dpd_rpdc").length,
    emisAdmin: DEMO_USERS.filter((u) => u.role === "emis_admin").length,
  }

  const weeklyData = [
    { week: "Week 1", users: 85, completions: 32 },
    { week: "Week 2", users: 92, completions: 41 },
    { week: "Week 3", users: 78, completions: 38 },
    { week: "Week 4", users: 87, completions: 45 },
  ]

  return (
    <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
      <header className="rounded-3xl bg-linear-to-r from-[#1a2d4b] via-[#384d84] to-[#6c63ff] px-6 py-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">EMIS control center</p>
            <h1 className="text-3xl font-semibold tracking-tight">Welcome, {user.name}</h1>
            <p className="text-sm opacity-85">Monitor platform health and manage user access in real time.</p>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-white/15 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">Portal status</p>
              <p className="text-lg font-semibold">{portalOnline ? "Online" : "Offline"}</p>
            </div>
            <div className="rounded-2xl bg-white/15 px-4 py-2 text-center">
              <p className="text-xs uppercase text-white/70">Total users</p>
              <p className="text-lg font-semibold">{DEMO_USERS.length}</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">System KPIs</CardTitle>
            <p className="text-sm text-slate-500">Platform-level snapshot (last 30 days).</p>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            {[
              { label: "Total users", value: DEMO_USERS.length, icon: <Users className="h-5 w-5 text-indigo-500" />, helper: "All roles" },
              { label: "Total modules", value: TRAINING_MODULES.length, icon: <BookOpen className="h-5 w-5 text-emerald-500" />, helper: "Published" },
              { label: "Active users", value: 342, icon: <Activity className="h-5 w-5 text-amber-500" />, helper: "Last 30 days" },
              { label: "Portal uptime", value: "99.2%", icon: <TrendingUp className="h-5 w-5 text-pink-500" />, helper: "Rolling avg" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-500 shadow-sm shadow-indigo-50">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-wide text-slate-400">{stat.label}</p>
                  {stat.icon}
                </div>
                <p className="mt-2 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="text-xs">{stat.helper}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-[#1e2337] text-white shadow-xl shadow-indigo-700/20">
          <CardHeader className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-indigo-200">Security watch</p>
            <CardTitle className="text-2xl">Alerts & maintenance</CardTitle>
            <p className="text-sm text-indigo-100">Keep an eye on backup routines and incident queue.</p>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-indigo-100">
            {[
              { title: "Daily backup completed", status: "Today · 02:45 PM", icon: <Database className="h-4 w-4" /> },
              { title: "Incident tickets", status: "0 open", icon: <ShieldCheck className="h-4 w-4" /> },
              { title: "Upcoming maintenance", status: "Dec 03 · 11:00 PM", icon: <TrendingUp className="h-4 w-4" /> },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/20 text-white">{item.icon}</div>
                <div>
                  <p className="text-white">{item.title}</p>
                  <p className="text-xs text-indigo-200">{item.status}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">Users by role</CardTitle>
          <p className="text-sm text-slate-500">Auto-sync with EMIS directory once every hour.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Trainees", value: usersByRole.trainees, tone: "bg-indigo-50 text-indigo-700" },
            { label: "Trainers", value: usersByRole.trainers, tone: "bg-emerald-50 text-emerald-700" },
            { label: "DPD / RPDC", value: usersByRole.dpdRpdc, tone: "bg-amber-50 text-amber-700" },
            { label: "EMIS Admin", value: usersByRole.emisAdmin, tone: "bg-slate-100 text-slate-800" },
          ].map((role) => (
            <div key={role.label} className={`rounded-3xl border border-slate-200 px-4 py-5 text-center text-sm font-semibold ${role.tone}`}>
              <p className="text-3xl">{role.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wide">{role.label}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Weekly active users & completions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-muted-foreground)" />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: `1px solid var(--color-border)`,
                    borderRadius: "12px",
                    color: "var(--color-foreground)",
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="var(--color-primary)" strokeWidth={2} dot={{ fill: "var(--color-primary)" }} name="Active users" />
                <Line
                  type="monotone"
                  dataKey="completions"
                  stroke="var(--color-accent)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-accent)" }}
                  name="Completions"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900">Portal management</CardTitle>
            <p className="text-sm text-slate-500">Controls for uptime and notification policies.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">Portal status</p>
                <p className="text-xs text-slate-500">Toggle public access</p>
              </div>
              <button
                onClick={() => setPortalOnline(!portalOnline)}
                className={`rounded-full px-4 py-1 text-sm font-semibold transition ${
                  portalOnline ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-600"
                }`}
              >
                {portalOnline ? "Online" : "Offline"}
              </button>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">System settings</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Database backup: Auto-enabled</li>
                <li>• User notifications: Active</li>
                <li>• Last health check: Today, 2:45 PM</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">System users</CardTitle>
          <p className="text-sm text-slate-500">Full roster with current status.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {DEMO_USERS.map((u) => (
            <div key={u.id} className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-600 shadow-sm shadow-indigo-50 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-3">
                <span className="text-2xl">{u.avatar}</span>
                <div>
                  <p className="text-base font-semibold text-slate-900">{u.name}</p>
                  <p className="text-xs text-slate-500">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="rounded-full bg-indigo-100 text-indigo-600">{u.role.replace("_", " ")}</Badge>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">Active</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
