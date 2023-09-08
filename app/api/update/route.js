import { NextResponse } from "next/server";
import Stock from "../../../models/stock";
import { connectMongoDB } from "@/lib/db";
import { verifyJwt } from "@/lib/jwt";

export async function PUT(req) {
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
    const filter = { owner: verifyJwt(accessToken)._id };
    const update = {
      $set: {
        quantity: body.quantity,
        price: body.price,
      },
    };
    const options = {
      upsert: false,
    };
    const product = await Stock.findOneAndUpdate(filter, update, options);
    return NextResponse.json({ product });
  } catch (error) {
    console.log(error);
  }
}
