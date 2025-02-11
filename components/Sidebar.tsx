// app/components/Sidebar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-white dark:bg-gray-800 p-6 border-r border-gray-300 dark:border-gray-700 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Navigation</h2>
      <nav className="flex flex-col space-y-3">
        <Link href="/dashboard" className="w-full">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
        </Link>
        <Link href="/appointments" className="w-full">
          <Button variant="ghost" className="w-full justify-start">
            Appointments
          </Button>
        </Link>
        <Link href="/medical-records" className="w-full">
          <Button variant="ghost" className="w-full justify-start">
            Medical Records
          </Button>
        </Link>
        <Link href="/messages" className="w-full">
          <Button variant="ghost" className="w-full justify-start">
            Messages
          </Button>
        </Link>
        <Button variant="destructive" className="w-full justify-start mt-auto">
          Logout
        </Button>
      </nav>
    </aside>
  );
}
