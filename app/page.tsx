import client from "@/lib/mongodb";
import Link from "next/link";
async function testConnection() {
  try {
    await client.connect();
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
}

testConnection();
export default function Home() {
  return (
    <main className="min-h-screen bg-sky-100 flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-blue-900 mb-4">
        Dairy Flat Airline
      </h1>

      <p className="text-xl text-gray-700 mb-8">
        Welcome to the Airline Booking System
      </p>

      <div className="flex gap-4">
        <Link
  href="/cancel"
  className="bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600"
>
  Cancel Booking
</Link>

        <Link href="/search"
         className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
>         Search Flights
        </Link>
      </div>
    </main>
  );
}