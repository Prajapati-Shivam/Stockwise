import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";

export async function GET(req) {
  try {
    await connectMongoDB();
    const query = req.nextUrl.searchParams.get("search");
    const products = await Stock.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
