import { useUser  } from "@clerk/nextjs";
import { Name } from '@coinbase/onchainkit/identity';

export default function Basename() {
  const { user } = useUser ();

  const primaryWeb3Wallet = user?.primaryWeb3Wallet;
  const address = primaryWeb3Wallet?.web3Wallet;

  // Type guard function to check if the address is valid
  function isValidAddress(addr: string | undefined): addr is `0x${string}` {
    return typeof addr === 'string' && addr.startsWith('0x');
  }

  return (
    <>
      <main className="me-2 m-auto">
        <p>
          {primaryWeb3Wallet ? <Name address={isValidAddress(address) ? address : null} /> : ""}
        </p>
      </main>
    </>
  );
}