import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4">
      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Home
        </Link>

        <Link
          href="/search"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          Search Flights
        </Link>

        <Link
          href="/my-bookings"
          className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
        >
          My Bookings
        </Link>

        <Link
          href="/cancel"
          className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
        >
          Cancel Booking
        </Link>
      </div>
    </nav>
  );
}