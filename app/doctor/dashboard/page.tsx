"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DoctorDashboard() {
  const router = useRouter();
  const [doctor, setDoctor] = useState<any>(null);
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDoctor() {
      const { data } = await supabase.auth.getUser();
      if (data?.user && data.user.user_metadata.role === "doctor") {
        setDoctor(data.user);
        // Example: fetch patients associated with this doctor.
        // Adjust the query based on your database schema.
        const { data: patientsData, error } = await supabase
          .from("patients")
          .select("*")
          .eq("doctor_id", data.user.id);
        if (!error) {
          setPatients(patientsData);
        }
      } else {
        router.push("/doctor/login");
      }
    }
    fetchDoctor();
  }, [router]);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
      <p>Welcome, Dr. {doctor?.email}</p>
      <h2 className="mt-6 text-2xl font-semibold">Your Patients</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {patients.map((patient) => (
          <Card key={patient.id} className="p-4">
            <CardHeader>
              <h3 className="text-xl">{patient.name}</h3>
            </CardHeader>
            <CardContent>
              <p>Medical Records available</p>
              <Button variant="outline" onClick={() => router.push(`/doctor/patient/${patient.id}`)}>
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        variant="destructive"
        className="mt-6"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/doctor/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
