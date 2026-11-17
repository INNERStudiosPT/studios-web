// Privacy filter for Grafana Faro payloads.
//
// Query strings and fragments can carry e-mail addresses, tokens or campaign
// identifiers. They show up in the page meta, in stack frame file names and in
// navigation/resource event data, so every URL in the payload loses them.

// A value that is a URL and nothing else: parse it and drop search + hash.
const WHOLE_URL = /^https?:\/\/\S+$/i;
// A URL inside other text (a stack trace, an error message): drop everything
// from the first ? or # up to the next whitespace or quote.
const EMBEDDED_URL_QUERY = /(https?:\/\/[^\s?#"'<>]+)[?#][^\s"'<>]*/gi;

export function stripUrlQuery(value: string): string {
  if (WHOLE_URL.test(value)) {
    try {
      const u = new URL(value);
      if (!u.search && !u.hash) return value;
      return `${u.origin}${u.pathname}`;
    } catch {
      // fall through to the text rule
    }
  }
  return value.replace(EMBEDDED_URL_QUERY, "$1");
}

export function stripQueries<T>(value: T): T {
  if (typeof value === "string") return stripUrlQuery(value) as T;
  if (Array.isArray(value)) return value.map(stripQueries) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = stripQueries(v);
    return out as T;
  }
  return value;
}
