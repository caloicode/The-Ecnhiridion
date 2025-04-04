import { NextResponse } from "next/server";
import { fetchEnchiridionData } from "@/lib/googleSheet";

export async function GET() {
  try {
    const data = await fetchEnchiridionData();
    console.log("Fetched Enchiridion data:", data);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching Enchiridion data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
