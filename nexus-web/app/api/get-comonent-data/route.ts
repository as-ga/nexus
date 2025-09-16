import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const componentId = searchParams.get("componentId");
    if (!componentId) {
      return NextResponse.json(
        { error: "Component ID is required" },
        { status: 400 }
      );
    }
    return NextResponse.json({ componentId }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/get-component-data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
