import client from "@/lib/mongodb";
import Link from "next/link";
import { ObjectId } from "mongodb";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await client.connect();

  const db = client.db("airlineDB");

  const booking = await db.collection("bookings").findOne({
    bookingRef: id,
  });

  if (!booking) {
    return (
      <main className="min-h-screen bg-sky-50 p-10">
        <h1 className="text-4xl font-bold text-red-600">
          Booking Not Found
        </h1>
      </main>
    );
  }

  const flight = await db.collection("schedules").findOne({
    _id: new ObjectId(booking.flightId),
  });

  if (!flight) {
    return (
      <main className="min-h-screen bg-sky-50 p-10">
        <h1 className="text-4xl font-bold text-red-600">
          Flight Not Found
        </h1>
      </main>
    );
  }

  const totalPrice = booking.seats * flight.price;

  return (
    <main className="min-h-screen bg-sky-50 p-10 flex justify-center">
      <div className="bg-white p-10 rounded-2xl shadow max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Booking Invoice
        </h1>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Booking Reference:</strong> {booking.bookingRef}
          </p>

          <p>
            <strong>Passenger:</strong> {booking.passengerName}
          </p>

          <p>
            <strong>Email:</strong> {booking.email}
          </p>

          <p>
            <strong>Passport Number:</strong> {booking.passportNumber}
          </p>

          <p>
            <strong>Flight Number:</strong> {flight.flightNumber}
          </p>

          <p>
            <strong>Route:</strong> {flight.originName} →{" "}
            {flight.destinationName}
          </p>

          <p>
            <strong>Departure:</strong> {flight.departureTime}
          </p>

          <p>
            <strong>Arrival:</strong> {flight.arrivalTime}
          </p>

          <p>
            <strong>Aircraft:</strong> {flight.aircraft}
          </p>

          <p>
            <strong>Seats:</strong> {booking.seats}
          </p>

          <p>
            <strong>Price per Seat:</strong> ${flight.price}
          </p>

          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>

          <div className="mt-6">
            <span
              className={
                booking.status === "Cancelled"
                  ? "bg-red-100 text-red-700 px-4 py-2 rounded-xl font-bold"
                  : "bg-green-100 text-green-700 px-4 py-2 rounded-xl font-bold"
              }
            >
              Status: {booking.status}
            </span>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href="/"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              Back to Home
            </Link>

            <Link
              href="/my-bookings"
              className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
            >
              View My Bookings
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}