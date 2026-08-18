import { defineHastPlugin } from 'satteri';

// Makes image alt text searchable.
//
// Pagefind indexes text nodes, so the words inside an `alt` attribute are
// invisible to it by default. `data-pagefind-index-attrs` names the attributes to
// pull in as content, and it applies only to the element carrying it — there is no
// inheritance, so it has to land on every `<img>` rather than once on the article.
// Doing that here rather than in the layout is what covers images written as
// markdown, which is nearly all of them.
//
// This matters more than it sounds for a docs site: a screenshot's alt text is
// often the only place a UI label appears in prose, so `alt="Deployment process
// editor"` is the only text on the page that would answer a search for it.
//
// Covers markdown image syntax and `:img{}` directives. Raw `<img>` tags written
// straight into a page are passed through as HTML and never become hast elements,
// so this does not see them; `Image.astro` carries the attribute itself for the
// same reason.

export default defineHastPlugin({
  name: 'pagefind-image-attrs',
  element: {
    filter: ['img'],
    visit(node, ctx) {
      const { alt, title } = node.properties ?? {};

      // A decorative image carries `alt=""`, which is a deliberate signal that it
      // has nothing to say. Indexing the empty string is harmless but pointless,
      // and skipping it keeps the attribute off the markup where it means nothing.
      const wanted = [alt ? 'alt' : null, title ? 'title' : null].filter(
        Boolean
      );
      if (wanted.length === 0) return;

      ctx.setProperty(node, 'data-pagefind-index-attrs', wanted.join(','));
    },
  },
});
