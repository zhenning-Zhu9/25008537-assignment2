import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await client.connect();

    const db = client.db("airlineDB");

    const bookings = await db
      .collection("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(bookings);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      {
        status: 500,
      }
    );
  }
}