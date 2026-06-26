"use client";

/**
 * 整形モードの切り替えスイッチ（Easy / Optimize）。
 * 共通の {@link SegmentedControl} を用いた薄いラッパ。
 */

import type { ProcessMode } from "@/lib/markdown/processor";
import { SegmentedControl } from "@/components/editor/SegmentedControl";

interface ModeSwitchProps {
  /** 現在選択中のモード。 */
  mode: ProcessMode;
  /** モード変更時に呼ばれる。 */
  onChange: (mode: ProcessMode) => void;
}

const MODE_OPTIONS = [
  { value: "easy", label: "Easy" },
  { value: "optimize", label: "Optimize" },
] as const;

export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <SegmentedControl
      options={MODE_OPTIONS}
      value={mode}
      onChange={onChange}
      ariaLabel="整形モード"
    />
  );
}
