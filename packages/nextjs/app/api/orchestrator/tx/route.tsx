import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js/next/server";
import { Abi, createPublicClient, encodeFunctionData, http, parseEther } from "viem";
import { ProductSalesABI } from "~~/contracts/ProductSalesABI";

export async function POST(req: NextRequest): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);

  if (!frameMessage) {
    throw new Error("No frame message");
  }
  /// @ts-expect-error
  const result = await encodeFunctionData({
    abi: ProductSalesABI,
    functionName: "sellProduct",
    args: ["0xf35239d2c73c1f0e1E5ee8D174E0479a4040c26C", "66082d4fb3d9263bbcbc3e35", 1, parseEther("0.01")],
  });

  return NextResponse.json({
    chainId: "11155111", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: ProductSalesABI as Abi,
      to: "0x49a33cb12a17e75e9Ffd17F28E78cc844b7066ea",
      data: result,
      value: "0x0",
    },
  });
}
