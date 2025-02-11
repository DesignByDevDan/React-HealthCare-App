"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Healthcare Platform</h1>
      <p className="text-lg text-muted-foreground">
        Manage your medical records, appointments, and messages securely.
      </p>
      <div className="flex space-x-4">
        <Link href="/register">
          <Button>Register</Button>
        </Link>
        <Link href="/login">
          <Button variant="outline">Login</Button>
        </Link>
      </div>
    </div>
  );
}
