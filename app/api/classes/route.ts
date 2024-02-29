import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

import a1_classes from './a1_classes.json';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return NextResponse.json(a1_classes);
  } catch (error) {
    console.log("[CLASSES_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
