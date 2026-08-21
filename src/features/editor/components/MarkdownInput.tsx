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
  /** textarea への参照（ツールバーの記法挿入で使用）。 */
  textareaRef?: React.Ref<HTMLTextAreaElement>;
}

export function MarkdownInput({
  value,
  onChange,
  textareaRef,
}: MarkdownInputProps) {
  // bg-canvas / text-ink / text-ink-muted は旧デザインの名残で、現在の @theme に
  // 定義が無く実際には効いていなかったため、zinc系のクラスへ置き換えている。
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="ここに文章を入力、またはObsidianからペーストしてください"
      spellCheck={false}
      aria-label="マークダウン入力"
      className="h-full w-full resize-none bg-white p-4 font-mono text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:bg-zinc-800 dark:text-zinc-50 dark:placeholder:text-zinc-500"
    />
  );
}
