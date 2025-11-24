"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth-context";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  MessageSquare,
  HelpCircle,
  Settings,
  BarChart3,
  CheckCircle2,
  Trophy,
  LogOut,
  Video,
  Award,
  Users,
  Wrench,
  FileText,
  CalendarCheck,
  ClipboardCheck,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles: string[];
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ["trainee", "trainer", "dpd_rpdc", "dpd_admin", "emis_admin"],
  },
  {
    label: "Training Library",
    href: "/training-library",
    icon: <BookOpen className="w-5 h-5" />,
    roles: ["trainee", "trainer", "dpd_rpdc", "dpd_admin"],
  },
  {
    label: "My Progress",
    href: "/progress",
    icon: <CheckCircle2 className="w-5 h-5" />,
    roles: ["trainee"],
  },
  {
    label: "Achievements",
    href: "/achievements",
    icon: <Trophy className="w-5 h-5" />,
    roles: ["trainee"],
  },
  {
    label: "Discussions",
    href: "/discussions",
    icon: <MessageSquare className="w-5 h-5" />,
    roles: ["trainee"],
  },
  {
    label: "Certificates",
    href: "/certificates",
    icon: <Award className="w-5 h-5" />,
    roles: ["trainee"],
  },
  {
    label: "Training Delivery",
    href: "/training-delivery",
    icon: <Video className="w-5 h-5" />,
    roles: ["trainer", "dpd_rpdc"],
  },
  {
    label: "Live Sessions",
    href: "/live-sessions",
    icon: <Video className="w-5 h-5" />,
    roles: ["trainer", "dpd_rpdc"],
  },
  {
    label: "Trainee Progress",
    href: "/trainee-progress",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["trainer", "dpd_rpdc", "dpd_admin"],
  },
  {
    label: "Content Management",
    href: "/content-management",
    icon: <TrendingUp className="w-5 h-5" />,
    roles: ["dpd_rpdc", "dpd_admin"],
  },
  {
    label: "Content Approval",
    href: "/content-review",
    icon: <CheckCircle2 className="w-5 h-5" />,
    roles: ["dpd_admin"],
  },
  {
    label: "Content Review",
    href: "/content-review",
    icon: <CheckCircle2 className="w-5 h-5" />,
    roles: ["dpd_rpdc"],
  },
  {
    label: "Content Tracking",
    href: "/content-tracking",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["dpd_rpdc", "dpd_admin"],
  },
  {
    label: "Attendance",
    href: "/attendance",
    icon: <CalendarCheck className="w-5 h-5" />,
    roles: ["dpd_rpdc", "dpd_admin"],
  },
  {
    label: "Assignments",
    href: "/assignments",
    icon: <ClipboardCheck className="w-5 h-5" />,
    roles: ["dpd_rpdc", "dpd_admin", "trainer"],
  },
  {
    label: "User Management",
    href: "/user-management",
    icon: <Users className="w-5 h-5" />,
    roles: ["dpd_admin"],
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["emis_admin"],
  },
  {
    label: "Support & Troubleshooting",
    href: "/support-troubleshooting",
    icon: <Wrench className="w-5 h-5" />,
    roles: ["emis_admin"],
  },
  {
    label: "Feedback Reports",
    href: "/feedback-reports",
    icon: <FileText className="w-5 h-5" />,
    roles: ["dpd_admin", "emis_admin"],
  },
  {
    label: "Feedback",
    href: "/feedback",
    icon: <MessageSquare className="w-5 h-5" />,
    roles: ["trainee", "trainer", "dpd_rpdc", "dpd_admin"],
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["dpd_rpdc", "emis_admin"],
  },
  {
    label: "Help & Manuals",
    href: "/help",
    icon: <HelpCircle className="w-5 h-5" />,
    roles: ["trainee", "trainer", "dpd_rpdc"],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <Settings className="w-5 h-5" />,
    roles: ["emis_admin"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const visibleItems = NAV_ITEMS.filter(
    (item) => user && item.roles.includes(user.role)
  );

  return (
    <aside className="sticky top-0 flex min-h-screen w-64 flex-col border-r border-border bg-sidebar">
      <nav className="flex-1 space-y-2 p-4">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
              pathname === item.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="border-t border-border px-4 py-4">
        <button
          onClick={logout}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-sidebar-accent/30 px-3 py-2 text-sm font-semibold text-sidebar-foreground transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
