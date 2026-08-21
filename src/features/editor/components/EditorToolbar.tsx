"use client";

import { useState } from "react";

export type ToolbarAction =
  | { kind: "line-prefix"; prefix: string; label: string }
  | { kind: "wrap"; marker: string; label: string }
  | { kind: "link"; label: string }
  | { kind: "insert"; snippet: string; label: string };

interface ToolbarButtonDef {
  label: string;
  shortcut: string;
  tip: string;
  action: ToolbarAction;
}

const BASIC_BUTTONS: ReadonlyArray<ToolbarButtonDef> = [
  { label: "見出し", shortcut: "# 見出し", tip: "文章の構造を示すタイトルです。現在の行に見出しを付けます。", action: { kind: "line-prefix", prefix: "# ", label: "見出し" } },
  { label: "太字", shortcut: "**文字**", tip: "重要な言葉を目立たせます。選択範囲を太字にできます。", action: { kind: "wrap", marker: "**", label: "太字" } },
  { label: "斜体", shortcut: "*文字*", tip: "軽く強調したい言葉に使います。", action: { kind: "wrap", marker: "*", label: "斜体" } },
  { label: "リスト", shortcut: "- 項目", tip: "項目を並べます。選択した複数行にも適用できます。", action: { kind: "line-prefix", prefix: "- ", label: "リスト" } },
  { label: "番号", shortcut: "1. 手順", tip: "順番のある手順やランキングを表します。", action: { kind: "line-prefix", prefix: "1. ", label: "番号付きリスト" } },
  { label: "引用", shortcut: "> 引用", tip: "誰かの言葉や補足を引用するときに使います。", action: { kind: "line-prefix", prefix: "> ", label: "引用" } },
  { label: "リンク", shortcut: "[文字](URL)", tip: "Webページなどのリンクを付けます。", action: { kind: "link", label: "リンク" } },
];

const MORE_BUTTONS: ReadonlyArray<ToolbarButtonDef> = [
  { label: "コード", shortcut: "`code`", tip: "短いコードやコマンドを文中で示します。", action: { kind: "wrap", marker: "`", label: "コード" } },
  { label: "コードブロック", shortcut: "```code```", tip: "複数行のコードを表示します。AIが作ったコード例に便利です。", action: { kind: "insert", snippet: "```\nコード\n```", label: "コードブロック" } },
  { label: "表", shortcut: "| 項目 | 内容 |", tip: "項目を行と列で比較・整理します。", action: { kind: "insert", snippet: "| 項目 | 内容 |\n| --- | --- |\n| 例 | 説明 |", label: "表" } },
  { label: "チェック", shortcut: "- [ ] TODO", tip: "作業の完了・未完了をチェックリストで管理します。", action: { kind: "insert", snippet: "- [ ] やること", label: "タスクリスト" } },
  { label: "取消線", shortcut: "~~文字~~", tip: "修正前の内容や取り消した文章を示します。", action: { kind: "wrap", marker: "~~", label: "取り消し線" } },
  { label: "区切り", shortcut: "---", tip: "話題の変わり目に水平線を入れます。", action: { kind: "insert", snippet: "\n---\n", label: "水平線" } },
];

interface EditorToolbarProps {
  onInsert: (action: ToolbarAction) => void;
  activeHelp: string | null;
  onHelpChange: (help: string | null) => void;
}

export function EditorToolbar({ onInsert, activeHelp, onHelpChange }: EditorToolbarProps) {
  const [showMore, setShowMore] = useState(false);
  const buttons = showMore ? [...BASIC_BUTTONS, ...MORE_BUTTONS] : BASIC_BUTTONS;
  const selected = [...BASIC_BUTTONS, ...MORE_BUTTONS].find((button) => button.action.label === activeHelp);

  return (
    <div className="relative z-20 shrink-0 border-b bg-white dark:border-zinc-700 dark:bg-zinc-800">
      <div className="flex gap-1.5 overflow-x-auto p-2">
        {buttons.map(({ label, shortcut, tip, action }) => {
          const isActive = activeHelp === action.label;
          return (
            <div key={label} className="group relative shrink-0">
              <button
                type="button"
                onClick={() => onInsert(action)}
                onMouseEnter={() => onHelpChange(action.label)}
                onMouseLeave={() => onHelpChange(null)}
                onFocus={() => onHelpChange(action.label)}
                onBlur={() => onHelpChange(null)}
                aria-describedby={`help-${action.label}`}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${isActive ? "border-zinc-800 bg-zinc-800 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900" : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-400 hover:bg-white dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:bg-zinc-700"}`}
              >
                {label}
              </button>
              <span id={`help-${action.label}`} role="tooltip" className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 hidden w-56 -translate-x-1/2 rounded-lg bg-zinc-900 p-3 text-left text-xs text-white shadow-xl group-hover:block group-focus-within:block dark:bg-zinc-700">
                <strong className="block text-zinc-100">{shortcut}</strong>
                <span className="mt-1 block leading-relaxed text-zinc-300">{tip}</span>
              </span>
            </div>
          );
        })}
        <button type="button" onClick={() => setShowMore((value) => !value)} className="shrink-0 rounded-md border border-dashed border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-500 hover:border-zinc-500 hover:text-zinc-800 dark:border-zinc-600 dark:text-zinc-400 dark:hover:border-zinc-400 dark:hover:text-zinc-100">
          {showMore ? "閉じる" : "その他"}
        </button>
      </div>
      {selected && (
        <div className="border-t bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">{selected.action.label}</span>
          <span className="mx-2 text-zinc-300 dark:text-zinc-600">—</span>
          {selected.tip}
        </div>
      )}
    </div>
  );
}
