import { NextRequest, NextResponse } from "next/server";
import { MOCK_ARTISANS } from "@/lib/data";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const artisan = MOCK_ARTISANS.find((a) => a.id === id);

  if (!artisan) {
    return NextResponse.json({ error: "Artisan not found" }, { status: 404 });
  }

  return NextResponse.json(artisan);
}
