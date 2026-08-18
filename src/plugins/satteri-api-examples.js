import { defineHastPlugin, defineMdastPlugin } from 'satteri';

// The API pages are written as a flat run of H2 sections, each with a request
// and response example somewhere inside it:
//
//   ## Get a list of accounts
//   ...parameters, response schema...
//   :::api-example{label="Response"}
//   ```json
//   ```
//   :::
//
// This regroups each of those sections into
//
//   <section class="api-section">
//     <h2>                                 <- spans both columns
//     <div class="api-section__body">      <- the prose under the heading
//     <div class="api-section__examples">  <- every api-example in the section
//
// so main.css can put the examples in a column beside the body. The heading
// stays out of both columns and takes a row of its own, which is what starts an
// example level with the bottom of the heading it belongs to.
//
// Anything before the first H2 is left where it is.
//
// Each section's HTTP method is also collected here and left on the frontmatter
// as `apiMethods`, in heading order, for ApiNavigation.astro to badge the left
// nav with. It cannot be read from the headings Astro hands the layout: those
// carry text and slug only, and are collected after this plugin runs. The
// heading text is recorded beside the method so the nav can check the two lists
// still describe the same endpoints before it trusts the order.

/** The container directive an example is written as, and the class it renders to. */
const DIRECTIVE = 'api-example';
const EXAMPLE_CLASS = 'api-example';

// Sätteri parses the directive but gives it no meaning, and never parses
// embedded HTML at all, so the example has to arrive as a directive to arrive as
// a single node: written as `<div>` it would reach hast as an opening and a
// closing `raw` node with the block loose between them.
//
// The body is left alone, so a fence inside is highlighted like any other — the
// examples are mostly ```json, but ```xml or ```yaml pass through just the same.
//
// MUST be registered after attributeMarkdown, whose generic handler renders
// every directive as a tag of its own name. Both write the node's `data`, each
// plugin runs its own pass in array order, and the later write is the one that
// survives — as `<div class="api-example">` rather than `<api-example>`.
export const apiExampleDirective = defineMdastPlugin({
  name: 'api-example-directive',
  containerDirective(node, ctx) {
    if (node.name !== DIRECTIVE) return;

    // An example with no label still lays out beside its section; it is the
    // header below that goes without a name rather than the whole block.
    const label = node.attributes?.label;
    const properties = { class: EXAMPLE_CLASS };
    if (label) properties['data-example'] = label;

    ctx.setProperty(node, 'data', { hName: 'div', hProperties: properties });
  },
});

// Sätteri has no root visitor, so the whole regroup hangs off the H2 filter and
// runs once, on the first H2 in the document. "First" is read off the tree
// rather than remembered in a closure: the later H2s see themselves preceded by
// one and bail, which keeps the plugin free of per-document state.
const HEADING = 'h2';

/** Whether a node is an element, optionally of a given tag. */
function isElement(node, tagName) {
  return (
    node?.type === 'element' && (tagName == null || node.tagName === tagName)
  );
}

// Classes reach hast under either key: the ones this file and shiki-code-block.js
// build carry hast's own `className` array, while anything rendered from a
// directive — the wrapper above, a `:span[GET]{.api-get}` badge — is built from
// the attribute it was written with and carries a plain `class` string. Both
// spellings name the same class, so both are read.
function hasClass(node, className) {
  const properties = node.properties ?? {};

  return [properties.className, properties.class].some((value) => {
    if (value == null) return false;
    const list = Array.isArray(value) ? value : String(value).split(/\s+/);
    return list.includes(className);
  });
}

function isExample(node) {
  return isElement(node, 'div') && hasClass(node, EXAMPLE_CLASS);
}

/** What an example names its payload, e.g. "Response". */
function exampleLabel(node) {
  return node.properties?.['data-example'] ?? null;
}

// The methods that have a badge of their own in api.css. Anything else — a
// PATCH, say — is left without one rather than badged as something it is not.
const METHODS = ['get', 'post', 'put', 'delete'];

/** The class the generator puts on a badge, e.g. api-get -> get. */
function methodFromBadge(node) {
  return METHODS.find((method) => hasClass(node, `api-${method}`)) ?? null;
}

/** The method an older page spells as inline code, e.g. `GET`. */
function methodFromCode(node) {
  if (!isElement(node, 'code')) return null;

  const method = text(node).trim().toLowerCase();
  return METHODS.includes(method) ? method : null;
}

/** An element's text, the way a heading or a code span reads. */
function text(node) {
  if (node.type === 'text') return node.value;
  return (node.children ?? []).map(text).join('');
}

/**
 * The HTTP method of a section, from the request line under its heading.
 *
 * The generator has emitted that line as a badge — <span class="api-get">GET
 * </span> — and as plain inline code — `GET` — so both are read. Either way the
 * method opens the first line under the heading, and only that opening is read:
 * a method named anywhere else is prose about the endpoint rather than the
 * endpoint's own method.
 */
function method(nodes) {
  const requestLine = nodes.find((node) => isElement(node));
  if (!requestLine) return null;

  const opening = (requestLine.children ?? []).find(
    (child) => child.type !== 'text' || child.value.trim() !== ''
  );
  if (!isElement(opening)) return null;

  return methodFromBadge(opening) ?? methodFromCode(opening);
}

function element(tagName, properties, children) {
  return { type: 'element', tagName, properties, children };
}

// The pages this runs on: the ones the API layout renders. A handful of them
// document endpoints without giving an example of any of them, and they are
// still laid out as endpoints and still badged in the nav.
const API_LAYOUT = '/Api.astro';

function isApiPage(frontmatter) {
  return (frontmatter?.layout ?? '').includes(API_LAYOUT);
}

function hasExampleMarkup(children) {
  return children.some(isExample);
}

/**
 * Labels an example with the value of its data-example attribute, reusing the
 * code block's own header rather than adding a second one above it.
 *
 * The nodes are copied rather than edited: they are read out of Sätteri's arena
 * and only take effect as the new content handed back to it, so an in-place
 * edit would go nowhere.
 */
function labelBlock(node, label, done) {
  if (done.value || !isElement(node)) return node;

  if (isElement(node, 'p') && hasClass(node, 'code-block__label')) {
    // Set by shiki-code-block.js, hidden while it has nothing to show.
    done.value = true;
    return {
      ...node,
      properties: { ...node.properties, hidden: false },
      children: [{ type: 'text', value: label }],
    };
  }

  let changed = false;
  const children = (node.children ?? []).map((child) => {
    const next = labelBlock(child, label, done);
    if (next !== child) changed = true;
    return next;
  });

  return changed ? { ...node, children } : node;
}

/**
 * Names the block inside an example after the example itself, leaving every
 * other node — and an example with nothing to name — exactly as it was found.
 */
function labelExample(node) {
  if (!isExample(node)) return node;

  const label = exampleLabel(node);
  if (!label) return node;

  // The attribute names what the payload is; the header says what the block is.
  const done = { value: false };
  const children = (node.children ?? []).map((child) =>
    labelBlock(child, `Example ${label}`, done)
  );

  return done.value ? { ...node, children } : node;
}

/**
 * Splits one H2 section into its heading, its body and its examples.
 *
 * @param {any} heading the H2 the section opens with
 * @param {any[]} nodes everything under it, up to the next H2
 */
function section(heading, nodes) {
  const body = [];
  const examples = [];

  for (const node of nodes) {
    if (isExample(node)) {
      examples.push(node);
    } else {
      body.push(node);
    }
  }

  const children = [
    heading,
    element('div', { className: ['api-section__body'] }, body),
  ];

  // The examples column is left out rather than left empty, but the body keeps
  // its width either way: endpoints with and without examples sit in the same
  // grid, so the prose measure does not change down the page.
  if (examples.length > 0) {
    children.push(
      element('div', { className: ['api-section__examples'] }, examples)
    );
  }

  return element('section', { className: ['api-section'] }, children);
}

export default defineHastPlugin({
  name: 'api-examples',
  element: {
    filter: [HEADING],
    visit(node, ctx) {
      const root = ctx.parent(node);
      if (root?.type !== 'root') return;

      // Every H2 is visited, but only the first one does the work.
      const index = ctx.indexOf(node) ?? 0;
      if (root.children.slice(0, index).some((n) => isElement(n, HEADING))) {
        return;
      }

      const frontmatter = ctx.data.astro?.frontmatter;
      if (!isApiPage(frontmatter) && !hasExampleMarkup(root.children)) return;

      const children = [];
      /** One entry per section, in heading order, for the left nav. */
      const methods = [];
      /** @type {{heading: any, nodes: any[]} | null} */
      let current = null;

      const close = () => {
        if (!current) return;

        methods.push({
          text: text(current.heading).trim(),
          method: method(current.nodes),
        });

        children.push(section(current.heading, current.nodes));
        current = null;
      };

      for (const child of root.children.map(labelExample)) {
        if (isElement(child, HEADING)) {
          close();
          current = { heading: child, nodes: [] };
        } else if (current) {
          current.nodes.push(child);
        } else {
          children.push(child);
        }
      }
      close();

      // Astro hands the frontmatter straight to the layout, which is the only
      // route from here to the page's own nav.
      if (frontmatter) frontmatter.apiMethods = methods;

      ctx.setProperty(root, 'children', children);
    },
  },
});
