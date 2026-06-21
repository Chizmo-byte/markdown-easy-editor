"use client";

/**
 * Toolbar — 記号挿入ボタン群（アイコン＋ガイド付き）。
 * ルールベースDB（MARKDOWN_RULES）を読み込み、各ルールをボタン化する。
 */

import { MARKDOWN_RULES } from "@/lib/markdown/rules";
import { Tooltip } from "@/components/markdown-editor/Tooltip";

interface ToolbarProps {
  /** ボタン押下時にルール id を渡す。 */
  onInsert: (ruleId: string) => void;
}

export function Toolbar({ onInsert }: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
      {MARKDOWN_RULES.map((rule) => (
        <Tooltip key={rule.id} label={rule.guide}>
          <button
            type="button"
            aria-label={rule.label}
            onClick={() => onInsert(rule.id)}
            className="flex h-9 min-w-9 items-center justify-center rounded-md border border-zinc-200 bg-white px-2 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
          >
            <span aria-hidden className="font-mono">
              {rule.icon}
            </span>
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
