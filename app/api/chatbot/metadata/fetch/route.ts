import chatBot from "@/Database/models/chatbotModel";
import { isAuthorized } from "@/lib/isAuthorized";
import { NextResponse } from "next/server";
import {connectDB} from "@/Database/connection"

export async function GET(){
    await connectDB();
    try{
        const user = await isAuthorized();

        if(!user){
            return NextResponse.json({error: "Unauthorized"}, {status: 401})
        }

        const existingMetadata = await chatBot.find({user_email: user.email});

        if(!existingMetadata){
            const newMetaData = await chatBot.create({user_email: user.email});

            return NextResponse.json(newMetaData, {status: 200});
        }

        return NextResponse.json(existingMetadata, {status: 200});
    }catch(e){
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}