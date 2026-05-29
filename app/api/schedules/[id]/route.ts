import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import client from "@/lib/mongodb";
export const dynamic = "force-dynamic";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await client.connect();

    const db = client.db("airlineDB");

    const schedule = await db.collection("schedules").findOne({
      _id: new ObjectId(id),
    });

    if (!schedule) {
      return NextResponse.json(
        { success: false, message: "Schedule not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(schedule);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch schedule" },
      { status: 500 }
    );
  }
}