import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // クライアント完結型アプリなので、Cloudflare Pagesへ静的出力する。
  output: "export",
  // 静的出力ではNext Image最適化サーバーを使わない。
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
