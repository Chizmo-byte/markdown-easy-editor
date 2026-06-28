import type { Metadata } from "next";
import { Geist, Geist_Mono, Shippori_Mincho } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 重要な見出し用の明朝（セリフ）。落ち着いた品位と「人生の余白」の温度感を担う。
const shipporiMincho = Shippori_Mincho({
  variable: "--font-serif-display",
  weight: ["600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LifeMargin — 書く時間を、価値ある時間に。",
  description:
    "不要な装飾を削ぎ落とし、思考を整理する。Brain, note, Obsidian に最適化した軽量マークダウンエディタ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${shipporiMincho.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink">
        {children}
      </body>
    </html>
  );
}
