"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useParams } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";
import useClerkAccount from "@/hooks/useClerkAccount";

const MintButton = ({
  courseId,
  videoNftUrl,
}: {
  courseId: string;
  videoNftUrl: string;
}) => {
  // const { address } = useAccount();
  const [nftName, setNftName] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const { address } = useClerkAccount();
  useEffect(() => {
    const fetchNftName = async () => {
      try {
        const response = await axios.get(`/api/courses/${courseId}/mint`);
        setNftName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch NFT Name:", error);
      }
    };

    fetchNftName();
  }, [courseId]);

  const handleMintClick = async () => {
    if (!address) {
      toast.error(
        "Please connect your wallet from your profile to mint a certificate."
      );
      return;
    }

    setIsMinting(true);
    try {
      const response = await axios.post(`/api/courses/${courseId}/mint`, {
        userAddress: address,
        videoNftUrl,
      });

      console.log("Minting response:", response.data);

      toast.success("Certificate minted successfully!");

      // You can add additional logic here, such as updating UI or redirecting the user
    } catch (error) {
      console.error("Failed to mint certificate:", error);
      toast.error("Failed to mint certificate. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <button
      className={`px-4 py-2 rounded-md ${
        isMinting
          ? "bg-gray-300 text-gray-700 cursor-not-allowed"
          : "bg-sky-200 text-sky-700 hover:bg-sky-300"
      }`}
      onClick={handleMintClick}
      disabled={isMinting}
    >
      {isMinting ? "Minting..." : `Mint ${nftName ? `(${nftName})` : ""} NFT`}
    </button>
  );
};

export default MintButton;
