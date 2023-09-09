import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// Display all stocks
export async function GET() {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const owner = session?.user?._id;
    const products = await Stock.find({ owner });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// Add new stock
export async function POST(req) {
  const session = await getServerSession(authOptions);
  try {
    await connectMongoDB();
    const owner = session?.user?._id;
    const body = await req.json();
    const { name, price, quantity } = body;
    const product = await Stock.create({ name, price, quantity, owner });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
