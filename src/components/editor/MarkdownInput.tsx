"use client";

/**
 * 入力エリア（左カラム）。
 * 単純な textarea。状態は親が保持し、変更を onChange で通知する。
 */

interface MarkdownInputProps {
  /** 現在の入力テキスト。 */
  value: string;
  /** 入力変更時に呼ばれる。 */
  onChange: (value: string) => void;
}

export function MarkdownInput({ value, onChange }: MarkdownInputProps) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="ここに文章を入力、またはObsidianからペーストしてください"
      spellCheck={false}
      aria-label="マークダウン入力"
      className="h-full w-full resize-none border-r bg-gray-50 p-4 font-mono text-sm outline-none"
    />
  );
}
