import { NextResponse } from "next/server";
import User from "../../../models/user";
import { connectMongoDB } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signJwtAccessToken } from "@/lib/jwt";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { email, password } = await req.json();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found", status: 404 });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const { password: userPassword, ...userWithoutPass } = user.toObject();
      const accessToken = signJwtAccessToken(userWithoutPass);
      const result = { ...userWithoutPass, accessToken };
      return NextResponse.json({ success: true, result });
    } else {
      return NextResponse.json({ error: "Invalid password", status: 401 });
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, status: 500 });
    }
    return NextResponse.json({ error: "Internal Server error", status: 500 });
  }
}
