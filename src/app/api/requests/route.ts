import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("API: Service Request Received:", body);

    // Simulate some server-side processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ success: true, message: "Request received" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }
}
