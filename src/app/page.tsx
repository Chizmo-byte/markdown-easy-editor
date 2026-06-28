/**
 * LifeMargin ランディングページ（ルート /）。
 *
 * 「デジタルツールプラットフォーム」を、温かいオフホワイトの紙の上に置かれた
 * document のように見せる。重要な見出しはセリフ（明朝）で品よく、CTA だけ 1 色の
 * 親しみやすいグリーンで効かせる。均等な格子感を避け、たっぷりの余白で「人生の余白」
 * を感じさせる。デザイントークンと原則は DESIGN.md に従う。
 *
 * ツールは TOOLS 配列で管理し、カードを 1 枚増やすだけで拡張できる。
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
    icon: "🌱",
    name: "Coming Soon",
    description: "現在、思考を加速させる新しいツールを開発中です。",
    comingSoon: true,
  },
  {
    icon: "🌱",
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

/** 提供ツールカード。公開済みは緑の CTA、未公開は淡いグリーンの面で「Coming Soon」。 */
function ToolCard({ icon, name, description, href, comingSoon }: Tool) {
  const live = !comingSoon && href;
  return (
    <div
      className={
        "flex flex-col rounded-3xl border border-hairline p-8 transition-shadow " +
        (live ? "bg-surface hover:shadow-md" : "bg-accent-soft/60")
      }
    >
      <div className="text-4xl" aria-hidden>
        {icon}
      </div>
      <h3 className="mt-5 font-serif text-xl font-semibold text-ink">{name}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-secondary">
        {description}
      </p>
      <div className="mt-8">
        {live ? (
          <Link
            href={href}
            className="inline-flex items-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-hover active:scale-95"
          >
            ツールを使う
          </Link>
        ) : (
          <span className="inline-flex items-center rounded-full border border-hairline bg-surface/70 px-5 py-2.5 text-sm font-medium text-ink-muted">
            準備中
          </span>
        )}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      {/* A. Hero Section */}
      <section className="px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-accent-soft px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-ink">
            LifeMargin
          </span>
          <h1 className="mt-8 font-serif text-4xl font-bold leading-[1.25] tracking-tight text-ink sm:text-5xl sm:leading-[1.25]">
            書く時間を、
            <br className="hidden sm:block" />
            価値ある時間に。
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-base leading-loose text-ink-secondary">
            人生にゆとりを。LifeMarginは、デジタル作業のムダを削ぎ落とし、思考の整理とアウトプットを最速化するツール群を提供します。
          </p>
          <div className="mt-12">
            <a
              href="#tools"
              className="inline-flex items-center justify-center rounded-full bg-accent px-9 py-3.5 text-base font-semibold text-accent-ink shadow-sm transition-colors hover:bg-accent-hover active:scale-95"
            >
              ツール一覧へ
            </a>
          </div>
        </div>
      </section>

      {/* B. Tool Grid Section */}
      <section id="tools" className="scroll-mt-10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-ink">
            提供ツール
          </h2>
          <p className="mt-4 text-center text-sm text-ink-muted">
            あなたの「書く」を軽くする道具を、ひとつずつ。
          </p>
          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TOOLS.map((tool, i) => (
              <ToolCard key={`${tool.name}-${i}`} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* C. Philosophy Section（AdSense対策・独自コンテンツ） */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-accent-soft px-8 py-16 sm:px-14">
          <h2 className="text-center font-serif text-3xl font-semibold tracking-tight text-ink">
            なぜ、LifeMarginなのか
          </h2>
          <div className="mt-12 space-y-8">
            {PHILOSOPHY.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-loose text-ink-secondary"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* D. Footer */}
      <footer className="mt-8 border-t border-hairline px-6 py-10">
        <p className="text-center text-xs text-ink-muted">© 2026 LifeMargin</p>
      </footer>
    </div>
  );
}
