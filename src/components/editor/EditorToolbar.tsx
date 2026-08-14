"use client";

export type ToolbarAction =
  | { kind: "line-prefix"; prefix: string; label: string }
  | { kind: "wrap"; marker: string; label: string }
  | { kind: "link"; label: string };

interface ToolbarButtonDef {
  label: string;
  shortcut: string;
  tip: string;
  action: ToolbarAction;
}

const BUTTONS: ReadonlyArray<ToolbarButtonDef> = [
  {
    label: "見出し",
    shortcut: "# 見出し",
    tip: "文章の構造を示すタイトルです。現在の行に見出しを付けます。",
    action: { kind: "line-prefix", prefix: "# ", label: "見出し" },
  },
  {
    label: "太字",
    shortcut: "**文字**",
    tip: "重要な言葉を目立たせます。文字を選択してから押すと、その範囲を強調できます。",
    action: { kind: "wrap", marker: "**", label: "太字" },
  },
  {
    label: "斜体",
    shortcut: "*文字*",
    tip: "軽く強調したい言葉に使います。",
    action: { kind: "wrap", marker: "*", label: "斜体" },
  },
  {
    label: "リスト",
    shortcut: "- 項目",
    tip: "項目を並べるときに使います。選択した複数行にも適用できます。",
    action: { kind: "line-prefix", prefix: "- ", label: "リスト" },
  },
  {
    label: "引用",
    shortcut: "> 引用",
    tip: "誰かの言葉や補足を引用するときに使います。",
    action: { kind: "line-prefix", prefix: "> ", label: "引用" },
  },
  {
    label: "リンク",
    shortcut: "[文字](URL)",
    tip: "Webページなどのリンクを付けます。選択文字がリンクの表示名になります。",
    action: { kind: "link", label: "リンク" },
  },
  {
    label: "コード",
    shortcut: "`code`",
    tip: "短いコードやコマンドを文中で示します。",
    action: { kind: "wrap", marker: "`", label: "コード" },
  },
];

interface EditorToolbarProps {
  onInsert: (action: ToolbarAction) => void;
  activeHelp: string | null;
  onHelpChange: (help: string | null) => void;
}

export function EditorToolbar({ onInsert, activeHelp, onHelpChange }: EditorToolbarProps) {
  const selected = BUTTONS.find((button) => button.label === activeHelp);

  return (
    <div className="relative z-20 shrink-0 border-b bg-white">
      <div className="flex gap-1.5 overflow-x-auto p-2">
        {BUTTONS.map(({ label, shortcut, tip, action }) => {
          const isActive = activeHelp === label;
          return (
            <div key={label} className="group relative shrink-0">
              <button
                type="button"
                onClick={() => onInsert(action)}
                onMouseEnter={() => onHelpChange(label)}
                onMouseLeave={() => onHelpChange(null)}
                onFocus={() => onHelpChange(label)}
                onBlur={() => onHelpChange(null)}
                aria-describedby={`help-${label}`}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "border-zinc-800 bg-zinc-800 text-white"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:bg-white"
                }`}
              >
                {label}
              </button>
              <span
                id={`help-${label}`}
                role="tooltip"
                className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-56 -translate-x-1/2 rounded-lg bg-zinc-900 p-3 text-left text-xs text-white shadow-xl group-hover:block group-focus-within:block"
              >
                <strong className="block text-zinc-100">{shortcut}</strong>
                <span className="mt-1 block leading-relaxed text-zinc-300">{tip}</span>
              </span>
            </div>
          );
        })}
      </div>
      {selected && (
        <div className="border-t bg-zinc-50 px-3 py-2 text-xs text-zinc-600">
          <span className="font-semibold text-zinc-800">{selected.label}</span>
          <span className="mx-2 text-zinc-300">—</span>
          {selected.tip}
        </div>
      )}
    </div>
  );
}
