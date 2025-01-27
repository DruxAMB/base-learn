import "@coinbase/onchainkit/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import OnchainProvider from "@/providers/OnchainKitProvider";
import { connectToMongoDB } from "@/lib/db";
import { initalizeContracts } from "@/lib/initalizeContracts";
import LoadingState from "@/components/loading-state";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "learnOnchain",
  description: "OnchainLearn - Empowering communities to learn and build onchain solutions with learnOnchain, an LMS platform to foster innovation and bring the next billion users Onchain.",
  icons: {
    icon: '/favicon.ico',
  },
};

const localization = {
  waitlist: {
    start: {
      actionLink: 'Sign in',
      actionText: 'Already have access?',
      formButton: 'Join the waitlist',
      subtitle: 'Enter your email address and we’ll let you know when your spot is ready',
      title: 'Join the waitlist',
    },
    success: {
      message: 'You will be redirected soon...',
      subtitle: 'We’ll be in touch when your spot is ready. Stay based!',
      title: 'Thanks for joining the waitlist!',
    },
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connectToMongoDB();
  initalizeContracts();

  return (
    <ClerkProvider localization={localization}>
      <OnchainProvider>
        <html lang="en">
          <body className={inter.className}>
            <LoadingState>
              <ConfettiProvider />
              <ToastProvider />
              {children}
            </LoadingState>
          </body>
        </html>
      </OnchainProvider>
    </ClerkProvider>
  );
}