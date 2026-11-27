import registry from "../../registry.json";

type CssTree = { [key: string]: string | CssTree };

function render(tree: CssTree, depth = 0): string {
  const pad = "  ".repeat(depth);
  return Object.entries(tree)
    .map(([key, value]) =>
      typeof value === "string"
        ? `${pad}${key}: ${value};`
        : `${pad}${key} {\n${render(value, depth + 1)}\n${pad}}`,
    )
    .join("\n");
}

type Item = { name: string; type: string; dependencies?: string[]; css?: CssTree };

export function getRegistryItem(slug: string): Item | undefined {
  return (registry.items as Item[]).find((i) => i.name === slug);
}

/** The CSS a component needs in the user's globals.css, built from registry.json. */
export function registryCss(slug: string): string | null {
  const css = getRegistryItem(slug)?.css;
  return css ? render(css) : null;
}

/** Where the shadcn CLI places the file in the user's project. */
export function installTarget(slug: string): string {
  return getRegistryItem(slug)?.type === "registry:ui" ? `components/ui/${slug}.tsx` : `components/${slug}.tsx`;
}
