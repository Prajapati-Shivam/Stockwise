import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

export async function GET(req) {
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
    const query = req.nextUrl.searchParams.get("query");
    const products = await Stock.find({
      $or: [{ name: { $regex: query, $options: "i" } }],
    });
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
