"use client";

/**
 * 整形モードの切り替えスイッチ（セグメントコントロール）。
 * Easy / Optimize の 2 値を持ち、選択中のボタンを濃色で強調する。
 * 状態は持たず、親から受け取った値を表示する制御コンポーネント。
 */

import type { ProcessMode } from "@/lib/markdown/processor";

interface ModeSwitchProps {
  /** 現在選択中のモード。 */
  mode: ProcessMode;
  /** モード変更時に呼ばれる。 */
  onChange: (mode: ProcessMode) => void;
}

const MODES: ReadonlyArray<{ value: ProcessMode; label: string }> = [
  { value: "easy", label: "Easy" },
  { value: "optimize", label: "Optimize" },
];

export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <div
      role="group"
      aria-label="整形モード"
      className="inline-flex rounded-md border border-gray-300 bg-gray-100 p-0.5"
    >
      {MODES.map(({ value, label }) => {
        const active = value === mode;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onChange(value)}
            aria-pressed={active}
            className={
              "rounded px-4 py-1.5 text-sm font-medium transition-colors " +
              (active
                ? "bg-gray-800 text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900")
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
