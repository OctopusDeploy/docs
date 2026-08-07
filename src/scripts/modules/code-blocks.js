// @ts-check
import { qs, qsa } from './query.js';
import { copyOnClick } from './copy-button.js';

// The shell around each block, its copy button included, is rendered at build
// time by src/plugins/shiki-code-block.js. This wires up what happens next.

/** Taller than this and the block collapses until it is clicked. */
const COLLAPSE_HEIGHT = 500;

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

/**
 * @param {HTMLElement} button
 */
function visibleCode(button) {
  const code = button
    .closest('.code-block')
    ?.querySelector('.code-block__panel:not([hidden]) code');

  // textContent because a collapsed block clips its last lines, and innerText
  // returns only what is on screen.
  return code?.textContent ?? null;
}

/* Language menu ---------------------------------------------------------- */

/**
 * Swaps the static language text for a menu over the block's panels.
 *
 * @param {HTMLElement} block
 * @param {{ name: string, label: string }[]} entries
 */
function addLanguageMenu(block, entries) {
  const panels = Array.from(qsa('.code-block__panel', block));
  const label = qs('.code-block__label', block);

  const menu = document.createElement('details');
  menu.className = 'code-block__languages';

  const trigger = document.createElement('summary');
  trigger.className = 'code-block__language-trigger btn btn--small';

  const caret = el('i', 'fa-solid fa-caret-down btn__icon');
  caret.setAttribute('aria-hidden', 'true');

  const triggerLabel = el('span', 'btn__label', entries[0].name);
  trigger.append(triggerLabel, caret);

  // The visible text alone would name the control "PowerShell", which says
  // nothing about it being a control.
  const nameTrigger = (name) =>
    trigger.setAttribute('aria-label', `Language: ${name}. Change language`);

  const select = (index) => {
    panels.forEach((panel, i) => (panel.hidden = i !== index));
    label.textContent = entries[index].label;
    label.hidden = !entries[index].label;
    measure(block);
  };

  const options = el('ul', 'code-block__language-options');
  entries.forEach((entry, index) => {
    const option = document.createElement('button');
    option.type = 'button';
    option.className = 'code-block__language-option';
    option.textContent = entry.name;
    option.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');

    option.addEventListener('click', () => {
      triggerLabel.textContent = entry.name;
      nameTrigger(entry.name);
      qsa('.code-block__language-option', options).forEach((other) =>
        other.setAttribute('aria-pressed', String(other === option))
      );
      menu.open = false;
      select(index);
    });

    const item = document.createElement('li');
    item.appendChild(option);
    options.appendChild(item);
  });

  menu.append(trigger, options);
  addMenuListeners(menu, trigger);

  nameTrigger(entries[0].name);
  qs('.code-block__language', block).replaceWith(menu);
  select(0);
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

/**
 * A group qualifies only when every panel is a lone code block. Groups holding
 * prose as well stay tabs, which detail-tabs.js builds.
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

    const found = participants.map((details) => {
      const summary = details.querySelector('summary');
      const children = Array.from(details.children).filter(
        (child) => child !== summary
      );
      const block = children[0];
      const isLoneCodeBlock =
        children.length === 1 &&
        block instanceof HTMLElement &&
        block.classList.contains('code-block');

      return isLoneCodeBlock && summary ? { summary, block } : null;
    });

    if (found.some((entry) => !entry)) return;

    const host = found[0].block;
    const entries = found.map(({ summary, block }) => ({
      name:
        summary.textContent?.trim() ||
        qs('.code-block__language', block).textContent ||
        '',
      label: qs('.code-block__label', block).textContent ?? '',
    }));

    // Every panel moves into the first block, which then takes the group's
    // place. The emptied shells leave with their <details>.
    const fade = qs('.code-block__fade', host);
    found
      .slice(1)
      .forEach(({ block }) => fade.before(qs('.code-block__panel', block)));

    participants[0].replaceWith(host);
    participants.forEach((details) => details.remove());

    addLanguageMenu(host, entries);
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
  copyOnClick('.code-block__copy', visibleCode);
  addCollapseListeners();
  measureAll();
}

export { enhanceCodeBlocks };
