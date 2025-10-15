import { NextRequest, NextResponse } from "next/server";
import { syncContentTypeOrGlobalField } from "@/lib/syncContentTypeOrGlobalField";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, title, description, schema, options, globalFieldFallback } = body;

    if (!uid || !schema) {
      return NextResponse.json({ error: "Missing uid or schema" }, { status: 400 });
    }

    console.log("Syncing Content Type or Global Field", uid, title, description, schema, options, globalFieldFallback);

    const result = await syncContentTypeOrGlobalField(uid, schema, options, globalFieldFallback, title, description);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
