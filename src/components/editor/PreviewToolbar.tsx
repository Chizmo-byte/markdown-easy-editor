"use client";

/**
 * プレビュー右上のフローティング操作群（コピー / 保存）とトースト通知。
 *
 * - コピー: navigator.clipboard で浄化後テキストをクリップボードへ。
 *   成功時に「コピー完了！」を 2 秒だけ表示し、ふわっとフェードアウトする。
 * - 保存: applyTemplate で生成した内容を Blob 化し、擬似 <a> クリックで保存。
 */

import { useCallback, useEffect, useRef, useState } from "react";

import type { TargetPlatform } from "@/lib/markdown/processor";
import { applyTemplate } from "@/lib/markdown/templates";

interface PreviewToolbarProps {
  /** プレビューに表示中の浄化後テキスト。 */
  source: string;
  /** 出力先プラットフォーム（保存テンプレートの選択に使う）。 */
  target: TargetPlatform;
}

const TOAST_DURATION_MS = 2000;

export function PreviewToolbar({ source, target }: PreviewToolbarProps) {
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // アンマウント時にタイマーを後始末する。
  useEffect(() => {
    return () => {
      if (toastTimer.current !== null) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimer.current !== null) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToastVisible(false);
    }, TOAST_DURATION_MS);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(source);
      showToast();
    } catch {
      // クリップボード API が使えない環境では何もしない。
    }
  }, [source, showToast]);

  const handleSave = useCallback(() => {
    const { fileName, content } = applyTemplate(source, target);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, [source, target]);

  const disabled = source.length === 0;
  const buttonClass =
    "rounded-md border border-gray-300 bg-white/90 px-3 py-1.5 text-sm font-medium " +
    "text-gray-700 shadow-sm backdrop-blur transition-all duration-150 " +
    "hover:bg-gray-100 hover:text-gray-900 hover:shadow active:scale-95 " +
    "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/90";

  return (
    <>
      <div className="absolute right-3 top-3 flex gap-2">
        <button type="button" onClick={handleCopy} disabled={disabled} className={buttonClass}>
          コピー
        </button>
        <button type="button" onClick={handleSave} disabled={disabled} className={buttonClass}>
          保存
        </button>
      </div>

      <div
        role="status"
        aria-live="polite"
        className={
          "pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full " +
          "bg-gray-800 px-4 py-1.5 text-sm text-white shadow-lg transition-opacity duration-500 " +
          (toastVisible ? "opacity-100" : "opacity-0")
        }
      >
        コピー完了！
      </div>
    </>
  );
}
