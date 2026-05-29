"use client";

import { useEffect, useState } from "react";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBookings() {
      const response = await fetch("/api/bookings/all");

      const data = await response.json();

      setBookings(data);
    }

    fetchBookings();
  }, []);

  return (
    <main className="min-h-screen bg-sky-50 p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        My Bookings
      </h1>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white p-6 rounded-2xl shadow"
          >
            <p>
              <strong>Booking Ref:</strong>{" "}
              {booking.bookingRef}
            </p>

            <p>
              <strong>Passenger:</strong>{" "}
              {booking.passengerName}
            </p>

            <p>
              <strong>Email:</strong> {booking.email}
            </p>

            <p>
              <strong>Seats:</strong> {booking.seats}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  booking.status === "Cancelled"
                    ? "text-red-600 font-bold"
                    : "text-green-600 font-bold"
                }
              >
                {booking.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}