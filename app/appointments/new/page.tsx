"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewAppointmentPage() {
  const router = useRouter();
  const [doctorId, setDoctorId] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch the current user's ID
  useEffect(() => {
    async function fetchUser() {
      const { data: userData } = await supabase.auth.getUser();
      if (userData?.user) {
        setUserId(userData.user.id);
      } else {
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (!doctorId || !appointmentTime) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    // Insert a new appointment record including the scheduled_at field
    const { error: insertError } = await supabase
      .from("appointments")
      .insert([
        {
          patient_id: userId,
          doctor_id: doctorId, // Ensure this is a valid UUID
          appointment_time: new Date(appointmentTime).toISOString(),
          scheduled_at: new Date().toISOString(), // Record when the appointment is scheduled
          status: "scheduled",
          reason,
        },
      ]);

    if (insertError) {
      setError(insertError.message);
    } else {
      // On success, redirect to the appointments page
      router.push("/appointments");
    }
    setLoading(false);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Schedule New Appointment</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Doctor Selection */}
        <div>
          <label
            htmlFor="doctorId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Select Doctor
          </label>
          <select
            id="doctorId"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="">Select a doctor</option>
            {/* Replace these UUIDs with actual valid UUIDs from your database */}
            <option value="11111111-1111-1111-1111-111111111111">Dr. Smith</option>
            <option value="22222222-2222-2222-2222-222222222222">Dr. Williams</option>
          </select>
        </div>

        {/* Appointment Date & Time */}
        <div>
          <label
            htmlFor="appointmentTime"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Appointment Date &amp; Time
          </label>
          <Input
            id="appointmentTime"
            type="datetime-local"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        {/* Reason (optional) */}
        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Reason (optional)
          </label>
          <Input
            id="reason"
            type="text"
            placeholder="Reason for appointment"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Scheduling..." : "Schedule Appointment"}
        </Button>
      </form>
    </div>
  );
}
