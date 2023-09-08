import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

// Display all stocks
export async function GET(req) {
  const authorizationHeader = req.headers.get("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const accessToken = authorizationHeader.replace("Bearer ", "");
  if (!verifyJwt(accessToken)) {
    return NextResponse.json({
      error: "Session expired, please login again",
      status: 401,
    });
  }
  try {
    await connectMongoDB();
    const id = verifyJwt(accessToken)._id;
    const products = await Stock.find({ owner: id });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

// Add new stock
export async function POST(req) {
  const authorizationHeader = req.headers.get("Authorization");
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  const accessToken = authorizationHeader.replace("Bearer ", "");
  if (!verifyJwt(accessToken)) {
    return NextResponse.json({ error: "Unauthorized", status: 401 });
  }
  try {
    await connectMongoDB();
    const body = await req.json();
    const { name, price, quantity, owner } = body;
    const product = await Stock.create({ name, price, quantity, owner });
    return NextResponse.json({ success: true, product });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
