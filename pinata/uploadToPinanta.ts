import axios from "axios";

const PINATA_API_KEY = process.env.VITE_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.VITE_PINATA_SECRET_API_KEY;

export const uploadToPinata = async (file: File): Promise<string | null> => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  // Prepare the form data to send the file to Pinata
  const formData = new FormData();
  formData.append("file", file);

  try {
    // Send the request to Pinata with the necessary headers
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": `multipart/form-data`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    // The IPFS hash is returned in the response
    const ipfsHash = response.data.IpfsHash;

    // Construct the URL to access the file on IPFS via Pinata's gateway
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    return ipfsUrl;
  } catch (error) {
    console.error("Error uploading file to Pinata:", error);
    return null; // Return null if upload fails
  }
};
