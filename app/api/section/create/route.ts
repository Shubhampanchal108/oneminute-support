import { sectionModel } from "@/Database/models/sectionModel";
import { isAuthorized } from "@/lib/isAuthorized";
import { NextRequest, NextResponse } from "next/server";
import {connectDB} from "@/Database/connection"

export async function POST(req: NextRequest){
    await connectDB()
    try{
        const user = await isAuthorized();
        if(!user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const body = await req.json();
        const {name , description, tone, allowedTopics, blockedTopics, sourceIds} = body;

        if(!name || !description || !tone){
            return NextResponse.json({error: "Missing required feilds"}, {status: 400})
        }

        if(!sourceIds || !Array.isArray(sourceIds) || sourceIds.length === 0){
            return NextResponse.json({error: "At least one source is required"}, {status: 400});
        }

        const section = await sectionModel.create({
            user_email: user.email,
            name,
            description,
            sourceIds,
            tone,
            allowedTopics,
            blockedTopics,
            status: "active"
        })

        return NextResponse.json({message: "Section created successfully", section}, {status: 201});
    }catch(e){
        console.log(e)
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}