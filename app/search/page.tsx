"use client";

import Link from "next/link";
import { useState } from "react";

export default function SearchPage() {
  const [origin, setOrigin] = useState("");
 const [destination, setDestination] = useState("");
const [date, setDate] = useState("");
const [flights, setFlights] = useState<any[]>([]);

  async function handleSearch() {
    const response = await fetch(
     `/api/schedules?origin=${origin}&destination=${destination}&date=${date}`
    );

    const data = await response.json();

    setFlights(data);
  }

  return (
    <main className="min-h-screen bg-white p-10">
      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Search Flights
      </h1>

      <div className="bg-sky-100 p-6 rounded-2xl max-w-xl">
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Origin</label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Example: Dairy Flat"
            className="w-full p-3 rounded-xl"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Example: Sydney"
            className="w-full p-3 rounded-xl"
          />
        </div>
          <div className="mb-6">
  <label className="block mb-2 font-semibold">
    Departure Date
  </label>

  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="w-full p-3 rounded-xl"
  />
</div>
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <div className="mt-8 bg-sky-50 p-6 rounded-2xl shadow max-w-3xl">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Available Flights
        </h2>

        {flights.map((flight) => (
          <div
            key={flight._id}
            className="border rounded-xl p-4 mb-4 bg-white"
          >
            <p className="font-semibold">
              {flight.originName} → {flight.destinationName}
            </p>

            <p>Flight Number: {flight.flightNumber}</p>
            <p>Departure: {flight.departureTime}</p>
            <p>Arrival: {flight.arrivalTime}</p>
            <p>Aircraft: {flight.aircraft}</p>
            <p>
              Seats Available: {flight.capacity - flight.seatsBooked}
            </p>
            <p className="mb-4">Price: ${flight.price}</p>

            <Link
              href={`/book/${flight._id}`}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 inline-block"
            >
              Book Flight
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}