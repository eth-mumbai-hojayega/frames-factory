import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse } from "frames.js";
import { Abi, Address, createPublicClient, encodeFunctionData, http, parseEther } from "viem";
import deployedContracts from "~~/contracts/deployedContracts";

export async function POST(req: NextRequest): Promise<NextResponse<TransactionTargetResponse>> {
  /// @ts-expect-error
  const result = await encodeFunctionData({
    abi: deployedContracts[10].ProductSales.abi as Abi,
    functionName: "sellProduct",
    args: ["0xf35239d2c73c1f0e1E5ee8D174E0479a4040c26C", "66082d4fb3d9263bbcbc3e35", 1],
  });

  return NextResponse.json({
    chainId: "eip155:10", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: deployedContracts[10].ProductSales.abi as Abi,
      to: "0xa0556a7c13f94F1A7cEC579a4adBBd9a9FCEbA0d",
      data: result,
      value: "0x0",
    },
  });
}
