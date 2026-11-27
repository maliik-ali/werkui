import { cacheLife } from "next/cache";
import { codeToHtml } from "shiki";

/** Syntax-highlights code to dual-theme HTML. Cached, because shiki reads the clock while tokenizing. */
export async function highlight(code: string, lang = "tsx"): Promise<string> {
  "use cache";
  cacheLife("max");
  return codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
