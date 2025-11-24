"use client"

import { useAuth } from "@/components/auth-context"
export function Navbar() {
  const { user } = useAuth()

  return (
    <nav className="border-b border-border bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📚</div>
          <h1 className="text-xl font-bold text-foreground">KPK Teacher Training Portal</h1>
        </div>

        {user && (
          <div className="flex items-center gap-2">
            <span className="text-2xl">{user.avatar}</span>
            <div className="text-right text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{user.role.replace("_", " ")}</div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
