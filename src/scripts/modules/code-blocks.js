// @ts-check
import { qs, qsa } from './query.js';

const REVERT_MS = 2000;

const REST = 'Copy to clipboard';
const COPIED = 'Copied';
const FAILED = 'Copy failed';

/** Taller than this and the block collapses until it is clicked. */
const COLLAPSE_HEIGHT = 500;

/**
 * Display names for the fence languages used across the docs. Anything missing
 * falls back to the raw value with its first letter capitalised.
 */
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

/** @type {WeakMap<HTMLElement, ReturnType<typeof setTimeout>>} */
const timers = new WeakMap();

/** @type {HTMLElement | null} */
let status = null;

/**
 * @param {string} language
 */
function displayName(language) {
  const key = language.trim().toLowerCase();
  return LANGUAGE_NAMES[key] ?? key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * @param {string} tag
 * @param {string} className
 * @param {string} [text]
 */
function el(tag, className, text) {
  const node = document.createElement(tag);
  node.className = className;
  if (text) node.textContent = text;
  return node;
}

/* Copying ---------------------------------------------------------------- */

function buildCopyButton() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'code-block__copy btn btn--small';
  button.dataset.tooltip = REST;
  button.setAttribute('aria-label', 'Copy code to clipboard');

  // Empty: the glyph is a CSS mask on the span itself.
  button.appendChild(el('span', 'code-block__copy-icon btn__icon'));

  return button;
}

/**
 * @param {HTMLElement} button
 */
async function copyCode(button) {
  const block = button.closest('.code-block');
  const code = block?.querySelector('.code-block__panel:not([hidden]) code');
  if (!code) return;

  let message = COPIED;
  try {
    // textContent because a collapsed block clips its last lines, and innerText
    // returns only what is on screen.
    // Nothing may be awaited before this: Safari spends the click's user
    // activation on the first await, and the write then fails.
    await navigator.clipboard.writeText(code.textContent ?? '');
  } catch (error) {
    console.warn('[code-blocks] clipboard write failed', error);
    message = FAILED;
  }

  showResult(button, message);
  announce(message);
}

/**
 * @param {HTMLElement} button
 * @param {string} message
 */
function showResult(button, message) {
  button.dataset.tooltip = message;
  button.dataset.copied = '';

  clearTimeout(timers.get(button));
  timers.set(
    button,
    setTimeout(() => {
      button.dataset.tooltip = REST;
      delete button.dataset.copied;
      timers.delete(button);
    }, REVERT_MS)
  );
}

/**
 * @param {string} message
 */
function announce(message) {
  if (!status) {
    status = el('div', 'code-block-status');
    status.setAttribute('aria-live', 'polite');
    document.body.append(status);
  }

  // Cleared first, then set on a later task, so copying twice in a row reads as
  // a change and is announced both times. Same as copy-markdown.js.
  const region = status;
  region.textContent = '';
  setTimeout(() => {
    region.textContent = message;
  }, 50);
}

/* Language selector ------------------------------------------------------ */

/**
 * @param {string[]} names
 * @param {(index: number) => void} onSelect
 */
function buildLanguageControl(names, onSelect) {
  if (names.length === 1) {
    return el('span', 'code-block__language', names[0]);
  }

  const menu = document.createElement('details');
  menu.className = 'code-block__languages';

  const trigger = document.createElement('summary');
  trigger.className = 'code-block__language-trigger btn btn--small';

  const caret = el('i', 'fa-solid fa-caret-down btn__icon');
  caret.setAttribute('aria-hidden', 'true');

  const triggerLabel = el('span', 'btn__label', names[0]);
  trigger.append(triggerLabel, caret);

  // The visible text alone would name the control "PowerShell", which says
  // nothing about it being a control.
  const nameTrigger = (name) =>
    trigger.setAttribute('aria-label', `Language: ${name}. Change language`);
  nameTrigger(names[0]);

  const options = el('ul', 'code-block__language-options');
  names.forEach((name, index) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'code-block__language-option';
    option.textContent = name;
    option.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

    option.addEventListener('click', () => {
      triggerLabel.textContent = name;
      nameTrigger(name);
      qsa('.code-block__language-option', options).forEach((other) =>
        other.setAttribute('aria-pressed', String(other === option))
      );
      menu.open = false;
      onSelect(index);
    });

    const item = document.createElement('li');
    item.appendChild(option);
    options.appendChild(item);
  });

  menu.append(trigger, options);
  addMenuListeners(menu, trigger);

  return menu;
}

/**
 * @param {HTMLDetailsElement} menu
 * @param {HTMLElement} trigger
 */
function addMenuListeners(menu, trigger) {
  menu.addEventListener('keydown', (event) => {
    if (!menu.open || event.key !== 'Escape') return;
    event.preventDefault();
    menu.open = false;
    trigger.focus();
  });

  document.addEventListener('click', (event) => {
    if (!menu.open) return;
    if (event.target instanceof Node && menu.contains(event.target)) return;
    menu.open = false;
  });
}

/* Collapsing ------------------------------------------------------------- */

/**
 * The cap is lifted before reading, or the height comes back as the cap.
 *
 * @param {HTMLElement} block
 */
function measure(block) {
  const body = qs('.code-block__body', block);

  block.removeAttribute('data-collapsible');
  const height = body.scrollHeight;

  if (height <= COLLAPSE_HEIGHT) {
    block.removeAttribute('data-expanded');
    return;
  }

  block.style.setProperty('--code-block-height', `${height}px`);
  block.setAttribute('data-collapsible', '');
}

/**
 * Delegated to the document because detail-tabs.js rebuilds its panels from
 * innerHTML, which drops any listener held on an element inside one.
 */
function addCollapseListeners() {
  /** @param {Element} target */
  const expand = (target) => {
    const body = target.closest(
      '.code-block[data-collapsible] .code-block__body'
    );
    body?.closest('.code-block')?.setAttribute('data-expanded', '');
  };

  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;
    expand(event.target);

    // The header is part of the block, so copying does not collapse it.
    qsa('.code-block[data-expanded]').forEach((block) => {
      if (!block.contains(event.target)) block.removeAttribute('data-expanded');
    });
  });

  // Tabbing into the code counts as reaching for it, same as a click.
  document.addEventListener('focusin', (event) => {
    if (event.target instanceof Element) expand(event.target);
  });
}

/* Assembly --------------------------------------------------------------- */

/**
 * @param {HTMLElement[]} pres
 * @param {string[]} names
 * @param {HTMLElement} anchor element the finished block takes the place of
 */
function buildBlock(pres, names, anchor) {
  // For a plain block the anchor is the <pre> itself, which the panels below
  // move out of the page. An element cannot be replaced by its own descendant,
  // so the place is claimed before any of that happens.
  const marker = document.createComment('code-block');
  anchor.replaceWith(marker);

  const block = el('div', 'code-block');
  const header = el('div', 'code-block__header');
  const body = el('div', 'code-block__body');

  const label = el('p', 'code-block__label');
  const setLabel = (index) => {
    const text = pres[index].dataset.label ?? '';
    label.textContent = text;
    label.hidden = !text;
  };
  setLabel(0);
  header.appendChild(label);

  const panels = pres.map((pre, index) => {
    const panel = el('div', 'code-block__panel');
    panel.hidden = index !== 0;
    // Focusable so an overflowing panel can be scrolled from the keyboard.
    pre.setAttribute('tabindex', '0');
    panel.appendChild(pre);
    return panel;
  });
  body.append(...panels, el('div', 'code-block__fade'));

  const actions = el('div', 'code-block__actions');
  actions.append(
    buildLanguageControl(names, (index) => {
      panels.forEach((panel, i) => (panel.hidden = i !== index));
      setLabel(index);
      measure(block);
    }),
    buildCopyButton()
  );
  header.appendChild(actions);

  block.append(header, body);
  marker.replaceWith(block);

  return block;
}

/**
 * A group qualifies for the language menu only when every panel is a lone code
 * block. Groups holding prose as well stay tabs, which detail-tabs.js builds.
 */
function enhanceGroups() {
  const seen = new Set();

  qsa('details[data-group]').forEach((first) => {
    const group = first.dataset.group;
    if (!group || seen.has(group)) return;
    seen.add(group);

    const participants = Array.from(
      qsa(`details[data-group="${CSS.escape(group)}"]`)
    );

    const panels = participants.map((details) => {
      const summary = details.querySelector('summary');
      const children = Array.from(details.children).filter(
        (child) => child !== summary
      );
      const pre = children[0];
      const isLoneCodeBlock =
        children.length === 1 &&
        pre instanceof HTMLElement &&
        pre.tagName === 'PRE';

      return isLoneCodeBlock && summary
        ? { name: summary.textContent?.trim() ?? '', pre }
        : null;
    });

    if (panels.some((panel) => !panel)) return;

    buildBlock(
      panels.map((panel) => panel.pre),
      panels.map(
        (panel) => panel.name || displayName(panel.pre.dataset.language ?? '')
      ),
      participants[0]
    );

    // detail-tabs.js keys off data-group, so the consumed ones have to go.
    participants.forEach((details) => details.remove());
  });
}

function enhanceSingleBlocks() {
  qsa('pre.astro-code').forEach((pre) => {
    if (pre.closest('.code-block')) return;
    buildBlock([pre], [displayName(pre.dataset.language ?? '')], pre);
  });
}

function addCopyListener() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const button = event.target.closest('.code-block__copy');
    if (button instanceof HTMLElement) copyCode(button);
  });
}

/**
 * Deferred until the fonts settle: the fallback font gives different line
 * heights, and a block near the threshold lands on the wrong side of it.
 */
function measureAll() {
  const all = () => qsa('.code-block').forEach(measure);

  if (document.fonts) document.fonts.ready.then(all);
  else all();

  document.addEventListener('resized', all);

  // A tab panel has no height while it is hidden, so the blocks inside one can
  // only be measured once its tab has been picked.
  document.addEventListener('click', (event) => {
    if (event.target instanceof Element && event.target.closest('[role=tab]')) {
      all();
    }
  });
}

function enhanceCodeBlocks() {
  enhanceGroups();
  enhanceSingleBlocks();
  addCopyListener();
  addCollapseListeners();
  measureAll();
}

export { enhanceCodeBlocks };
