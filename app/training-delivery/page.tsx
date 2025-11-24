"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-context";

export default function TrainingDeliveryPage() {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="space-y-8 rounded-[32px] bg-[#f6f7fb] p-4 sm:p-6">
        <Card className="rounded-3xl border-0 bg-white shadow-lg shadow-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">
              Training Delivery Has Moved
            </CardTitle>
            <p className="text-sm text-slate-500">
              All planning and delivery workflows now live inside the Training
              Library.
            </p>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-slate-600 text-lg">
              Hi {user?.name || "there"}, this page has been retired to keep
              navigation simple. Please use the Training Library to browse,
              plan, and deliver modules.
            </p>
            <Button
              className="rounded-full"
              onClick={() => {
                window.location.href = "/training-library";
              }}
            >
              Go to Training Library
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
