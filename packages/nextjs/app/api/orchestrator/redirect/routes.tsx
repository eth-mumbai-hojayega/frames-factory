import { NextResponse } from "next/server";

async function getResponse(): Promise<NextResponse> {
  return NextResponse.redirect("https://www.google.com", { status: 302 });
}

export async function POST(): Promise<Response> {
  return getResponse();
}
