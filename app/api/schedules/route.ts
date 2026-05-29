import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const date = searchParams.get("date");

    await client.connect();

    const db = client.db("airlineDB");

    const query: any = {};

    if (origin) {
      query.originName = {
        $regex: origin,
        $options: "i",
      };
    }

    if (destination) {
      query.destinationName = {
        $regex: destination,
        $options: "i",
      };
    }

    if (date) {
      query.departureTime = {
        $regex: date,
      };
    }

    const schedules = await db
      .collection("schedules")
      .find(query)
      .sort({ departureTime: 1 })
      .toArray();

    return NextResponse.json(schedules);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load schedules",
      },
      {
        status: 500,
      }
    );
  }
}