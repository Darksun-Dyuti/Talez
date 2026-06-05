export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function estimateReadingTime(input: string) {
  const words = stripHtml(input).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 225));
}

export function wordCount(input: string) {
  return stripHtml(input).split(/\s+/).filter(Boolean).length;
}

export function withHeadingIds(html: string) {
  return html.replace(/<h([2-3])(?:\s[^>]*)?>(.*?)<\/h\1>/g, (_match, level, text) => {
    const id = text
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return `<h${level} id="${id}">${text}</h${level}>`;
  });
}

export function getTableOfContents(html: string): TocItem[] {
  const matches = Array.from(html.matchAll(/<h([2-3])(?: id="([^"]+)")?>(.*?)<\/h\1>/g));
  return matches.map((match) => {
    const text = match[3].replace(/<[^>]+>/g, "");
    const id =
      match[2] ??
      text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    return { id, text, level: Number(match[1]) };
  });
}
