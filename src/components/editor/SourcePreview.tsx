"use client";

/**
 * ソースプレビュー（右カラム）。
 * processMarkdown で整形した「マークダウンソース」をそのまま等幅表示する。
 * HTML へはレンダリングしない（教育用途のため、整形後の生テキストを見せる）。
 */

interface SourcePreviewProps {
  /** 整形後のマークダウンソース。 */
  source: string;
}

export function SourcePreview({ source }: SourcePreviewProps) {
  return (
    <pre className="h-full w-full overflow-auto whitespace-pre-wrap break-words bg-surface p-4 font-mono text-sm text-ink">
      {source.length > 0 ? (
        source
      ) : (
        <span className="text-ink-muted">整形結果がここに表示されます</span>
      )}
    </pre>
  );
}
