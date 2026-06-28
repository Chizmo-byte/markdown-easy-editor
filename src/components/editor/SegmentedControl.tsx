"use client";

/**
 * 汎用セグメントコントロール（誠実でシンプルなグレー基調）。
 * 選択中のセグメントを濃色で強調する制御コンポーネント。
 * モード切り替え・プラットフォーム選択など、択一 UI で共通利用する。
 */

interface SegmentOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  /** 選択肢。 */
  options: ReadonlyArray<SegmentOption<T>>;
  /** 現在選択中の値。 */
  value: T;
  /** 選択変更時に呼ばれる。 */
  onChange: (value: T) => void;
  /** スクリーンリーダー向けのグループ名。 */
  ariaLabel: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-full border border-hairline bg-canvas p-0.5"
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 " +
              (active
                ? "bg-ink text-surface shadow-sm"
                : "text-ink-muted hover:text-ink")
            }
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
