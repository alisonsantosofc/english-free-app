import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { NextAuthProvider } from "./providers";
import { HooksProviders } from "@/hooks/provider";
import { MainContent } from "@/components/custom/MainContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "English Free",
  description: "Planeje sua festa com apenas alguns cliques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <NextAuthProvider>
          <HooksProviders>
            <MainContent>
              {children}
            </MainContent>
          </HooksProviders>
        </NextAuthProvider>
      </body>
    </html>
  );
}
