import { NextRequest, NextResponse } from "next/server";
import Frame from "../../../model/frame";
import connectDB from "../../lib/connectDB";

// get all frames
export async function GET() {
  await connectDB();
  const frames = await Frame.find();
  return new NextResponse(JSON.stringify({ message: "Frames gotten successfully", frames: frames }));
}

// post frame
export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const { frameJson } = payload;
  const frame = new Frame({
    frameJson: frameJson,
  });
  await frame.save();
  return new NextResponse(JSON.stringify({ message: "Frame saved successfully", frame: frame }));
}
