interface EditorStatsProps {
  value: string;
}

function countLines(value: string): number {
  return value.length === 0 ? 1 : value.split(/\r\n|\r|\n/).length;
}

function countCharacters(value: string): number {
  return Array.from(value).length;
}

export function EditorStats({ value }: EditorStatsProps) {
  const characterCount = countCharacters(value);
  const lineCount = countLines(value);

  return (
    <div
      className="flex shrink-0 items-center justify-between border-t border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] text-zinc-500"
      aria-label="文章の統計"
    >
      <span>文字数 {characterCount}</span>
      <span>行数 {lineCount}</span>
      <span className="text-zinc-400">Markdownを編集中</span>
    </div>
  );
}
