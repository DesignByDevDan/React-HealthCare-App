"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AppointmentsPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the appointments for the logged in patient
  useEffect(() => {
    async function fetchAppointments() {
      // Get the current user
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user;
      if (!user) {
        router.push("/login");
        return;
      }
      // Fetch appointments where patient_id equals the current user's id
      const { data, error } = await supabase
        .from("appointments")
        .select("*")
        .eq("patient_id", user.id);
      if (error) {
        setError(error.message);
      } else {
        setAppointments(data);
      }
      setLoading(false);
    }
    fetchAppointments();
  }, [router]);

  // Function to cancel an appointment (for example, update its status)
  async function cancelAppointment(appointmentId: string) {
    const { error } = await supabase
      .from("appointments")
      .update({ status: "cancelled" })
      .eq("id", appointmentId);
    if (error) {
      console.error("Error cancelling appointment:", error.message);
    } else {
      // Update the local state to remove or mark the cancelled appointment
      setAppointments((prev) =>
        prev.map((app) =>
          app.id === appointmentId ? { ...app, status: "cancelled" } : app
        )
      );
    }
  }

  if (loading) {
    return <div className="p-6 text-center">Loading appointments...</div>;
  }
  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      <Button onClick={() => router.push("/appointments/new")} className="mb-6">
        Schedule New Appointment
      </Button>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment.id} className="p-4">
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Appointment with Dr. {appointment.doctor_name}
                </h3>
              </CardHeader>
              <CardContent>
                <p>
                  Date:{" "}
                  {new Date(appointment.appointment_time).toLocaleString()}
                </p>
                <p>Status: {appointment.status}</p>
              </CardContent>
              <div className="mt-4 flex justify-end">
                {appointment.status !== "cancelled" && (
                  <Button
                    variant="destructive"
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    Cancel Appointment
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
