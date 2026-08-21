interface EditorStatsProps {
  value: string;
}

function countLines(value: string): number {
  return value.length === 0 ? 1 : value.split(/\r\n|\r|\n/).length;
}

function countLineBreaks(value: string): number {
  return (value.match(/\r\n|\r|\n/g) ?? []).length;
}

function countCharacters(value: string): number {
  return Array.from(value.replace(/\r\n|\r|\n/g, "")).length;
}

export function EditorStats({ value }: EditorStatsProps) {
  const characterCount = countCharacters(value);
  const lineCount = countLines(value);
  const lineBreakCount = countLineBreaks(value);

  return (
    <div
      className="flex shrink-0 items-center justify-between border-t border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
      aria-label="文章の統計"
    >
      <span>文字数 {characterCount}</span>
      <span>行数 {lineCount}</span>
      <span>改行 {lineBreakCount}</span>
      <span className="text-zinc-400 dark:text-zinc-500">Markdownを編集中</span>
    </div>
  );
}
