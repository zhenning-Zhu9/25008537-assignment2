import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  try {
    const body = await request.json();

    await client.connect();

    const db = client.db("airlineDB");

    const result = await db.collection("bookings").updateOne(
      {
        bookingRef: body.bookingRef,
      },
      {
        $set: {
          status: "Cancelled",
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: "Booking not found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Cancel failed",
      },
      {
        status: 500,
      }
    );
  }
}