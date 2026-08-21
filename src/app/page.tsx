import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

export const metadata: Metadata = {
  title: "LifeMargin｜小さな道具で、考える時間と余白をつくる",
  description:
    "LifeMarginは、不要な機能や複雑な操作を削ぎ落とした小さなWebツールをつくっています。Markdown Easy Editor、子どもの学びツールなどを提供しています。",
  alternates: {
    canonical: "https://lifemargin.net/",
  },
  openGraph: {
    title: "LifeMargin｜小さな道具で、考える時間と余白をつくる",
    description:
      "不要な機能や複雑な操作を削ぎ落とした、小さなWebツールをつくっています 。",
    url: "https://lifemargin.net/",
    siteName: "LifeMargin",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "LifeMargin｜小さな道具で、考える時間と余白をつくる",
    description:
      "不要な機能や複雑な操作を削ぎ落とした、小さなWebツールをつくっています 。",
  },
};

interface Tool {
  number: string;
  name: string;
  description: string;
  href?: string;
  status?: string;
  tags?: string;
  accent: "cyan" | "lime" | "magenta";
  action: string;
}

/**
 * 刷版（Proof Sheet）の左右余白。900px 未満で 28px に縮む。
 * Tailwind はクラス名を静的に走査するため、色や余白は文字列補間せず直書きする。
 */
const SHEET_PADDING = "px-7 min-[900px]:px-[72px]";

/** 小見出しラベル（Philosophy / Colophon など）。 */
const LABEL = "text-[11px] uppercase tracking-[0.22em] text-[#54524d]";

const TOOLS: ReadonlyArray<Tool> = [
  {
    number: "01",
    name: "Markdown Easy Editor",
    description:
      "見出し・リスト・引用・強調・区切り。ボタンを押すだけで、その記法が何のためにあるのかが分かります。簡単なマークダウン文書なら、そのまま仕上がります。",
    href: "/editor",
    accent: "cyan",
    action: "エディタを開く",
  },
  {
    number: "02",
    name: "こどもの学び",
    description:
      "つまずきやすい単元を、さわって確かめられる小さなツールに。これからも増えていきます。",
    tags: "時計 ／ 文章題 ／ さくらんぼ計算 ／ わり算 ／ ものさし ／ 小数",
    accent: "lime",
    action: "一覧を見る",
  },
  {
    number: "03",
    name: "ぬりえジェネレーター",
    description:
      "好きなテーマを入力すると、印刷できるぬりえを自動で生成します。線の太さは年齢に合わせて選べます。",
    status: "New plate",
    accent: "magenta",
    action: "つくってみる",
  },
];

const PHILOSOPHY = [
  {
    number: "Ⅰ",
    text: "現代のデジタルツールは多機能になりすぎている。しかし、本当に必要なのは、思考を妨げない最小限の機能だけである。",
  },
  {
    number: "Ⅱ",
    text: "私たちは、不要な装飾や複雑な操作を削ぎ落とし、目的にまっすぐ効く「誠実なツール」を追求します。子ども向けの学習ツールも、同じ考えでつくっています。",
  },
  {
    number: "Ⅲ",
    text: "ツールによって生まれた時間のゆとりこそが、人生の余白（Margin）となり、新しい創造性を生むと信じているからです。",
  },
];

/** 刷版番号のCMY版ズレ（校正刷りの見当ズレ表現）。 */
const PLATE_NUMBER_SHADOW =
  "[text-shadow:3px_0_rgba(214,0,108,.5),-3px_0_rgba(0,136,176,.5)]";

const CTA_STYLES = {
  cyan: "bg-[#9fe870] px-7 py-[13px] text-[#163300] hover:bg-[#8ad657]",
  lime: "bg-[#201e1d] px-7 py-[13px] text-[#f3f2f2] hover:bg-[#0088b0]",
  magenta:
    "border border-[#d6006c] px-[27px] py-3 text-[#d6006c] hover:bg-[#d6006c] hover:text-[#f3f2f2]",
} as const;

/** 校正刷りのカラースケール（8階調）。 */
const SCALE: ReadonlyArray<string> = [
  "#0088b0",
  "#d6006c",
  "#b9a400",
  "#201e1d",
  "#9fe870",
  "#c9c6c0",
  "#e6e4df",
  "#f8f7f5",
];

function PlateRow({ tool, isFirst, isLast }: { tool: Tool; isFirst: boolean; isLast: boolean }) {
  const cta = `inline-flex items-center rounded-[2px] text-base font-semibold transition-colors ${CTA_STYLES[tool.accent]}`;

  return (
    <article
      id={`plate-${tool.number}`}
      className={`grid scroll-mt-8 grid-cols-[72px_1fr] items-start gap-x-5 gap-y-5 border-t py-9 min-[560px]:grid-cols-[96px_1fr] min-[560px]:gap-x-10 min-[900px]:grid-cols-[160px_1fr_210px] min-[900px]:gap-y-3 ${
        isFirst ? "border-t-[#201e1d]" : "border-t-[#d9d6d0]"
      } ${isLast ? "border-b border-b-[#201e1d]" : ""}`}
    >
      <span
        className={`font-serif text-[52px] font-bold leading-[0.85] text-[#201e1d] min-[560px]:text-[64px] min-[900px]:text-[86px] ${PLATE_NUMBER_SHADOW}`}
        aria-hidden="true"
      >
        {tool.number}
      </span>
      <div>
        <h3 className="font-mincho text-[22px] font-bold leading-[1.3] tracking-[-0.01em] min-[560px]:text-[29px]">
          {tool.name}
        </h3>
        <p className="mt-3.5 max-w-[34em] text-base leading-[1.8] text-[#54524d]">{tool.description}</p>
        {tool.tags ? (
          <p className="mt-3 max-w-[38em] font-mono text-xs leading-[2] tracking-[0.02em] text-[#8a857d]">
            {tool.tags}
          </p>
        ) : null}
        {tool.status ? (
          <span className="mt-3.5 inline-block text-[11px] uppercase tracking-[0.22em] text-[#d6006c]">
            {tool.status}
          </span>
        ) : null}
      </div>
      <div className="col-span-full justify-self-start min-[900px]:col-span-1 min-[900px]:justify-self-end">
        {tool.href ? (
          <Link href={tool.href} className={cta}>
            {tool.action}
          </Link>
        ) : (
          <span className={`${cta} cursor-default`} aria-disabled="true">
            {tool.action}
          </span>
        )}
      </div>
    </article>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f3f2f2] text-[#201e1d]">
      <SiteHeader />
      <main className="font-serif">
        <div className="relative mx-auto max-w-[1180px] bg-[#f3f2f2]">
          <span aria-hidden="true" className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[#201e1d]" />
          <span aria-hidden="true" className="absolute right-4 top-4 h-6 w-6 border-r border-t border-[#201e1d]" />
          <span aria-hidden="true" className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-[#201e1d]" />
          <span aria-hidden="true" className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-[#201e1d]" />

          {/* 台紙のマストヘッド（サイト共通ヘッダーとは別の、紙面としての見出し） */}
          <div className={`pt-12 ${SHEET_PADDING}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-6 text-xs uppercase tracking-[0.22em] text-[#54524d]">
              <span>LifeMargin — proof sheet</span>
              <span className="flex gap-4" aria-hidden="true">
                <span className="text-[#0088b0]">C</span>
                <span className="text-[#d6006c]">M</span>
                <span className="text-[#b9a400]">Y</span>
                <span className="text-[#201e1d]">K</span>
                <span className="text-[#54524d]">2026</span>
              </span>
            </div>
            <div className="mt-2.5 h-[3px] bg-[#201e1d]" />
            <div className="mt-[3px] h-px bg-[#201e1d]" />
          </div>

          <section className={`pt-14 ${SHEET_PADDING}`}>
            <h1 className="max-w-[18em] font-mincho text-[29px] font-semibold leading-[1.34] tracking-[-0.01em] text-pretty min-[560px]:text-[34px] min-[900px]:text-[46px]">
              削ぎ落としてから、渡す。
            </h1>

            <div className="mt-8 grid items-start gap-9 min-[900px]:grid-cols-[1.15fr_1fr] min-[900px]:gap-14">
              <p className="text-lg leading-[1.85] text-[#54524d] text-pretty">
                LifeMarginは、ムダを削ぎ落とした小さな道具をつくっています。多機能である必要はありません。ひとつの目的に、まっすぐ効くこと。大人の道具も、子どもの学習ツールも、同じ考えでつくっています。
              </p>
              <figure className="m-0">
                <span className={`block ${LABEL}`}>Philosophy</span>
                <div className="mb-4 mt-2.5 h-px bg-[#d9d6d0]" />
                <blockquote className="text-[21px] italic leading-[1.75] text-[#201e1d] text-pretty [text-indent:-0.5em]">
                  「本当に必要なのは、思考を妨げない最小限の機能だけである。」
                </blockquote>
              </figure>
            </div>

            <nav
              className="mt-9 flex flex-wrap items-baseline gap-x-7 gap-y-2 border-t border-[#d9d6d0] pt-3.5 text-sm text-[#54524d]"
              aria-label="ページ内案内"
            >
              <span className="text-[11px] uppercase tracking-[0.22em]">In this sheet</span>
              {TOOLS.map((tool) => (
                <a key={tool.number} href={`#plate-${tool.number}`} className="text-[#201e1d] no-underline hover:text-[#0088b0]">
                  <span className="mr-2 text-[#8a857d]">{tool.number}</span>
                  {tool.name}
                </a>
              ))}
            </nav>
          </section>

          <section className={`pt-[52px] ${SHEET_PADDING}`}>
            <div className="flex items-baseline justify-between gap-5 pb-3.5">
              <h2 className="font-mincho text-2xl font-semibold">刷版一覧</h2>
              <span className={`hidden min-[560px]:inline ${LABEL}`}>Plates — 3 tools</span>
            </div>
            {TOOLS.map((tool, index) => (
              <PlateRow key={tool.number} tool={tool} isFirst={index === 0} isLast={index === TOOLS.length - 1} />
            ))}
          </section>

          <section className={`pt-16 ${SHEET_PADDING}`}>
            <div className="mb-7 flex items-baseline justify-between gap-5">
              <h2 className="font-mincho text-2xl font-semibold">なぜ、LifeMarginなのか</h2>
              <span className={`hidden min-[560px]:inline ${LABEL}`}>Colophon</span>
            </div>
            <div className="grid gap-7 min-[900px]:grid-cols-3 min-[900px]:gap-11">
              {PHILOSOPHY.map((item) => (
                <div key={item.number}>
                  <span className="block text-xs tracking-[0.16em] text-[#54524d]">{item.number}</span>
                  <p className="mt-3 text-base leading-[1.9] text-[#54524d]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <div className={`pb-[52px] pt-14 ${SHEET_PADDING}`}>
            {/* 8色 × 44px = 352px。狭い画面では折り返さず、各色が等分に縮む。 */}
            <div className="flex w-full max-w-[352px] flex-row flex-nowrap" aria-hidden="true">
              {SCALE.map((color) => (
                <span key={color} className="h-[22px] min-w-0 flex-1" style={{ backgroundColor: color }} />
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-3 border-t border-[#d9d6d0] pt-3.5 text-xs tracking-[0.06em] text-[#8a857d]">
              <span>LifeMargin — proof sheet</span>
              <span className="uppercase tracking-[0.22em]">Small tools, plenty of margin</span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
