"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertTriangle, Lock } from "lucide-react";

type Status = "yes" | "full" | "no" | "limited" | "final" | "management";

const matrix: {
  feature: string;
  dpdStaff: Status;
  dpdAdmin: Status;
  note?: string;
}[] = [
  {
    feature: "Upload/Edit Content",
    dpdStaff: "yes",
    dpdAdmin: "full",
    note: "DPD Admin can override or publish",
  },
  {
    feature: "Approve Content",
    dpdStaff: "yes",
    dpdAdmin: "final",
    note: "Admin only needed for escalations",
  },
  { feature: "Create/Delete Users", dpdStaff: "no", dpdAdmin: "full" },
  { feature: "Assign Roles", dpdStaff: "no", dpdAdmin: "full" },
  { feature: "Manage System Settings", dpdStaff: "no", dpdAdmin: "full" },
  {
    feature: "Debugging / Support",
    dpdStaff: "no",
    dpdAdmin: "limited",
    note: "Escalates to EMIS technical team",
  },
  {
    feature: "Access Analytics Reports",
    dpdStaff: "limited",
    dpdAdmin: "no",
    note: "Analytics handled centrally by EMIS",
  },
  {
    feature: "IT Resources & Asset Access",
    dpdStaff: "yes",
    dpdAdmin: "management",
  },
  { feature: "Delete Content Permanently", dpdStaff: "no", dpdAdmin: "full" },
];

function renderStatus(status: Status, role: "staff" | "admin") {
  switch (status) {
    case "yes":
      return (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
          <Check className="h-4 w-4" /> Yes
        </span>
      );
    case "full":
      return (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
          <Check className="h-4 w-4" />{" "}
          {role === "admin" ? "Yes (full control)" : "Yes"}
        </span>
      );
    case "final":
      return (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
          <AlertTriangle className="h-4 w-4" /> Final publishing only
        </span>
      );
    case "limited":
      return (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-500">
          <AlertTriangle className="h-4 w-4" /> Limited (content only)
        </span>
      );
    case "management":
      return (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
          <Lock className="h-4 w-4" /> Management level
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-rose-500">
          <X className="h-4 w-4" /> No
        </span>
      );
  }
}

export function AuthorityAccessCard() {
  return (
    <Card className="rounded-3xl border-0 bg-white shadow-md shadow-indigo-100">
      <CardHeader className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Lock className="h-4 w-4 text-slate-400" />
          Authority & Access
        </div>
        <CardTitle className="text-2xl text-slate-900">
          DPD Staff vs DPD Admin
        </CardTitle>
        <p className="text-sm text-slate-500">
          Clear visibility into who can upload content versus who manages the
          overall system.
        </p>
        <Badge className="mt-2 w-fit rounded-full bg-indigo-50 text-indigo-600">
          Role-based controls
        </Badge>
      </CardHeader>
      <CardContent className="overflow-visible">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
              <th className="py-3 pr-4 font-medium">Feature</th>
              <th className="py-3 pr-4 font-medium">DPD/RPDC Staff</th>
              <th className="py-3 font-medium">DPD Admin</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.feature} className="border-t border-slate-100">
                <td className="py-3 pr-4 text-slate-700">
                  <div className="font-semibold text-slate-900">
                    {row.feature}
                  </div>
                  {row.note && (
                    <p className="text-xs text-slate-500">{row.note}</p>
                  )}
                </td>
                <td className="py-3 pr-4">
                  {renderStatus(row.dpdStaff, "staff")}
                </td>
                <td className="py-3">{renderStatus(row.dpdAdmin, "admin")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
