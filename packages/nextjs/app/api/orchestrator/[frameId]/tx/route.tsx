import { NextRequest, NextResponse } from "next/server";
import { Abi, createPublicClient, encodeFunctionData, http, parseEther } from "viem";
import { hardhat } from "viem/chains";
import { ProductSalesABI } from "~~/contracts/ProductSalesABI";

export async function POST(req: NextRequest, res: NextResponse) {
  /// @ts-expect-error
  const result = await encodeFunctionData({
    abi: ProductSalesABI,
    functionName: "sellProduct",
    args: ["0xf35239d2c73c1f0e1E5ee8D174E0479a4040c26C", "66082d4fb3d9263bbcbc3e35", 1, parseEther("0.01")],
  });

  return NextResponse.json({
    chainId: "31337", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: ProductSalesABI as Abi,
      to: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      data: result,
      value: "0x0",
    },
  });
}
