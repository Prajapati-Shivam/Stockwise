import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";

export async function DELETE(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();
    const filter = { _id: id };
    const product = await Stock.findOneAndDelete(filter);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
}
