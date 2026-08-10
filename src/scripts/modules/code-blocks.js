// @ts-check
import { qs, qsa } from './query.js';
import { copyOnClick } from './copy-button.js';

// The shell around each block, its copy button included, is rendered at build
// time by src/plugins/shiki-code-block.js. This wires up what happens next.

/** Taller than this and the block collapses until it is opened. */
const COLLAPSE_HEIGHT = 500;

const SHOW_MORE = 'Show more';
const SHOW_LESS = 'Show less';

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

/* Language switcher ------------------------------------------------------ */

/**
 * A <select>, so the keyboard handling, the dismissal and the mobile picker are
 * the browser's rather than ours.
 *
 * @param {HTMLElement} block
 * @param {{ name: string, label: string }[]} entries
 */
function addLanguageSelect(block, entries) {
  const panels = Array.from(qsa('.code-block__panel', block));
  const label = qs('.code-block__label', block);

  const select = document.createElement('select');
  select.className = 'code-block__language-select btn btn--small';
  select.setAttribute('aria-label', 'Language');

  entries.forEach((entry, index) => {
    const option = document.createElement('option');
    option.value = String(index);
    option.textContent = entry.name;
    select.appendChild(option);
  });

  const show = () => {
    const index = select.selectedIndex;
    panels.forEach((panel, i) => (panel.hidden = i !== index));
    label.textContent = entries[index].label;
    label.hidden = !entries[index].label;
    measure(block);
  };

  select.addEventListener('change', show);

  // Wrapped, because a <select> renders no pseudo-element to hang the caret on.
  const switcher = document.createElement('span');
  switcher.className = 'code-block__language-switcher';
  switcher.appendChild(select);

  qs('.code-block__language', block).replaceWith(switcher);
  show();
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

    // A group of one still loses its <details>, but a switcher holding a single
    // option would be a control that cannot do anything.
    if (entries.length === 1) {
      qs('.code-block__language', host).textContent = entries[0].name;
    } else {
      addLanguageSelect(host, entries);
    }
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
    setToggle(block, false);
    return;
  }

  block.style.setProperty('--code-block-height', `${height}px`);
  block.setAttribute('data-collapsible', '');
}

/**
 * @param {HTMLElement} block
 * @param {boolean} expanded
 */
function setToggle(block, expanded) {
  const toggle = qs('.code-block__toggle', block);
  toggle.textContent = expanded ? SHOW_LESS : SHOW_MORE;
  toggle.setAttribute('aria-expanded', String(expanded));
}

/**
 * Delegated to the document because detail-tabs.js rebuilds its panels from
 * innerHTML, which drops any listener held on an element inside one.
 *
 * Opening is one way apart from the toggle. Collapsing on a click elsewhere
 * pulled the page up by however tall the block was, which moved everything
 * under the reader's cursor and lost their place.
 */
function addCollapseListeners() {
  document.addEventListener('click', (event) => {
    if (!(event.target instanceof Element)) return;

    const toggle = event.target.closest('.code-block__toggle');
    if (toggle) {
      const block = toggle.closest('.code-block');
      if (!(block instanceof HTMLElement)) return;

      const expanded = block.toggleAttribute('data-expanded');
      setToggle(block, expanded);
      // Closing takes back however tall the block was, so the reader is put at
      // the top of it rather than wherever that height ran out. Instant,
      // because animating a jump this large only reads as lag.
      if (!expanded) {
        // 'instant' rather than 'auto': the site sets scroll-behavior: smooth
        // on html, and 'auto' would defer to it and animate the jump.
        block.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      return;
    }

    const body = event.target.closest(
      '.code-block[data-collapsible] .code-block__body'
    );
    const block = body?.closest('.code-block');
    if (block instanceof HTMLElement && !block.hasAttribute('data-expanded')) {
      block.setAttribute('data-expanded', '');
      setToggle(block, true);
    }
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
