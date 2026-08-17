import Link from "next/link";
import { SiteFooter } from "@/components/shared/SiteFooter";
import { SiteHeader } from "@/components/shared/SiteHeader";

interface Tool {
  number: string;
  name: string;
  description: string;
  href?: string;
  status: "available" | "coming";
  accent: "cyan" | "magenta" | "lime";
}

const TOOLS: ReadonlyArray<Tool> = [
  {
    number: "01",
    name: "Markdown Easy Editor",
    description: "Markdownを書きながら、記法の意味と見た目を学べるメインツール。AIが生成した文章やメモも、気軽に整えられます。",
    href: "/editor",
    status: "available",
    accent: "cyan",
  },
  {
    number: "02",
    name: "子どもの学びツール",
    description: "遊びながら、考える力と知る楽しさを育てるツールを制作しています。",
    status: "coming",
    accent: "lime",
  },
  {
    number: "03",
    name: "ぬりえジェネレーター",
    description: "自分だけのぬりえをつくって楽しめるツールを制作しています。",
    status: "coming",
    accent: "magenta",
  },
];

const PHILOSOPHY: ReadonlyArray<string> = [
  "現代のデジタルツールは多機能になりすぎている。しかし、本当に必要なのは、思考を妨げない最小限の機能だけである。",
  "LifeMarginは、不要な装飾や複雑な操作を削ぎ落とし、本質的なアウトプットに集中できる誠実な道具をつくります。",
  "ツールによって生まれた時間のゆとりこそが、人生の余白（Margin）となり、新しい創造性を生むと信じています。",
];

const ACCENT_CLASSES = {
  cyan: { line: "bg-[#0088b0]", number: "text-[#0088b0]", button: "bg-[#0088b0] text-white hover:bg-[#006f91]" },
  magenta: { line: "bg-[#d6006c]", number: "text-[#d6006c]", button: "bg-[#d6006c] text-white hover:bg-[#b4005a]" },
  lime: { line: "bg-[#9fe870]", number: "text-[#4d6d38]", button: "border-[#b8c9ae] bg-[#f2f8ed] text-[#4d6d38]" },
} as const;

function ToolCard({ tool }: { tool: Tool }) {
  const accent = ACCENT_CLASSES[tool.accent];
  const card = (
    <article className="group relative flex min-h-[300px] flex-col overflow-hidden border border-[#d8d5d2] bg-[#faf9f8] p-7 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#d8d5d2] sm:p-8">
      <div className={`absolute inset-x-0 top-0 h-1.5 ${accent.line}`} />
      <div className="flex items-start justify-between gap-4">
        <span className={`font-serif text-7xl font-bold leading-none tracking-[-0.08em] opacity-80 ${accent.number}`} aria-hidden="true">{tool.number}</span>
        {tool.status === "coming" ? <span className="border border-[#d8d5d2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#817a75]">制作中</span> : null}
      </div>
      <h3 className="mt-8 font-serif text-2xl font-bold tracking-tight text-[#201e1d]">{tool.name}</h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-[#6f6a66]">{tool.description}</p>
      <div className="mt-7">
        {tool.status === "available" && tool.href ? (
          <span className={`inline-flex items-center px-5 py-2.5 text-sm font-semibold transition-colors ${accent.button}`}>使ってみる <span className="ml-2" aria-hidden="true">↗</span></span>
        ) : (
          <span className="text-xs font-medium tracking-wide text-[#817a75]">近日公開予定</span>
        )}
      </div>
    </article>
  );

  return tool.href ? <Link href={tool.href} aria-label={`${tool.name}を開く`}>{card}</Link> : card;
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#f3f2f2] text-[#201e1d]">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pb-32 sm:pt-28">
          <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.32em] text-[#6f6a66]">LifeMargin / Tools for a little more room</p>
              <h1 className="mt-8 max-w-3xl font-serif text-5xl font-bold leading-[1.08] tracking-[-0.04em] sm:text-7xl">
                考える時間と、<br />
                <span className="relative inline-block">書く時間に、<span className="relative">余白を。</span></span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-[#6f6a66] sm:text-lg">LifeMarginは、デジタル作業のムダを削ぎ落とし、思考の整理とアウトプットを軽くする、小さな道具をつくっています。</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#tools" className="inline-flex items-center bg-[#201e1d] px-6 py-3 text-sm font-semibold text-[#f3f2f2] transition-colors hover:bg-[#0088b0]">ツールを見る <span className="ml-3" aria-hidden="true">↓</span></a>
                <Link href="/about" className="inline-flex items-center border border-[#bdb8b4] px-6 py-3 text-sm font-semibold text-[#201e1d] hover:border-[#201e1d]">LifeMarginについて</Link>
              </div>
            </div>
            <div className="relative min-h-[230px] lg:min-h-[300px]" aria-hidden="true">
              <div className="absolute right-4 top-0 font-serif text-[12rem] font-bold leading-none tracking-[-0.12em] text-[#0088b0]/50">01</div>
              <div className="absolute right-0 top-1 font-serif text-[12rem] font-bold leading-none tracking-[-0.12em] text-[#d6006c]/50">01</div>
              <div className="absolute right-2 top-0 font-serif text-[12rem] font-bold leading-none tracking-[-0.12em] text-[#201e1d]">01</div>
              <div className="absolute bottom-5 right-0 flex">
                <span className="h-8 w-16 bg-[#0088b0]" /><span className="h-8 w-16 bg-[#d6006c]" /><span className="h-8 w-16 bg-[#b9a400]" /><span className="h-8 w-16 bg-[#201e1d]" /><span className="h-8 w-16 bg-[#9fe870]" />
              </div>
            </div>
          </div>
        </section>

        <section id="tools" className="border-y border-[#d8d5d2] bg-[#faf9f8] px-6 py-20 scroll-mt-10 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-6">
              <div><p className="text-xs font-medium uppercase tracking-[0.28em] text-[#0088b0]">01 — Tools</p><h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">つくっている道具</h2></div>
              <p className="hidden max-w-xs text-right text-sm leading-6 text-[#817a75] sm:block">ひとつずつ、必要なものを。<br />公開済みのツールからお試しください。</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">{TOOLS.map((tool) => <ToolCard key={tool.number} tool={tool} />)}</div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div><p className="text-xs font-medium uppercase tracking-[0.28em] text-[#d6006c]">02 — Philosophy</p><h2 className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl">なぜ、<br />LifeMarginなのか。</h2></div>
            <div className="space-y-7 border-l-2 border-[#d6006c] pl-6 sm:pl-10">{PHILOSOPHY.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-[#6f6a66]">{paragraph}</p>)}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
