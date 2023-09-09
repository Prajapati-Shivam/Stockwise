import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";

export async function PUT(req) {
  try {
    await connectMongoDB();
    const body = await req.json();
    const filter = { _id: body._id };
    const update = {
      $set: {
        quantity: body.quantity,
        price: body.price,
      },
    };
    const options = {
      upsert: false,
      new: true,
    };
    const product = await Stock.findOneAndUpdate(filter, update, options);
    return NextResponse.json({ product });
  } catch (error) {
    console.log(error);
  }
}
