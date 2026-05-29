import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    await client.connect();

    const db = client.db("airlineDB");

    const flight = await db
      .collection("schedules")
      .findOne({
        _id: new ObjectId(body.flightId),
      });

    if (!flight) {
      return NextResponse.json(
        {
          success: false,
          message: "Flight not found",
        },
        {
          status: 404,
        }
      );
    }

    const requestedSeats = Number(body.seats);

    const availableSeats =
      flight.capacity - flight.seatsBooked;

    if (requestedSeats > availableSeats) {
      return NextResponse.json(
        {
          success: false,
          message: "Not enough seats available",
        },
        {
          status: 400,
        }
      );
    }

    const bookingRef =
      "DF" + Math.floor(1000 + Math.random() * 9000);

    const booking = {
      bookingRef,
      passengerName: body.passengerName,
      email: body.email,
      passportNumber: body.passportNumber,
      seats: requestedSeats,
      flightId: body.flightId,
      status: "Confirmed",
      createdAt: new Date(),
    };

    await db.collection("bookings").insertOne(booking);

    await db.collection("schedules").updateOne(
      {
        _id: new ObjectId(body.flightId),
      },
      {
        $inc: {
          seatsBooked: requestedSeats,
        },
      }
    );

    return NextResponse.json({
      success: true,
      bookingRef,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Booking failed",
      },
      {
        status: 500,
      }
    );
  }
}