"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DEMO_USERS } from "@/lib/auth";

export default function LoginPage() {
  const [selectedEmail, setSelectedEmail] = useState(DEMO_USERS[0].email);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login(selectedEmail);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-border/50">
        <CardHeader className="space-y-3 text-center">
          <div className="text-5xl mb-2">📚</div>
          <CardTitle className="text-3xl">
            KPK Teacher Training Portal
          </CardTitle>
          <CardDescription>
            Digitizing teacher training for Khyber Pakhtunkhwa
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Select Demo User
            </label>
            <select
              value={selectedEmail}
              onChange={(e) => setSelectedEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-input rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {DEMO_USERS.map((user) => (
                <option key={user.email} value={user.email}>
                  {user.name} ({user.role.replace("_", " ")})
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
