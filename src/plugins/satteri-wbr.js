import { defineHastPlugin } from 'satteri';

// Browsers will break a line on a hyphen character, but not on a slash or period.
// This can cause long strings of text to overflow their container, especially in code blocks.

// This hast plugin adds <wbr> elements to code blocks to allow for better line breaking in long strings of text.
const SEPARATORS = /(?=[.\[:\/\\])/;

function withBreaks(value) {
  const parts = value.split(SEPARATORS).filter(Boolean);
  if (parts.length < 2) return null;

  return parts.flatMap((part, i) => {
    const text = { type: 'text', value: part };
    return i === 0
      ? [text]
      : [
          { type: 'element', tagName: 'wbr', properties: {}, children: [] },
          text,
        ];
  });
}

export default defineHastPlugin({
  name: 'wbr',
  element: {
    filter: ['code'],
    visit(node, ctx) {
      if (ctx.parent(node)?.tagName === 'pre') return; // fenced blocks, leave alone

      const children = node.children.flatMap((child) =>
        child.type === 'text' ? (withBreaks(child.value) ?? [child]) : [child]
      );

      ctx.setProperty(node, 'children', children);
    },
  },
});
