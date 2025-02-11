"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { UserIcon, CalendarIcon, MessageSquareIcon, HeartIcon } from "lucide-react";
import Sidebar from "@/components/Sidebar"; // Import the reusable Sidebar component

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        router.push("/login");
      }
    };
    fetchUser();
  }, [router]);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
     
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col items-center">
        <div className="w-full max-w-5xl">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground mb-6">Welcome to your healthcare dashboard.</p>

          {/* MagicUI BentoGrid Layout */}
          <BentoGrid className="mt-6">
            {/* User Profile Card */}
            <BentoCard
              name="Profile"
              className="col-span-3" // Spans all columns if desired
              background={
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-blue-500 to-blue-400" />
              }
              Icon={UserIcon}
              description="View and edit your profile details."
              href="/profile"
              cta="View Profile"
            />

            {/* Appointments Card */}
            <BentoCard
              name="Appointments"
              className="col-span-1"
              background={
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-green-500 to-green-400" />
              }
              Icon={CalendarIcon}
              description="Manage your upcoming appointments."
              href="/appointments"
              cta="View Appointments"
            />

            {/* Messages Card */}
            <BentoCard
              name="Messages"
              className="col-span-1"
              background={
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-purple-500 to-purple-400" />
              }
              Icon={MessageSquareIcon}
              description="Read your recent messages."
              href="/messages"
              cta="View Messages"
            />

            {/* Health Metrics Card */}
            <BentoCard
              name="Health Metrics"
              className="col-span-1"
              background={
                <div className="flex items-center justify-center h-full w-full bg-gradient-to-r from-red-500 to-red-400" />
              }
              Icon={HeartIcon}
              description="View your vital statistics."
              href="/health-stats"
              cta="View Metrics"
            />
          </BentoGrid>
        </div>
      </main>
    </div>
  );
}
