// @ts-check

import { qsa } from './query.js';

const highlightClass = 'highlight';

/**
 * Marks the link in a table of contents whose section the reader is in, and
 * keeps it in step as the page scrolls.
 *
 * Every table of contents on the page gets its own call, and each keeps its
 * own state — a page can show more than one at a time.
 *
 * @param {string} tocSelector selector for the links of one table of contents
 */
function highlightCurrentHeading(tocSelector) {
  /** @type {{link: HTMLElement, heading: HTMLElement}[]} */
  const entries = [];

  qsa(tocSelector).forEach((link) => {
    const id = getBookmarkLink(link.href);
    const heading = id ? document.getElementById(id) : null;

    // A link can outlive its heading — a stale anchor, or a heading rendered
    // conditionally. Those links just never highlight.
    if (heading) {
      entries.push({ link, heading });
    }
  });

  if (entries.length === 0) {
    return;
  }

  /** @type {{link: HTMLElement, heading: HTMLElement} | undefined} */
  let current;
  let queued = false;

  const update = () => {
    queued = false;

    const entry = currentEntry(entries);
    if (entry === current) {
      return;
    }

    current = entry;
    entries.forEach((candidate) => {
      candidate.link.classList.toggle(highlightClass, candidate === entry);
    });
  };

  // Scroll fires far more often than the page can paint, so the reading is
  // taken once per frame at most.
  const queue = () => {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  };

  update();
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
}

/**
 * The section the reader is in: the last heading to have passed the line that
 * `scroll-padding-block-start` parks a clicked anchor on. Clicking a link in
 * the table of contents therefore always highlights the link that was clicked.
 *
 * Above the first heading the first section is used, and at the bottom of the
 * page the last one is, so a final section too short to scroll to the line
 * still gets its turn.
 *
 * @param {{link: HTMLElement, heading: HTMLElement}[]} entries
 */
function currentEntry(entries) {
  const doc = document.documentElement;

  if (Math.ceil(window.scrollY + window.innerHeight) >= doc.scrollHeight) {
    return entries[entries.length - 1];
  }

  // `scrollPaddingTop` is `auto` when the page sets no scroll padding.
  const line = parseFloat(getComputedStyle(doc).scrollPaddingTop) || 0;

  let current = entries[0];

  entries.forEach((entry) => {
    // A clicked heading lands exactly on the line, so allow a pixel for the
    // browser's rounding of the scroll position.
    if (entry.heading.getBoundingClientRect().top <= line + 1) {
      current = entry;
    }
  });

  return current;
}

/**
 * The fragment of a link's href, if it has one.
 *
 * @param {string} link
 */
function getBookmarkLink(link) {
  const linkParts = link.split('#');

  if (linkParts.length === 2) {
    return linkParts[1];
  }

  return '';
}

export { highlightCurrentHeading };
