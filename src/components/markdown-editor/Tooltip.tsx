"use client";

/**
 * Tooltip — 汎用ツールチップ。
 * 子要素にホバー／フォーカスすると説明文を表示する軽量実装（CSS のみで描画）。
 */

import { useId, useState, type ReactNode } from "react";

interface TooltipProps {
  /** 表示する説明文 */
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={() => setOpen(false)}
    >
      <span aria-describedby={id}>{children}</span>
      {open && (
        <span
          id={id}
          role="tooltip"
          className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-56 -translate-x-1/2 rounded-md bg-zinc-900 px-3 py-2 text-xs leading-relaxed text-zinc-50 shadow-lg dark:bg-zinc-700"
        >
          {label}
        </span>
      )}
    </span>
  );
}
