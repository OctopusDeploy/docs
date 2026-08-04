import { visit } from 'unist-util-visit';

// Break *before* each of these characters
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

export default function rehypeWbr() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'code') return;
      if (parent?.tagName === 'pre') return; // fenced blocks, leave alone

      node.children = node.children.flatMap((child) =>
        child.type === 'text' ? (withBreaks(child.value) ?? [child]) : [child]
      );
    });
  };
}
