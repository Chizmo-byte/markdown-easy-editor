import Link from "next/link";

export function SiteHeader({ current }: { current?: "editor" | "about" | "privacy" | "terms" | "contact" }) {
  return (
    <header className="border-b border-[#d8d5d2] bg-[#f3f2f2] text-[#201e1d]">
      <div className="mx-auto flex min-h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="group flex shrink-0 items-center gap-2" aria-label="LifeMarginトップへ">
          <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden bg-[#201e1d] font-serif text-sm font-bold text-[#f3f2f2]">
            <span className="absolute -translate-x-0.5 -translate-y-0.5 text-[#0088b0]">L</span>
            <span className="absolute translate-x-0.5 translate-y-0.5 text-[#d6006c]">L</span>
            <span className="relative">L</span>
          </span>
          <span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.28em] text-[#6f6a66]">LifeMargin</span>
            <span className="block font-serif text-sm font-bold tracking-tight group-hover:text-[#0088b0]">余白のある道具</span>
          </span>
        </Link>
        <nav aria-label="サイト内ナビゲーション" className="flex items-center gap-3 overflow-x-auto text-xs text-[#6f6a66] sm:gap-5">
          <Link className={current === "editor" ? "font-semibold text-[#0088b0]" : "hover:text-[#0088b0]"} href="/editor">Markdown Editor</Link>
          <Link className={current === "about" ? "font-semibold text-[#0088b0]" : "hover:text-[#0088b0]"} href="/about">LifeMarginについて</Link>
          <Link className={current === "contact" ? "font-semibold text-[#d6006c]" : "hover:text-[#d6006c]"} href="/contact">お問い合わせ</Link>
        </nav>
      </div>
    </header>
  );
}
