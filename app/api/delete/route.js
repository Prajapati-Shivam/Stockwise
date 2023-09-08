import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

export async function DELETE(req) {
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
    const { id } = await req.json();
    console.log(id);
    const filter = { _id: id };
    const product = await Stock.findOneAndDelete(filter);
    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.log(error);
  }
}
