import { metadata } from "@/Database/models/metadataModel";
import { isAuthorized } from "@/lib/isAuthorized";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Database/connection";

export async function GET(request: NextRequest) {
    // 1. Await the DB connection
    await connectDB();

    try {
        const user = await isAuthorized();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const cookieStore = await cookies();
        const metadataCookie = cookieStore.get("metadata");

        // 2. Return cookie data if it exists
        if (metadataCookie?.value) {
            return NextResponse.json({
                exists: true,
                source: "cookie",
                data: JSON.parse(metadataCookie.value)
            }, { status: 200 });
        }

        // 3. CORRECTED: Do not use array destructuring for findOne
        const record = await metadata.findOne({ user_email: user.email });

        if (record) {
            // Prepare the payload
            const payload = {
                exists: true,
                source: "database",
                data: record
            };

            // 4. CORRECTED: Create response first, then set cookie on the response
            const response = NextResponse.json(payload, { status: 200 });

            response.cookies.set("metadata", JSON.stringify({ business_name: record.business_name }), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 7, // 7 days
                path: "/"
            });

            return response;
        }

        return NextResponse.json({ exists: false, data: null }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}