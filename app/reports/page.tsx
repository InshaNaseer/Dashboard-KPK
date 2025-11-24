"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-context"
import { MONTHLY_REPORT } from "@/lib/data"
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
} from "recharts"
import { Download, BarChart3 } from "lucide-react"
import { useState } from "react"

export default function ReportsPage() {
  const { user } = useAuth()
  const [selectedMonth, setSelectedMonth] = useState("November 2025")
  const [downloadMessage, setDownloadMessage] = useState("")

  const isAuthorized = user?.role === "dpd_rpdc" || user?.role === "emis_admin"

  const handleDownloadReport = () => {
    setDownloadMessage("Report download initiated!")
    setTimeout(() => setDownloadMessage(""), 3000)
  }

  if (!isAuthorized) {
    return (
      <MainLayout>
        <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
          <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
            <CardContent className="py-12 text-center">
              <p className="text-slate-600 text-lg">
                You do not have access to reports. Only DPD/RPDC staff and EMIS Admins can view reports.
              </p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        {/* Header */}
        <header className="rounded-3xl bg-linear-to-r from-[#4b3be0] via-[#7846ff] to-[#9c4bff] px-6 py-6 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-3xl font-semibold tracking-tight">Monthly Reports & Analytics</h1>
          </div>
          <p className="text-sm opacity-90 leading-relaxed">
            Track portal usage and training completion metrics
          </p>
        </header>

        {/* Month Selector */}
        <div className="flex flex-wrap gap-4 items-center">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium shadow-sm hover:border-indigo-300 transition-colors"
          >
            <option>November 2025</option>
            <option>October 2025</option>
            <option>September 2025</option>
          </select>
          <Button 
            onClick={handleDownloadReport} 
            className="gap-2 font-medium rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF Report
          </Button>
          {downloadMessage && (
            <div className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium border border-emerald-200">
              {downloadMessage}
            </div>
          )}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Total Active Users (This Month)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{MONTHLY_REPORT.totalActiveUsers}</div>
              <p className="text-xs text-slate-500 mt-2">Unique active users</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide">Modules Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{MONTHLY_REPORT.completedModules}</div>
              <p className="text-xs text-slate-500 mt-2">Total completions</p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100 hover:shadow-lg transition-all">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-500 uppercase tracking-wide">Feedback Resolved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{MONTHLY_REPORT.resolvedFeedback}</div>
              <p className="text-xs text-slate-500 mt-2">Issues addressed</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-slate-900">Weekly Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={MONTHLY_REPORT.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: `1px solid #e2e8f0`,
                    borderRadius: "12px",
                    color: "#1e293b",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#4b3be0"
                  strokeWidth={2}
                  dot={{ fill: "#4b3be0", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-slate-900">Weekly Module Completions</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={MONTHLY_REPORT.weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: `1px solid #e2e8f0`,
                    borderRadius: "12px",
                    color: "#1e293b",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Bar dataKey="completions" fill="#4b3be0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Summary Table */}
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl font-semibold text-slate-900">Monthly Report Snapshot</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Month</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Active Users</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Completions</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900">Issues Resolved</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">{selectedMonth}</td>
                    <td className="py-3 px-4 text-slate-600">{MONTHLY_REPORT.totalActiveUsers}</td>
                    <td className="py-3 px-4 text-slate-600">{MONTHLY_REPORT.completedModules}</td>
                    <td className="py-3 px-4 text-slate-600">{MONTHLY_REPORT.resolvedFeedback}</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-indigo-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">October 2025</td>
                    <td className="py-3 px-4 text-slate-600">298</td>
                    <td className="py-3 px-4 text-slate-600">142</td>
                    <td className="py-3 px-4 text-slate-600">24</td>
                  </tr>
                  <tr className="hover:bg-indigo-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-900">September 2025</td>
                    <td className="py-3 px-4 text-slate-600">276</td>
                    <td className="py-3 px-4 text-slate-600">128</td>
                    <td className="py-3 px-4 text-slate-600">19</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
