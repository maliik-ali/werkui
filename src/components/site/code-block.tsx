import { highlight } from "@/lib/highlight";
import { CodeFrame } from "./code-frame";

export async function CodeBlock({ code, lang = "tsx", className }: { code: string; lang?: string; className?: string }) {
  return <CodeFrame html={await highlight(code, lang)} source={code} className={className} />;
}
