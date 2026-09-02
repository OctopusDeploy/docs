import { defineHastPlugin } from 'satteri';

// Makes image alt text searchable. Pagefind indexes text nodes, so the words in
// an `alt` attribute are invisible to it without `data-pagefind-index-attrs`,
// which applies only to the element carrying it — there is no inheritance, so it
// has to land on every `<img>`.
//
// Covers markdown image syntax and `:img{}` directives. A raw `<img>` written
// straight into a page is passed through as HTML and never becomes a hast
// element, which is why `Image.astro` carries the attribute itself.

export default defineHastPlugin({
  name: 'pagefind-image-attrs',
  element: {
    filter: ['img'],
    visit(node, ctx) {
      const { alt, title } = node.properties ?? {};

      // A decorative image carries `alt=""`, a deliberate signal that it has
      // nothing to say.
      const wanted = [alt ? 'alt' : null, title ? 'title' : null].filter(
        Boolean
      );
      if (wanted.length === 0) return;

      ctx.setProperty(node, 'data-pagefind-index-attrs', wanted.join(','));
    },
  },
});
