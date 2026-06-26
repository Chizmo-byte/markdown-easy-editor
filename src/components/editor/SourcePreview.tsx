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
    <pre className="h-full w-full overflow-auto whitespace-pre-wrap break-words bg-white p-4 font-mono text-sm text-gray-800">
      {source.length > 0 ? (
        source
      ) : (
        <span className="text-gray-400">整形結果がここに表示されます</span>
      )}
    </pre>
  );
}
