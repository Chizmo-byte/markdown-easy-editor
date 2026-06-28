/**
 * クイックスタートガイド（エディタ下部・静的コンテンツ）。
 *
 * 初めて訪れたユーザーに「貼り付け → 浄化 → 出力」の正解ルート（Golden Path）を
 * 3 ステップで提示し、何をすればいいか考える時間をゼロにする。
 *
 * ロジックは持たない純粋な表示コンポーネント。狭幅では縦並び、広幅では横並びにし、
 * 「誠実でシンプル」なブランドトーンに合わせて控えめな境界線と淡い背景でまとめる。
 */

interface GuideStep {
  /** ステップ番号（視覚的な順序の手がかり）。 */
  step: number;
  title: string;
  description: string;
}

const STEPS: ReadonlyArray<GuideStep> = [
  {
    step: 1,
    title: "貼り付け",
    description:
      "AIが生成した文章や、Obsidianのメモを左側のエディタにペーストしてください。",
  },
  {
    step: 2,
    title: "浄化（Optimize）",
    description:
      "右上のモードを「Optimize」に切り替え、不要なノイズを削ぎ落として「読まれる構成」に整えます。",
  },
  {
    step: 3,
    title: "出力・投稿",
    description:
      "出力先を選択し、「コピー」または「保存」して、そのままnoteやBrainへ投稿しましょう。",
  },
];

export function QuickStartGuide() {
  return (
    <section
      aria-labelledby="quick-start-heading"
      className="border-t border-hairline bg-canvas px-4 py-12"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="quick-start-heading"
          className="mb-1 text-center font-serif text-lg font-semibold tracking-tight text-ink"
        >
          かんたん3ステップ
        </h2>
        <p className="mb-8 text-center text-xs text-ink-muted">
          迷ったら、この順番でやってみてください。
        </p>

        <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STEPS.map(({ step, title, description }) => (
            <li
              key={step}
              className="rounded-3xl border border-hairline bg-surface p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-ink">
                  {step}
                </span>
                <h3 className="font-serif text-base font-semibold text-ink">
                  {title}
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-ink-secondary">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
