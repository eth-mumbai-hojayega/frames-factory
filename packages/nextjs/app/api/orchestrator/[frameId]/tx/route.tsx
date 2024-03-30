import { NextRequest, NextResponse } from "next/server";
import { encodeFunctionData, parseEther } from "viem";
import { ProductSalesABI } from "~~/contracts/ProductSalesABI";

export async function POST(req: NextRequest, res: NextResponse) {
  /// @ts-expect-error
  const result = await encodeFunctionData({
    abi: ProductSalesABI,
    functionName: "sellProduct",
    args: ["0x1234567890123456789012345678901234567890", parseEther("0.01")],
  });
  console.log(result);
}
