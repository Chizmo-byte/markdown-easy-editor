import Link from "next/link";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

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
    tags: "時計　/　文章題　/　さくらんぼ計算　/　わり算　/　ものさし　/　小数",
    accent: "lime",
    action: "一覧を見る",
  },
  {
    number: "03",
    name: "ぬりえジェネレーター",
    description:
      "好きなテーマを入力すると、印刷できるぬりえを自動で生成します。線の太さは年齢に合わせて選べます。",
    status: "NEW PLATE",
    accent: "magenta",
    action: "つくってみる",
  },
];

const PHILOSOPHY = [
  {
    number: "I",
    text: "現代のデジタルツールは多機能になりすぎている。しかし、本当に必要なのは、思考を妨げない最小限の機能だけである。",
  },
  {
    number: "II",
    text: "私たちは、不要な装飾や複雑な操作を削ぎ落とし、目的にまっすぐ効く「誠実なツール」を追求します。子ども向けの学習ツールも、同じ考えでつくっています。",
  },
  {
    number: "III",
    text: "ツールによって生まれた時間のゆとりこそが、人生の余白（Margin）となり、新しい創造性を生むと信じているからです。",
  },
];

const ACCENTS = {
  cyan: { number: "text-[#0088b0]", button: "bg-[#9fe870] text-[#201e1d] hover:bg-[#8bdb60]" },
  lime: { number: "text-[#201e1d]", button: "bg-[#201e1d] text-[#f3f2f2] hover:bg-[#0088b0]" },
  magenta: { number: "text-[#d6006c]", button: "border border-[#d6006c] text-[#d6006c] hover:bg-[#d6006c] hover:text-[#f3f2f2]" },
} as const;

function ToolRow({ tool }: { tool: Tool }) {
  const accent = ACCENTS[tool.accent];
  const content = (
    <article className="grid gap-7 border-t border-[#d8d5d2] py-8 sm:grid-cols-[76px_1fr_auto] sm:items-start sm:gap-8 sm:py-10">
      <div className={`font-serif text-6xl font-bold leading-none tracking-[-0.08em] ${accent.number}`} aria-hidden="true">
        {tool.number}
      </div>
      <div className="max-w-2xl">
        <h3 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">{tool.name}</h3>
        <p className="mt-3 text-sm leading-7 text-[#6f6a66] sm:text-base">{tool.description}</p>
        {tool.tags ? <p className="mt-4 text-xs leading-6 text-[#817a75]">{tool.tags}</p> : null}
        {tool.status ? <p className="mt-4 font-mono text-[10px] font-semibold tracking-[0.24em] text-[#d6006c]">{tool.status}</p> : null}
      </div>
      <div className="sm:pt-1">
        {tool.href ? (
          <Link href={tool.href} className={`inline-flex px-5 py-3 text-sm font-semibold transition-colors ${accent.button}`}>
            {tool.action}
          </Link>
        ) : (
          <span className={`inline-flex px-5 py-3 text-sm font-semibold ${accent.button}`}>{tool.action}</span>
        )}
      </div>
    </article>
  );

  return tool.href ? <Link href={tool.href} aria-label={`${tool.name}を開く`} className="block">{content}</Link> : content;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f3f2f2] text-[#201e1d]">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pb-20 sm:pt-20">
          <div className="border-b-2 border-[#201e1d] pb-12 sm:pb-16">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.28em] text-[#6f6a66]">LifeMargin — Proof Sheet</p>
            <h1 className="mt-12 max-w-4xl font-serif text-4xl font-bold leading-tight tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              削ぎ落としてから、渡す。
            </h1>
            <p className="mt-8 max-w-3xl text-base leading-8 text-[#6f6a66] sm:text-lg">
              LifeMarginは、ムダを削ぎ落とした小さな道具をつくっています。多機能である必要はありません。ひとつの目的に、まっすぐ効くこと。大人の道具も、子どもの学習ツールも、同じ考えでつくっています。
            </p>
          </div>

          <div className="border-b border-[#d8d5d2] py-8 sm:py-10">
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-[#6f6a66]">Philosophy</p>
            <blockquote className="mt-6 max-w-4xl font-serif text-xl italic leading-8 sm:text-2xl">
              「本当に必要なのは、思考を妨げない最小限の機能だけである。」
            </blockquote>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 py-6 font-mono text-[10px] uppercase tracking-[0.12em] text-[#6f6a66]" aria-label="ページ内案内">
            <span>IN THIS SHEET</span>
            <a href="#tools" className="hover:text-[#0088b0]">01 Markdown Easy Editor</a>
            <span>02 こどもの学び</span>
            <span>03 ぬりえジェネレーター</span>
          </nav>
        </section>

        <section id="tools" className="scroll-mt-10 px-6 pb-20 sm:pb-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-6 border-b-2 border-[#201e1d] pb-5">
              <h2 className="font-serif text-3xl font-bold tracking-tight sm:text-4xl">刷版一覧</h2>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-[#6f6a66] sm:block">Plates — 3 Tools</p>
            </div>
            <div>{TOOLS.map((tool) => <ToolRow key={tool.number} tool={tool} />)}</div>
          </div>
        </section>

        <section className="border-t-2 border-[#201e1d] px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-6">
              <h2 className="font-serif text-2xl font-bold tracking-tight sm:text-3xl">なぜ、LifeMarginなのか</h2>
              <p className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-[#6f6a66] sm:block">Colophon</p>
            </div>
            <div className="mt-10 space-y-8">
              {PHILOSOPHY.map((item) => (
                <div key={item.number} className="grid gap-3 sm:grid-cols-[44px_1fr] sm:gap-6">
                  <p className="font-mono text-xs text-[#6f6a66]">{item.number}</p>
                  <p className="max-w-4xl text-sm leading-8 text-[#6f6a66] sm:text-base">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-14 flex h-4 max-w-[230px]">
              <span className="flex-1 bg-[#0088b0]" /><span className="flex-1 bg-[#d6006c]" /><span className="flex-1 bg-[#b9a400]" /><span className="flex-1 bg-[#201e1d]" /><span className="flex-1 bg-[#9fe870]" /><span className="flex-1 bg-[#d8d5d2]" /><span className="flex-1 bg-[#e9e7e5]" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
