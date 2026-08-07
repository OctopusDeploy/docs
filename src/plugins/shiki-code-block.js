// Wraps every highlighted block in the code block shell at build time, so the
// frame, header, label and language are on the page before any script runs.
// code-blocks.js adds the behaviour: copying, collapsing, and folding a
// <details data-group> set into one block with a language menu.

const REST = 'Copy to clipboard';

/** Display names for the fence languages used across the docs. */
const LANGUAGE_NAMES = {
  bash: 'Bash',
  batch: 'Batch',
  'c#': 'C#',
  cs: 'C#',
  csharp: 'C#',
  docker: 'Docker',
  dockerfile: 'Dockerfile',
  fsharp: 'F#',
  go: 'Go',
  hcl: 'HCL',
  html: 'HTML',
  ini: 'INI',
  java: 'Java',
  javascript: 'JavaScript',
  js: 'JavaScript',
  json: 'JSON',
  log: 'Log',
  markdown: 'Markdown',
  nginx: 'nginx',
  ocl: 'OCL',
  plaintext: 'Text',
  powershell: 'PowerShell',
  ps: 'PowerShell',
  python: 'Python',
  ruby: 'Ruby',
  sh: 'Shell',
  shell: 'Shell',
  sql: 'SQL',
  text: 'Text',
  txt: 'Text',
  typescript: 'TypeScript',
  xml: 'XML',
  yaml: 'YAML',
  yml: 'YAML',
};

function displayName(language) {
  const key = String(language ?? '')
    .trim()
    .toLowerCase();
  if (!key) return '';
  return LANGUAGE_NAMES[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

function h(tagName, properties, children = []) {
  return { type: 'element', tagName, properties, children };
}

function text(value) {
  return { type: 'text', value };
}

export default function shikiCodeBlock() {
  return {
    name: 'octopus:code-block',

    root(node) {
      const pre = node.children.find(
        (child) => child.type === 'element' && child.tagName === 'pre'
      );
      if (!pre) return;

      // langAlias rewrites what Shiki reports, so the attribute Astro set from
      // the fence wins when it is there. ```ocl has to stay OCL, not HCL.
      const language = displayName(
        pre.properties?.['data-language'] ?? this.options.lang
      );
      const label = this.options.meta?.__raw?.trim() ?? '';

      // Focusable so an overflowing panel can be scrolled from the keyboard.
      pre.properties = { ...pre.properties, tabindex: '0' };

      const header = h('div', { className: ['code-block__header'] }, [
        h(
          'p',
          { className: ['code-block__label'], hidden: !label },
          label ? [text(label)] : []
        ),
        h('div', { className: ['code-block__actions'] }, [
          h('span', { className: ['code-block__language'] }, [text(language)]),
          h(
            'button',
            {
              type: 'button',
              className: ['code-block__copy', 'btn', 'btn--small'],
              'data-tooltip': REST,
              'aria-label': 'Copy code to clipboard',
            },
            // Empty: the glyph is a CSS mask on the span itself.
            [
              h(
                'span',
                { className: ['code-block__copy-icon', 'btn__icon'] },
                []
              ),
            ]
          ),
        ]),
      ]);

      const body = h('div', { className: ['code-block__body'] }, [
        h('div', { className: ['code-block__panel'] }, [pre]),
        h('div', { className: ['code-block__fade'] }, []),
      ]);

      node.children = [h('div', { className: ['code-block'] }, [header, body])];
    },
  };
}
