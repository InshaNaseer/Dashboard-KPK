"use client";

import { useMemo, useState } from "react";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/components/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CalendarCheck } from "lucide-react";

const MOCK_ATTENDANCE = [
  {
    id: "att-1",
    module: "Active Learning Strategies",
    date: "2025-11-18",
    sessionType: "Workshop",
    facilitator: "Sania Gul",
    district: "Peshawar",
    totalParticipants: 32,
    present: 29,
    absent: 3,
    status: "Submitted",
  },
  {
    id: "att-2",
    module: "Digital Pedagogy Essentials",
    date: "2025-11-20",
    sessionType: "Live Webinar",
    facilitator: "Haris Khan",
    district: "Swat",
    totalParticipants: 28,
    present: 25,
    absent: 3,
    status: "Pending",
  },
  {
    id: "att-3",
    module: "Assessment for Learning",
    date: "2025-11-21",
    sessionType: "On-site",
    facilitator: "Mahnoor Rehman",
    district: "Mardan",
    totalParticipants: 24,
    present: 24,
    absent: 0,
    status: "Verified",
  },
  {
    id: "att-4",
    module: "Community Engagement Labs",
    date: "2025-11-22",
    sessionType: "Field Visit",
    facilitator: "Asfandyar Ali",
    district: "Abbottabad",
    totalParticipants: 18,
    present: 15,
    absent: 3,
    status: "Submitted",
  },
];

const DISTRICTS = ["All Districts", "Peshawar", "Swat", "Mardan", "Abbottabad"];

export default function AttendancePage() {
  const { user } = useAuth();
  const [districtFilter, setDistrictFilter] = useState(DISTRICTS[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const isAuthorized = user?.role === "dpd_rpdc" || user?.role === "dpd_admin";

  const filteredAttendance = useMemo(() => {
    return MOCK_ATTENDANCE.filter((record) => {
      const matchesDistrict =
        districtFilter === DISTRICTS[0] || record.district === districtFilter;
      const matchesSearch =
        record.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.facilitator.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesDistrict && matchesSearch;
    });
  }, [districtFilter, searchTerm]);

  const totalSessions = filteredAttendance.length;
  const totalPresent = filteredAttendance.reduce(
    (sum, record) => sum + record.present,
    0
  );
  const totalAbsent = filteredAttendance.reduce(
    (sum, record) => sum + record.absent,
    0
  );

  const restrictedView = (
    <div className="flex min-h-[60vh] items-center justify-center rounded-[32px] bg-[#f6f7fb] p-6 text-center">
      <Card className="max-w-lg border-0 bg-white p-8 shadow-md shadow-indigo-100">
        <CardTitle className="text-xl text-slate-900">
          Attendance module is restricted
        </CardTitle>
        <p className="mt-3 text-sm text-slate-600">
          Only DPD/RPDC staff or central DPD admins can manage attendance
          records. Please contact your administrator if you need access.
        </p>
      </Card>
    </div>
  );

  const authorizedView = (
    <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
      <header className="rounded-3xl bg-linear-to-r from-[#1a4d8f] via-[#2165c3] to-[#7a5bff] px-6 py-5 text-white shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-wide text-white/80">
              Attendance & participation
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Attendance tracker
            </h1>
            <p className="text-sm opacity-85">
              Monitor session participation, follow-up on absences, and keep
              RPDC records aligned with SNC deliveries.
            </p>
          </div>
          <Button className="rounded-full bg-white text-[#1a4d8f] hover:bg-white/90">
            Export summary
          </Button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
          <CardContent className="p-6">
            <p className="text-xs uppercase text-slate-400">Total sessions</p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">
              {totalSessions}
            </p>
            <p className="text-xs text-slate-500">
              Filtered by current selections
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-emerald-100">
          <CardContent className="p-6">
            <p className="text-xs uppercase text-slate-400">Present</p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">
              {totalPresent}
            </p>
            <p className="text-xs text-slate-500">Participants marked</p>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 bg-white shadow-md shadow-amber-100">
          <CardContent className="p-6">
            <p className="text-xs uppercase text-slate-400">Absent</p>
            <p className="text-3xl font-semibold text-slate-900 mt-2">
              {totalAbsent}
            </p>
            <p className="text-xs text-slate-500">Follow-ups required</p>
          </CardContent>
        </Card>
      </section>

      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl text-slate-900">
              Attendance logs
            </CardTitle>
            <p className="text-sm text-slate-500">
              Filter by district or search for facilitators/modules.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              placeholder="Search module or facilitator"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48 rounded-full"
            />
            <select
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
            >
              {DISTRICTS.map((district) => (
                <option key={district}>{district}</option>
              ))}
            </select>
            <Button variant="outline" className="rounded-full">
              Add attendance
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredAttendance.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
              No attendance records match your filters.
            </div>
          ) : (
            filteredAttendance.map((record) => (
              <div
                key={record.id}
                className="rounded-2xl border border-slate-200 p-4 lg:grid lg:grid-cols-[1.6fr,1fr,1fr,0.7fr] lg:items-center gap-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {record.module}
                  </p>
                  <p className="text-xs text-slate-500">
                    {record.sessionType} • {record.date}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Facilitator: {record.facilitator}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">District</p>
                  <p className="font-semibold text-slate-900">
                    {record.district}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs uppercase text-slate-400">Present</p>
                    <p className="font-semibold text-emerald-600">
                      {record.present}/{record.totalParticipants}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400">Absent</p>
                    <p className="font-semibold text-amber-600">
                      {record.absent}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Badge
                    className={
                      record.status === "Pending"
                        ? "rounded-full bg-amber-100 text-amber-600"
                        : record.status === "Verified"
                        ? "rounded-full bg-emerald-100 text-emerald-600"
                        : "rounded-full bg-indigo-100 text-indigo-600"
                    }
                  >
                    {record.status}
                  </Badge>
                  <Button variant="outline" size="sm" className="rounded-full">
                    View log
                  </Button>
                  <Button size="sm" className="rounded-full">
                    Update
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
        <CardHeader className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
            <CalendarCheck className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <CardTitle className="text-xl text-slate-900">
              Field follow-up checklist
            </CardTitle>
            <p className="text-sm text-slate-500">
              Quick reminders to keep attendance reporting reliable.
            </p>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            "Capture signatures or digital confirmation for every session.",
            "Log reasons for absences and escalate repeat offenders.",
            "Upload attendance proof (photos/scans) within 24 hours.",
          ].map((tip) => (
            <div
              key={tip}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600"
            >
              {tip}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <MainLayout>{isAuthorized ? authorizedView : restrictedView}</MainLayout>
  );
}
