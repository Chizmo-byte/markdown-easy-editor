"use client";

/**
 * Editor — マークダウン入力エリア。
 * 状態は持たず、props で受け取った値・ハンドラを反映するだけの軽量コンポーネント。
 */

import type { RefObject } from "react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export function Editor({ value, onChange, textareaRef }: EditorProps) {
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      spellCheck={false}
      aria-label="マークダウン入力"
      placeholder="ここにマークダウンを入力してください…"
      className="h-full w-full resize-none bg-white p-4 font-mono text-sm leading-relaxed text-zinc-800 outline-none placeholder:text-zinc-400 dark:bg-zinc-950 dark:text-zinc-100"
    />
  );
}
