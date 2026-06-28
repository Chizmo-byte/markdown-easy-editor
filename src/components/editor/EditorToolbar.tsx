"use client";

/**
 * 記法挿入ツールバー（エディタ上部・教育型）。
 *
 * 各ボタンはマークダウン記法を挿入しつつ、ホバー時に「なぜその記法を使うのか」
 * という教育的 Tips をツールチップで表示する。記法入力の手間をゼロにしながら、
 * 文章構成の作法を学べる状態をつくることが狙い。
 *
 * 挿入の実処理は持たず、押された記法（ToolbarAction）を onInsert で親へ通知する。
 */

/** ボタンが要求する挿入操作。 */
export type ToolbarAction =
  | { kind: "wrap"; marker: string } // 選択範囲を marker で囲む（強調など）
  | { kind: "insert"; snippet: string }; // カーソル位置に snippet を挿入

interface ToolbarButtonDef {
  label: string;
  tip: string;
  action: ToolbarAction;
}

const BUTTONS: ReadonlyArray<ToolbarButtonDef> = [
  {
    label: "見出し",
    tip: "ここが文章の看板です。読者が一目で内容を理解できる結論を書きましょう",
    action: { kind: "insert", snippet: "# " },
  },
  {
    label: "リスト",
    tip: "箇条書きはスマホで最も読みやすい形式です。要点を絞って提示しましょう",
    action: { kind: "insert", snippet: "- " },
  },
  {
    label: "引用",
    tip: "権威ある言葉や、過去の自分の気づきを引用して、説得力を高めましょう",
    action: { kind: "insert", snippet: "> " },
  },
  {
    label: "強調",
    tip: "ここが一番伝えたい核心です。太字で視覚的なフックを作りましょう",
    action: { kind: "wrap", marker: "**" },
  },
  {
    label: "区切り",
    tip: "話題が変わるタイミングで挿入し、読者の脳をリセットさせてあげましょう",
    action: { kind: "insert", snippet: "\n---\n" },
  },
];

interface EditorToolbarProps {
  /** ボタン押下時に、その記法の挿入操作を通知する。 */
  onInsert: (action: ToolbarAction) => void;
}

export function EditorToolbar({ onInsert }: EditorToolbarProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-hairline bg-surface p-2.5">
      {BUTTONS.map(({ label, tip, action }) => (
        <div key={label} className="group relative">
          <button
            type="button"
            onClick={() => onInsert(action)}
            className="flex items-center gap-1 rounded-full border border-hairline bg-canvas px-3.5 py-1.5 text-xs font-medium text-ink-secondary transition-colors hover:border-accent hover:bg-accent-soft hover:text-accent-ink"
          >
            {label}
          </button>
          {/* ツールチップ: 入力を妨げないよう pointer-events-none。ホバー/フォーカスでふわっと表示。 */}
          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-ink px-2.5 py-1.5 text-[10px] text-surface opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            {tip}
          </span>
        </div>
      ))}
    </div>
  );
}
