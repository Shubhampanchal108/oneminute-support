import { connectDB } from "@/Database/connection";
import { sectionModel } from "@/Database/models/sectionModel";
import { isAuthorized } from "@/lib/isAuthorized";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  try {
    const user = await isAuthorized();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await sectionModel.find({ user_email: user.email });
    return NextResponse.json({ sections: response });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
