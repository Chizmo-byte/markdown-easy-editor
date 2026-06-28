/**
 * LifeMargin ランディングページ（ルート /）。
 *
 * 単一ツールの紹介ではなく「デジタルツールプラットフォーム」として構成する静的 LP。
 * 「誠実・シンプル・知的」なトーンで、白＋薄グレーを基調に濃紺（Navy）をアクセントにし、
 * 十分な余白で読ませる。Hero → 提供ツール → フィロソフィー → Footer の縦構成。
 *
 * ツールは TOOLS 配列で管理し、カードを 1 枚増やすだけで拡張できるようにしている。
 */

import Link from "next/link";

/** 提供ツール 1 件分のメタ情報。`comingSoon` のときは href を持たない。 */
interface Tool {
  /** カード見出しのアイコン（軽量化のため絵文字で表現）。 */
  icon: string;
  name: string;
  description: string;
  /** 遷移先。未公開ツールは undefined。 */
  href?: string;
  comingSoon?: boolean;
}

const TOOLS: ReadonlyArray<Tool> = [
  {
    icon: "📝",
    name: "Markdown Easy Editor",
    description:
      "Brain, note, Obsidianへの投稿を最適化。不要な装飾を自動でクレンジングし、一撃で最適な形式へ変換する軽量エディタ。",
    href: "/editor",
  },
  {
    icon: "✨",
    name: "Coming Soon",
    description: "現在、思考を加速させる新しいツールを開発中です。",
    comingSoon: true,
  },
  {
    icon: "✨",
    name: "Coming Soon",
    description: "現在、思考を加速させる新しいツールを開発中です。",
    comingSoon: true,
  },
];

const PHILOSOPHY: ReadonlyArray<string> = [
  "現代のデジタルツールは多機能になりすぎている。しかし、本当に必要なのは、思考を妨げない最小限の機能だけである。",
  "私たちは、不要な装飾や複雑な操作を削ぎ落とし、本質的なアウトプットに集中できる「誠実なツール」を追求します。",
  "ツールによって生まれた時間のゆとりこそが、人生の余白（Margin）となり、新しい創造性を生むと信じているからです。",
];

/** 提供ツールカード。公開済みは遷移ボタン、未公開は「Coming Soon」を表示する。 */
function ToolCard({ icon, name, description, href, comingSoon }: Tool) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
      <div className="text-3xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900">{name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
      <div className="mt-6">
        {comingSoon || !href ? (
          <span className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400">
            Coming Soon
          </span>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center rounded-md bg-blue-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-950"
          >
            ツールを使う
          </Link>
        )}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* A. Hero Section */}
      <section className="flex items-center justify-center px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 text-sm font-semibold tracking-wide text-blue-900">
            LifeMargin
          </p>
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
            書く時間を、価値ある時間に。
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-gray-600">
            人生にゆとりを。LifeMarginは、デジタル作業のムダを削ぎ落とし、思考の整理とアウトプットを最速化するツール群を提供します。
          </p>
          <div className="mt-10">
            <a
              href="#tools"
              className="inline-flex items-center justify-center rounded-md bg-blue-900 px-8 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-950"
            >
              ツール一覧へ
            </a>
          </div>
        </div>
      </section>

      {/* B. Tool Grid Section */}
      <section id="tools" className="scroll-mt-8 border-t bg-white px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-xl font-bold tracking-tight text-gray-900">
            提供ツール
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, i) => (
              <ToolCard key={`${tool.name}-${i}`} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* C. Philosophy Section（AdSense対策・独自コンテンツ） */}
      <section className="border-t bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-xl font-bold tracking-tight text-gray-900">
            なぜ、LifeMarginなのか
          </h2>
          <div className="mt-10 space-y-6">
            {PHILOSOPHY.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-loose text-gray-700"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* D. Footer */}
      <footer className="border-t bg-white px-6 py-8">
        <p className="text-center text-xs text-gray-500">© 2026 LifeMargin</p>
      </footer>
    </div>
  );
}
