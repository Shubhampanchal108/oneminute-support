import knowledgeBaseModel from "@/Database/models/knowledgeModel";
import { isAuthorized } from "@/lib/isAuthorized";
import { sumarizedMarkdown } from "@/lib/llm";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/Database/connection";

export async function POST(request: NextRequest) {
  await connectDB();
  try {
    const user = await isAuthorized();
    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }

    const contentType = request.headers.get("content-type") || "";
    let type: string;
    let body: any = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      type = formData.get("type") as string;

      if (type === "upload") {
        const file = formData.get("file") as File;

        if (!file) {
          return NextResponse.json(
            { error: "No file provided" },
            { status: 400 },
          );
        }

        const fileContent = await file.text();

        const lines = fileContent
          .split("\n")
          .filter((line) => line.trim() !== "");
        const headers = lines[0]?.split(",").map((header) => header.trim());
        let formatedContent = "";

        const markdown = await sumarizedMarkdown(fileContent);
        formatedContent = markdown;

      await knowledgeBaseModel.insertOne({user_email: user.email, type: "upload", name: file.name, status: "active", source_url: file.name, content: formatedContent, metadata: JSON.stringify({filename: file.name, fileSize: file.size, rowCount: lines.length - 1, headers: headers})})

      return NextResponse.json(
        { message: "Csv file uploaded successfully." },
        { status: 200 },
      );
      }
    } else {
      body = await request.json();
      type = body.type;
    }

    if (type === "website") {
      const zenUrl = new URL("https://api.zenrows.com/v1/");
      zenUrl.searchParams.set("url", body.url);
      zenUrl.searchParams.set("apikey", process.env.ZENROW_API_KEY!);
      zenUrl.searchParams.set("response_type", "markdown");

      const res = await fetch(zenUrl.toString(), {
        headers: {
          "User-Agent": "OneMinuteSupportBot/1.0",
        },
      });

      const html = await res.text();

      if (!html || res.status !== 200) {
        return NextResponse.json(
          { error: "Zenrows request failed", status: res.status, body: html.slice(0, 500) },
          { status: 400 },
        );
      }

      const markdown = await sumarizedMarkdown(html);
      console.log(markdown)
      await knowledgeBaseModel.insertOne({user_email: user.email, type: "website", name: body.url, status: "active", source_url: body.url, content: markdown})

      return NextResponse.json(
        { message: "Source added successfully" },
        { status: 200 },
      );
    }else if (type === "text"){
      let content = body.content
      
      if(body.content.lenght > 5000){
        const markdown = await sumarizedMarkdown(body.content);
        content = markdown;
      }

      console.log("Title:", body.title);
      console.log(body)
      await knowledgeBaseModel.insertOne({user_email: user.email, type: "text", name: body.title, status: "active", source_url: body.url, content: content})
      console.log("Title:", body.title);

      return NextResponse.json(
        { message: "Source added successfully" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.log("Error storing knowledge source: ", error);
    return new Response(
      JSON.stringify({ message: "Failed to store knowledge source" }),
      { status: 500 },
    );
  }
}

