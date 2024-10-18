"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const MintButton = () => {
  const { address } = useAccount();
  const router = useRouter();

  const handleMintClick = () => {
    if (!address) {
      toast.error(
        "Please connect your wallet from your profile to mint a certificate."
      );
    } else {
      // Implement minting logic here
      console.log("Minting certificate...");
      //   toast.success("Minting certificate...");
    }
  };

  return (
    <button
      className="bg-sky-200 text-sky-700 px-4 py-2 rounded-md"
      onClick={handleMintClick}
    >
      Mint Certificate
    </button>
  );
};

export default MintButton;
