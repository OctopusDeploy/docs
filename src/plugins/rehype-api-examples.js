import { raw } from 'hast-util-raw';

// The API pages are written as a flat run of H2 sections, each with a request
// and response example somewhere inside it:
//
//   ## Get a list of accounts
//   ...parameters, response schema...
//   <div data-example="Response">
//   ```json
//   ```
//   </div>
//
// This regroups each of those sections into
//
//   <section class="api-section">
//     <h2>                                 <- spans both columns
//     <div class="api-section__body">      <- the prose under the heading
//     <div class="api-section__examples">  <- every data-example in the section
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

const EXAMPLE_ATTRIBUTE = 'data-example';
// hast camel-cases data attributes once they have been parsed into elements.
const EXAMPLE_PROPERTY = 'dataExample';

/** Whether a node is an element, optionally of a given tag. */
function isElement(node, tagName) {
  return (
    node?.type === 'element' && (tagName == null || node.tagName === tagName)
  );
}

function exampleLabel(node) {
  return isElement(node, 'div') ? node.properties?.[EXAMPLE_PROPERTY] : null;
}

function isExample(node) {
  return exampleLabel(node) != null;
}

// The methods that have a badge of their own in api.css. Anything else — a
// PATCH, say — is left without one rather than badged as something it is not.
const METHODS = ['get', 'post', 'put', 'delete'];

/** The class the generator puts on a badge, e.g. api-get -> get. */
function methodFromBadge(node) {
  const classes = node.properties?.className ?? [];
  const list = Array.isArray(classes) ? classes : String(classes).split(/\s+/);

  return METHODS.find((method) => list.includes(`api-${method}`)) ?? null;
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

function element(tagName, className, children) {
  return {
    type: 'element',
    tagName,
    properties: { className },
    children,
  };
}

// The pages this runs on: the ones the API layout renders. A handful of them
// document endpoints without giving an example of any of them, and they are
// still laid out as endpoints and still badged in the nav.
const API_LAYOUT = '/Api.astro';

function isApiPage(file) {
  return (file.data?.astro?.frontmatter?.layout ?? '').includes(API_LAYOUT);
}

// Astro's own rehype-raw runs after every plugin registered in the config, so
// the example wrappers are still unparsed HTML strings by the time this sees
// the tree. Nothing to group until they are elements, so parse them here.
function hasExampleMarkup(tree) {
  return tree.children.some(
    (node) =>
      node.type === 'raw' && node.value.includes(`<div ${EXAMPLE_ATTRIBUTE}=`)
  );
}

/**
 * Labels an example with the value of its data-example attribute, reusing the
 * code block's own header rather than adding a second one above it.
 */
function labelExample(node) {
  // The attribute names what the payload is; the header says what the block is.
  const label = `Example ${exampleLabel(node)}`;
  node.properties.className = ['api-example'];

  const stack = [...node.children];
  while (stack.length > 0) {
    const child = stack.shift();
    if (!isElement(child)) continue;

    if (
      isElement(child, 'p') &&
      child.properties?.className?.includes('code-block__label')
    ) {
      // Set by shiki-code-block.js, hidden while it has nothing to show.
      child.properties.hidden = false;
      child.children = [{ type: 'text', value: label }];
      return;
    }

    stack.push(...child.children);
  }
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
      labelExample(node);
      examples.push(node);
    } else {
      body.push(node);
    }
  }

  const children = [heading, element('div', ['api-section__body'], body)];

  // The examples column is left out rather than left empty, but the body keeps
  // its width either way: endpoints with and without examples sit in the same
  // grid, so the prose measure does not change down the page.
  if (examples.length > 0) {
    children.push(element('div', ['api-section__examples'], examples));
  }

  return element('section', ['api-section'], children);
}

export default function rehypeApiExamples() {
  return (tree, file) => {
    if (!isApiPage(file) && !hasExampleMarkup(tree)) return;

    const parsed = raw(tree, { file });

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

    for (const node of parsed.children) {
      if (isElement(node, 'h2')) {
        close();
        current = { heading: node, nodes: [] };
      } else if (current) {
        current.nodes.push(node);
      } else {
        children.push(node);
      }
    }
    close();

    // Astro hands the frontmatter straight to the layout, which is the only
    // route from here to the page's own nav.
    const frontmatter = file.data?.astro?.frontmatter;
    if (frontmatter) frontmatter.apiMethods = methods;

    parsed.children = children;
    return parsed;
  };
}
