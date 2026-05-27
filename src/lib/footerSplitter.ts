// Splits the footer HTML at every <div ... data-marketo-form ...></div>
// placeholder so the microsite can render its own MarketoForm component
// in place of each one.
//
// Attributes inside the placeholder may span multiple lines (Razor preserves
// source formatting on the main site). Whitespace is normalized only within
// each match - never across the whole document - so unrelated content like
// <pre> blocks is left untouched.

const PLACEHOLDER_RE = /<div\b[^>]*\bdata-marketo-form\b[^>]*><\/div>/g;

export type FooterPart =
  | { kind: 'html'; html: string }
  | { kind: 'form'; formId: number; dreamdataTrackingId?: string };

export function splitFooterAtMarketoPlaceholder(raw: string): FooterPart[] {
  const parts: FooterPart[] = [];
  let cursor = 0;

  for (const match of raw.matchAll(PLACEHOLDER_RE)) {
    const start = match.index!;
    if (start > cursor)
      parts.push({ kind: 'html', html: raw.slice(cursor, start) });

    const norm = match[0].replace(/\s+/g, ' ');
    const formIdAttr = norm.match(/data-form-id="(\d+)"/);
    const trackingAttr = norm.match(/data-tracking-id="([^"]*)"/);
    if (formIdAttr) {
      parts.push({
        kind: 'form',
        formId: parseInt(formIdAttr[1], 10),
        dreamdataTrackingId: trackingAttr?.[1] || undefined,
      });
    }
    cursor = start + match[0].length;
  }

  if (cursor < raw.length)
    parts.push({ kind: 'html', html: raw.slice(cursor) });
  return parts;
}
