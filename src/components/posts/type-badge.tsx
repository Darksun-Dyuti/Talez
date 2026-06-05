import { BookOpen, FileText, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccessLevel, ContentType } from "@/types/content";

export function TypeBadge({ type, accessLevel }: { type: ContentType; accessLevel?: AccessLevel }) {
  const isStory = type === "STORY";
  const Icon = isStory ? BookOpen : FileText;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
        isStory
          ? "border-ember/25 bg-ember/10 text-ember"
          : "border-sage/25 bg-sage/10 text-sage"
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isStory ? "Story" : "Blog"}
      {accessLevel === "PREMIUM" ? <Lock className="h-3.5 w-3.5" aria-label="Premium" /> : null}
    </span>
  );
}
