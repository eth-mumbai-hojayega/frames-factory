import { NextRequest, NextResponse } from "next/server";
import Frame from "../../../../model/frame";
import connectDB from "../../../lib/connectDB";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const frame_id = params.id;
  const frame = await Frame.findById(frame_id);
  if (!frame) {
    return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
  }
  return new NextResponse(JSON.stringify(frame));
}

// // update frame
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   await connectDB();
//   const frame_id = params.id;
//   const payload = await req.json();
//   const { frameJson } = payload;
//   const frame = await Frame.findByIdAndUpdate(frame_id, { frameJson }, { new: true });
//   if (!frame) {
//     return new NextResponse(JSON.stringify({ message: "Frame not found" }), { status: 404 });
//   }
//   return new NextResponse(JSON.stringify({ frame }));
// }