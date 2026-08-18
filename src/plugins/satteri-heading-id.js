import { defineMdastPlugin } from 'satteri';

// Explicit heading ids are written `## Title {#custom-id}`, which Sätteri reads
// natively under `features.headingAttributes` — but only on the Markdown side,
// and MDX pages have to write the brace escaped (`## Title \{#custom-id}`)
// because a bare `{` opens an expression there. That leaves three shapes to
// reconcile against what the unified pipeline used to emit:
//
//   .md  `{#id}`   the parser takes the id and the text comes out clean
//   .md  `\{#id}`  the parser takes the id but leaves the backslash behind
//   .mdx `\{#id}`  the escape is consumed before the attribute parser runs, so
//                  no id is taken and `{#id}` is left sitting in the heading
//
// Untouched, the last one slugs the braces into the id itself — `AWS {#runbooks-aws}`
// became `id="aws-runbooks-aws"` — so the id is lifted out of the text here.
const TRAILING_ID = /\s*\\?\{#([^}\s]+)\}$/;

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" };

// A few legacy ids carry the anchor as a character reference — `{#…can&#39;t…}`.
// The attribute parser reads the id straight off the source, before references
// are resolved, so without this the `&` is escaped again on the way out and the
// anchor renders as a literal `&amp;#39;`.
function decodeReferences(id) {
  return id.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (match, body) => {
    if (body[0] === '#') {
      const code =
        body[1] === 'x' || body[1] === 'X'
          ? Number.parseInt(body.slice(2), 16)
          : Number.parseInt(body.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return NAMED[body.toLowerCase()] ?? match;
  });
}

export default defineMdastPlugin({
  name: 'heading-id',
  heading(node, ctx) {
    const last = node.children.at(-1);
    if (last?.type !== 'text') return;

    const parsedId = node.data?.hProperties?.id;
    if (typeof parsedId === 'string') {
      const decoded = decodeReferences(parsedId);
      if (decoded !== parsedId) {
        ctx.setProperty(node, 'data', {
          ...node.data,
          hProperties: { ...node.data.hProperties, id: decoded },
        });
      }

      // Only the stray escape is left to clean up. A heading that genuinely
      // ends in a backslash keeps it, since the parser took no id from it.
      if (last.value.endsWith('\\')) {
        ctx.setProperty(last, 'value', last.value.slice(0, -1).trimEnd());
      }
      return;
    }

    const match = last.value.match(TRAILING_ID);
    if (!match) return;

    ctx.setProperty(last, 'value', last.value.slice(0, match.index).trimEnd());
    ctx.setProperty(node, 'data', {
      ...node.data,
      hProperties: { ...node.data?.hProperties, id: match[1] },
    });
  },
});
