"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";

interface MarkdownPreviewProps {
  markdown: string;
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
  if (!markdown.trim()) {
    return (
      <div className="flex h-full items-center justify-center p-8 text-center text-sm text-zinc-400 dark:text-zinc-500">
        <div>
          <p className="font-medium text-zinc-500 dark:text-zinc-400">ここにプレビューが表示されます</p>
          <p className="mt-2">左側にMarkdownを書いてみましょう</p>
        </div>
      </div>
    );
  }

  return (
    <article className="markdown-preview h-full overflow-auto bg-white p-5 sm:p-8 dark:bg-zinc-800">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={{
          a: ({ href, children, ...props }) => (
            <a
              {...props}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
