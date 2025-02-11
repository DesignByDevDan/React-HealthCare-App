"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAdmin() {
      const { data } = await supabase.auth.getUser();
      if (data?.user && data.user.user_metadata.role === "admin") {
        setAdmin(data.user);
        // Fetch all users for management (assuming a table "users" exists)
        const { data: allUsers, error } = await supabase
          .from("users")
          .select("*");
        if (!error) {
          setUsers(allUsers);
        }
      } else {
        router.push("/admin/login");
      }
    }
    fetchAdmin();
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, {admin?.email}</p>
      <h2 className="mt-6 text-2xl font-semibold">User Management</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <CardHeader>
              <h3 className="text-xl">{user.email}</h3>
            </CardHeader>
            <CardContent>
              <p>Role: {user.user_metadata.role}</p>
              <Button variant="outline">Manage</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        variant="destructive"
        className="mt-6"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/admin/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
