import type { Metadata } from "next";
import { Geist, Geist_Mono, Shippori_Mincho, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * 見出し用の明朝体。日本語サブセットは重いため preload せず swap で読み込む。
 * adjustFontFallback: false — 自動生成される代替face（実体は local(Times New Roman)）は
 * 和文グリフを持たず、Windowsのフォントリンクでゴシック体に落ちてしまうため無効化する。
 * ただしTurbopackはこの指定を無視する（webpackビルドでのみ効く）ので、実際の対策は
 * globals.css 側でfamily名を直接指定してこの代替faceを経路から外すことで行っている。
 */
const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

/** 本文の欧文セリフ。和文は明朝体・システムフォントにフォールバックする。 */
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Markdown Easy Editor｜学びながら書けるMarkdownエディタ",
  description:
    "Markdownを入力し、記法ボタンとリアルタイムプレビューで学びながら編集できるエディタ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning: /editor の初期化スクリプトが描画前に dark クラスを足すため、
  // サーバー側が返す className と食い違うのは想定内。
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${shipporiMincho.variable} ${sourceSerif.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
