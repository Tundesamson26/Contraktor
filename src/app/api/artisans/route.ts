import { NextRequest, NextResponse } from "next/server";
import { MOCK_ARTISANS } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const trade = searchParams.get("trade") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");

  let filtered = MOCK_ARTISANS;

  if (search) {
    filtered = filtered.filter(
      (a) =>
        a.name.toLowerCase().includes(search) ||
        a.trade.toLowerCase().includes(search)
    );
  }

  if (trade && trade !== "All") {
    filtered = filtered.filter((a) => a.trade === trade);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return NextResponse.json({
    data,
    total: filtered.length,
  });
}
