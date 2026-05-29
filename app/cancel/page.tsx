"use client";

import { useState } from "react";

export default function CancelPage() {
  const [bookingRef, setBookingRef] = useState("");
  const [message, setMessage] = useState("");

  async function handleCancel() {
    const response = await fetch("/api/bookings/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingRef,
      }),
    });

    const data = await response.json();

    setMessage(data.message);
  }

  return (
    <main className="min-h-screen bg-sky-50 p-10 flex justify-center">
      <div className="bg-white p-10 rounded-2xl shadow max-w-xl w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-8">
          Cancel Booking
        </h1>

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Booking Reference
          </label>

          <input
            type="text"
            value={bookingRef}
            onChange={(e) => setBookingRef(e.target.value)}
            placeholder="Enter booking reference"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
        >
          Cancel Booking
        </button>

        {message && (
          <p className="mt-6 font-bold text-blue-700">
            {message}
          </p>
        )}
      </div>
    </main>
  );
}