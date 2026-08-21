/**
 * エディタのカラーテーマ定義。
 * サーバーコンポーネント（editor/layout.tsx）とクライアント側の ThemeProvider の
 * 両方から読み込むため、"use client" を付けない素のモジュールとして分離している。
 */

/** 実際に適用される配色。 */
export type Theme = "light" | "dark";

/** localStorage に保存する「ユーザーが手動で選んだ配色」。null相当（未保存）はOS設定に従う。 */
export const THEME_STORAGE_KEY = "lifemargin:editor-theme";

/** <html> に付与するクラス名（Tailwind v4 の dark バリアントの基点）。 */
export const THEME_DARK_CLASS = "dark";

/**
 * 描画前に <html> へ dark クラスを付けるための初期化スクリプト。
 * FOUC（一瞬のちらつき）を避けるため、React の描画を待たず HTML パース時に同期実行する。
 * 判定順は localStorage の保存値 → prefers-color-scheme。
 * localStorage が使えない環境（プライベートモード等）でも落ちないよう try/catch で囲む。
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var d=s==="dark"||(s!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle(${JSON.stringify(
  THEME_DARK_CLASS,
)},d);}catch(e){}})();`;
