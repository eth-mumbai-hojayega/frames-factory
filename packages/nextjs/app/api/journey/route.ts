import { NextRequest, NextResponse } from "next/server";
import Journey from "../../../model/journey";
import connectDB from "../../lib/connectDB";

// get all journeys
export async function GET() {
  await connectDB();
  const journeys = await Journey.find();
  return new NextResponse(JSON.stringify({ message: "Journeys gotten successfully", journeys: journeys }));
}

export async function POST(req: NextRequest) {
  await connectDB();
  const payload = await req.json();
  const { walletAddress, name, journeyJson, desc, image } = payload;
  const journey = new Journey({
    walletAddress: walletAddress,
    name: name,
    journeyJson: journeyJson,
    desc: desc,
    image: image,
  });
  await journey.save();
  return new NextResponse(JSON.stringify({ message: "Frame saved successfully", journey: journey }));
}
