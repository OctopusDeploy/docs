import { defineMdastPlugin } from 'satteri';

// The request line of an endpoint on a generated API page:
//
//   :endpoint{method="POST" path="/api/users/access-token"}
//
// renders as
//
//   <span class="api-endpoint" data-method="post">
//     <span class="api-post">POST</span> <code>/api/users/access-token</code>
//   </span>
//
// The generator used to write the badge and the route out by hand, as
// ``:span[POST]{.api-post} `/api/users/access-token` ``. It read the same, but
// it left the left nav recovering an endpoint's method from arbitrary inline
// markup — the first non-empty child of the first element under each heading,
// badge or code span. One directive states the method instead, and
// plugins/satteri-api-examples.js reads it off `data-method`.
//
// A deprecated endpoint adds the flag:
//
//   :endpoint{method="GET" path="/api/\{spaceId\}/channels" deprecated=true}
//
// which sets `data-deprecated` on the line and marks the endpoint's row in the
// nav. The warning a reader sees is still written out as its own
// `:::div{.warning}` block, so the wording stays with the content.

const DIRECTIVE = 'endpoint';

/** The class the endpoint line carries, and the hook the nav reads it by. */
export const ENDPOINT_CLASS = 'api-endpoint';

// The methods api.css has a badge for. Anything else still renders, and still
// reaches the nav, but goes without a badge rather than with an unstyled one.
const METHODS = ['get', 'post', 'put', 'delete'];

// A path is written inside a quoted directive attribute, and the directive
// parser ends the attribute block at the first unescaped `}` — which every
// route template has, in `/api/{spaceId}/channels`. So the generator escapes
// the braces and this puts them back. The backslash itself escapes too, so it
// is unescaped along with them.
function unescapePath(value) {
  return value.replace(/\\([{}\\])/g, '$1');
}

function span(properties, children) {
  // Any parent node type will do: it exists to carry hName/hProperties, and the
  // type it is built from never reaches the output.
  return {
    type: 'paragraph',
    data: { hName: 'span', hProperties: properties },
    children,
  };
}

// MUST be registered after attributeMarkdown, whose generic handler renders
// every directive as a tag of its own name — `<endpoint>` here. This replaces
// the node outright, so it has to be the later of the two passes.
export const endpointDirective = defineMdastPlugin({
  name: 'endpoint-directive',
  textDirective(node, ctx) {
    if (node.name !== DIRECTIVE) return;

    const method = (node.attributes?.method ?? '').trim().toLowerCase();
    const path = unescapePath(node.attributes?.path ?? '');
    // `deprecated=true`, `deprecated="true"` and a bare `deprecated` all read
    // as set; anything else, including `deprecated=false`, does not.
    const flag = node.attributes?.deprecated;
    const deprecated = flag === '' || flag === 'true';

    if (!method || !path) {
      ctx.report({
        message: `:${DIRECTIVE} needs both a method and a path`,
        node,
        severity: 'error',
      });
      return;
    }

    if (!METHODS.includes(method)) {
      ctx.report({
        message: `:${DIRECTIVE} method "${method}" has no badge in src/styles/api.css`,
        node,
        severity: 'warning',
      });
    }

    const badge = METHODS.includes(method)
      ? [
          span({ class: `api-${method}` }, [
            { type: 'text', value: method.toUpperCase() },
          ]),
          { type: 'text', value: ' ' },
        ]
      : [{ type: 'text', value: `${method.toUpperCase()} ` }];

    return span(
      {
        class: ENDPOINT_CLASS,
        'data-method': method,
        // Sätteri drops undefined properties, so the attribute is absent
        // rather than present and false.
        'data-deprecated': deprecated ? 'true' : undefined,
      },
      [...badge, { type: 'inlineCode', value: path }]
    );
  },
});

export default endpointDirective;
