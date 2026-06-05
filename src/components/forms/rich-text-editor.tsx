"use client";

import { Bold, Code, Heading2, Italic, List, Quote } from "lucide-react";
import { useRef } from "react";

const tools = [
  { label: "Bold", icon: Bold, command: "bold" },
  { label: "Italic", icon: Italic, command: "italic" },
  { label: "Heading", icon: Heading2, command: "formatBlock", value: "h2" },
  { label: "Quote", icon: Quote, command: "formatBlock", value: "blockquote" },
  { label: "List", icon: List, command: "insertUnorderedList" },
  { label: "Code", icon: Code, command: "formatBlock", value: "pre" }
];

export function RichTextEditor({
  value,
  onChange
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);

  function run(command: string, value?: string) {
    document.execCommand(command, false, value);
    onChange(editorRef.current?.innerHTML ?? "");
  }

  return (
    <div className="overflow-hidden rounded-lg border border-line bg-paper">
      <div className="flex flex-wrap gap-1 border-b border-line bg-surface p-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.label}
              type="button"
              title={tool.label}
              aria-label={tool.label}
              onClick={() => run(tool.command, tool.value)}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition hover:bg-paper hover:text-ink"
            >
              <Icon className="h-4 w-4" />
            </button>
          );
        })}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={() => onChange(editorRef.current?.innerHTML ?? "")}
        className="prose prose-talez min-h-72 max-w-none p-4 outline-none"
        dangerouslySetInnerHTML={{ __html: value }}
      />
    </div>
  );
}
