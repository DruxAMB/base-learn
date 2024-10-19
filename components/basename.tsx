import { useUser } from "@clerk/nextjs";

export default function Basename() {
  const { user } = useUser();

  const primaryWeb3Wallet = user?.primaryWeb3Wallet;

  return (
    <>
      <main className="me-2">
        <p>
          {primaryWeb3Wallet ? primaryWeb3Wallet.web3Wallet : ""}
        </p>
      </main>
    </>
  );
}
