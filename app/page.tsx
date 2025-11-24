"use client"

import { redirect } from "next/navigation"

export default function Home() {
  // Redirect server-side to dashboard
  redirect("/dashboard")
}
