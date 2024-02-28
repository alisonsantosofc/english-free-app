import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

const openai = new OpenAI();

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    const body = await req.json();
    const { messages } = body;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0301",
      messages,
    });

    return NextResponse.json(completion.choices[0]);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
