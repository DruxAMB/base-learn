import { NextResponse } from "next/server";
import {
  contracts,
  initalizeContracts,
  client,
} from "@/lib/initalizeContracts";
import { auth } from "@clerk/nextjs";
import { Course } from "@/mongodb/Course";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    // Initialize contracts if not already done
    if (!contracts.courseNFT) {
      initalizeContracts();
    }

    // Get the name of the NFT
    const name = await contracts.courseNFT.read.name();

    return NextResponse.json({ name }, { status: 200 });
  } catch (error) {
    console.error("[GET_NFT_NAME]", error);
    return NextResponse.json(
      { error: "Failed to get NFT Name" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const courseId = params.courseId;
    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Initialize contracts if not already done
    if (!contracts.courseNFT) {
      initalizeContracts();
    }

    // Get the user's Ethereum address from the request body
    const { userAddress, videoNftUrl } = await req.json();

    if (!userAddress) {
      return NextResponse.json(
        { error: "User address is required" },
        { status: 400 }
      );
    }

    // Mint the NFT
    const transaction = await contracts.courseNFT.write.mint([
      userAddress,
      BigInt(courseId),
      videoNftUrl,
    ]);

    // Wait for the transaction to be mined
    const receipt = await client.waitForTransactionReceipt({
      hash: transaction,
    });

    // Get the token ID from the transaction receipt (you might need to adjust this based on your contract's events)
    const tokenId = receipt.logs[0].topics[3]; // This assumes the Transfer event is emitted and the token ID is the third topic

    return NextResponse.json(
      {
        message: "NFT minted successfully",
        transactionHash: transaction,
        tokenId: tokenId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[MINT_NFT]", error);
    return NextResponse.json({ error: "Failed to mint NFT" }, { status: 500 });
  }
}