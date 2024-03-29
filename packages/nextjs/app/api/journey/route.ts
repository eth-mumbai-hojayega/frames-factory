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
  const { wallet_address, product_name, starting_node, journey_json } = payload;
  const journey = new Journey({
    WalletAddress: wallet_address,
    ProductName: product_name,
    StartingNode: starting_node,
    JourneyJson: journey_json,
  });
  await journey.save();
  return new NextResponse(JSON.stringify({ message: "Frame saved successfully", journey: journey }));
}
