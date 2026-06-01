import knowledgeBaseModel from "@/Database/models/knowledgeModel";
import { isAuthorized } from "@/lib/isAuthorized";
import { NextResponse } from "next/server";
import { connectDB } from "@/Database/connection";

export async function GET() {
    await connectDB();
    const user = await isAuthorized();

    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    const sources = await knowledgeBaseModel.find({user_email: user.email})

    return NextResponse.json({ sources }, {
        status: 200,
    });
}