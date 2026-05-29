"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();

  const [passengerName, setPassengerName] = useState("");
  const [email, setEmail] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [seats, setSeats] = useState("1");
  const [flight, setFlight] = useState<any>(null);
useEffect(() => {
  async function loadFlight() {
    const response = await fetch(
      `/api/schedules/${params.id}`
    );

    const data = await response.json();

    setFlight(data);
  }

  loadFlight();
}, [params.id]);



  async function handleBooking() {
    if (
  !passengerName ||
  !email ||
  !passportNumber ||
  !seats
) {
  alert("Please fill in all fields");
  return;
}

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        flightId: params.id,
        passengerName,
        email,
        passportNumber,
        seats,
      }),
    });

    const data = await response.json();
if (data.success) {
  router.push(`/invoice/${data.bookingRef}`);
} else {
  alert(data.message || "Booking failed");
}
  }

  if (!flight) {
  return <p>Loading...</p>;
}

return (
    <main className="min-h-screen bg-sky-50 p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Flight Booking
      </h1>
      <div className="bg-white p-6 rounded-2xl shadow mb-6 max-w-2xl">
  <h2 className="text-2xl font-bold text-blue-900 mb-4">
    Flight Information
  </h2>

  <p>
    <strong>Flight Number:</strong> {flight.flightNumber}
  </p>

  <p>
    <strong>Route:</strong>{" "}
    {flight.originName} → {flight.destinationName}
  </p>

  <p>
    <strong>Aircraft:</strong> {flight.aircraft}
  </p>

  <p>
    <strong>Departure:</strong> {flight.departureTime}
  </p>

  <p>
    <strong>Price:</strong> ${flight.price}
  </p>

  <p>
    <strong>Seats Available:</strong>{" "}
    {flight.capacity - flight.seatsBooked}
  </p>
</div>

      <div className="bg-white p-8 rounded-2xl shadow max-w-2xl">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Passenger Name</label>
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
            placeholder="Enter passenger name"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Passport Number</label>
          <input
            type="text"
            value={passportNumber}
            onChange={(e) => setPassportNumber(e.target.value)}
            placeholder="Enter passport number"
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Number of Seats</label>
          <input
            type="number"
            min="1"
            max="5"
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
            className="w-full p-3 border rounded-xl"
          />
        </div>

        <button
          onClick={handleBooking}
          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
        >
          Confirm Booking
        </button>
      </div>
    </main>
  );
}