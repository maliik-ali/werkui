"use client";

import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { CodeFrame } from "./code-frame";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ComponentViewer({
  preview,
  codeHtml,
  source,
}: {
  preview: React.ReactNode;
  codeHtml: string;
  source: string;
}) {
  // Changing the key remounts the demo so its animation plays again.
  const [run, setRun] = useState(0);
  return (
    <Tabs defaultValue="preview" className="w-full">
      <TabsList variant="line">
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <div className="relative grid min-h-[22rem] place-items-center overflow-hidden rounded-xl border bg-card p-6 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]">
          <button
            type="button"
            aria-label="Replay animation"
            onClick={() => setRun((n) => n + 1)}
            className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-md border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="size-4" />
          </button>
          <div key={run} className="flex w-full justify-center">
            {preview}
          </div>
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeFrame html={codeHtml} source={source} />
      </TabsContent>
    </Tabs>
  );
}
