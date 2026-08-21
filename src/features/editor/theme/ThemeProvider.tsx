"use client";

import { createContext, useCallback, useContext, useEffect, useSyncExternalStore } from "react";
import { THEME_DARK_CLASS, THEME_STORAGE_KEY, type Theme } from "@/features/editor/theme/theme";

interface ThemeContextValue {
  /** 実際に適用されている配色。 */
  theme: Theme;
  /** ユーザーが手動で選んだ配色。null ならOS設定に追従する。 */
  preference: Theme | null;
  /** 現在の配色を反転して保存する。 */
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const DARK_QUERY = "(prefers-color-scheme: dark)";

/* -------------------------------------------------------------------------
 * 手動選択（localStorage）を外部ストアとして購読する。
 * localStorage は React の外にある状態なので、effect + setState ではなく
 * useSyncExternalStore で読む。別タブでの変更にも storage イベントで追従できる。
 * ---------------------------------------------------------------------- */

const preferenceListeners = new Set<() => void>();

function subscribePreference(onStoreChange: () => void): () => void {
  preferenceListeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    preferenceListeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/** 戻り値は文字列（プリミティブ）なので、毎回読み直しても再描画ループにはならない。 */
function getPreferenceSnapshot(): Theme | null {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    // プライベートモード等で localStorage が使えない場合はOS設定に従う。
    return null;
  }
}

/** SSR時は判定できないため「未選択」を返す。 */
function getPreferenceServerSnapshot(): Theme | null {
  return null;
}

function storePreference(next: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // 保存できない環境では、その場の切り替えだけを行う。
  }
  preferenceListeners.forEach((listener) => listener());
}

/* -------------------------------------------------------------------------
 * OS設定（prefers-color-scheme）の購読。
 * ---------------------------------------------------------------------- */

function subscribeSystemTheme(onStoreChange: () => void): () => void {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSystemThemeSnapshot(): Theme {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function getSystemThemeServerSnapshot(): Theme {
  return "light";
}

/* ---------------------------------------------------------------------- */

const noopSubscribe = (): (() => void) => () => {};

/**
 * /editor 配下のダークモード状態を保持する。
 * 初回描画時点の <html class="dark"> は描画前の初期化スクリプト（THEME_INIT_SCRIPT）が
 * 付けているため、ここではhydration後の同期と、トグル・OS設定変更への追従を担当する。
 */
export function ThemeProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const preference = useSyncExternalStore(
    subscribePreference,
    getPreferenceSnapshot,
    getPreferenceServerSnapshot,
  );
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemThemeSnapshot,
    getSystemThemeServerSnapshot,
  );
  // hydration中はサーバー側の値（light）しか見えていない。その値でクラスを書き換えると
  // 初期化スクリプトの結果を一瞬打ち消してしまうため、hydration完了までDOMに触れない。
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  // 手動選択があればそれを優先し、無ければOS設定に追従する。
  const theme: Theme = preference ?? systemTheme;

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.classList.toggle(THEME_DARK_CLASS, theme === "dark");
  }, [hydrated, theme]);

  // ダークモードは /editor だけの機能のため、離脱時にクラスを残さない。
  useEffect(() => {
    return () => document.documentElement.classList.remove(THEME_DARK_CLASS);
  }, []);

  const toggleTheme = useCallback(() => {
    // 未選択（OS設定に追従中）の場合は、いま見えている配色を基準に反転する。
    const current = getPreferenceSnapshot() ?? getSystemThemeSnapshot();
    storePreference(current === "dark" ? "light" : "dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, preference, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme は ThemeProvider の内側で使用してください");
  return context;
}
