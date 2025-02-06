import { Poppins } from "next/font/google";
import { Ubuntu } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteconfig";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-Poppins",
});

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-Ubuntu",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ url: "/logo.svg", href: "/logo.svg" }],
  authors: [
    {
      name: "Adharsh",
      url: "https://github.com/lordgamingyt",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ubuntu.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
