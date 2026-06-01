import { isAuthorized } from "@/lib/isAuthorized";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Database/connection";
import { metadata } from "@/Database/models/metadataModel";
import { cookies } from "next/headers";

export async function POST(req: NextRequest){
    connectDB()
    const user = await isAuthorized()
    
    if(!user){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const {business_name, website_url, exernal_links} = await req.json()

    if(!business_name || ! website_url){
        return NextResponse.json({error: "Missing business name or website url"}, {status: 400})
    }

    const metadataResponse = await metadata.create({user_email: user.email, business_name, website_url, exernal_links});

    ((await cookies()).set("metadata", JSON.stringify({business_name})))

    return NextResponse.json({metadataResponse}, {status: 201})


}