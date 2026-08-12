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

function element(tagName, className, children) {
  return {
    type: 'element',
    tagName,
    properties: { className },
    children,
  };
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
    if (!hasExampleMarkup(tree)) return;

    const parsed = raw(tree, { file });

    const children = [];
    /** @type {{heading: any, nodes: any[]} | null} */
    let current = null;

    const close = () => {
      if (current) children.push(section(current.heading, current.nodes));
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

    parsed.children = children;
    return parsed;
  };
}
