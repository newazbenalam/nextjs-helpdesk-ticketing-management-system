
import db from "@/app/lib/db";
import { NextResponse } from "next/server";
import { uploadImage } from "@/app/lib/upload"; // Import your image upload function

export async function POST(req) {
  const { title, description, image } = await req.body.json();

  try {
    // Upload the image and get the image URL
    const imageURL = await uploadImage(image);

    // Save the knowledge base post to the database
    const knowledgeBasePost = await db.knowledge_base.create({
      data: {
        title,
        description,
        imageURL,
      },
    });

    return NextResponse.json({ knowledgeBasePost });
  } catch (error) {
    console.error("Error creating knowledge base post:", error);
    return NextResponse.json({ error: "Error creating knowledge base post" }, { status: 500 });
  }
}
