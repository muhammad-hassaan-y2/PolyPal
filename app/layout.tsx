import type { Metadata } from "next";
import { Geist, Azeret_Mono as Geist_Mono } from 'next/font/google';
import { Eczar } from 'next/font/google';
import { Work_Sans } from 'next/font/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const eczar = Eczar({
  subsets: ["latin"],
  variable: "--font-eczar",
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
});

export const metadata: Metadata = {
  title: "PolyPal",
  description: "Interactive Learning Adventure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${eczar.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

