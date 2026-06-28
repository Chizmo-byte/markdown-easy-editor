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
      className="border-t bg-gray-50 px-4 py-8"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="quick-start-heading"
          className="mb-1 text-center text-sm font-bold tracking-wide text-gray-700"
        >
          かんたん3ステップ
        </h2>
        <p className="mb-6 text-center text-xs text-gray-500">
          迷ったら、この順番でやってみてください。
        </p>

        <ol className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map(({ step, title, description }) => (
            <li
              key={step}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-bold text-white">
                  {step}
                </span>
                <h3 className="text-sm font-bold text-gray-900">{title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-gray-600">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
