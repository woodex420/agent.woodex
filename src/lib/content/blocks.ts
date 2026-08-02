/**
 * Shared rich-body block type used by ArticleBody and post content.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "pullout"; title?: string; text: string }
  | { type: "table"; headers: string[]; rows: string[][] };
