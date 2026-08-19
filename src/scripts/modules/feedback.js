// @ts-check
import { qs, qsa } from './query.js';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  FORM_URL,
  READING_TIME,
} from './feedback-form.js';

/**
 * Crawlers walk the docs on every environment and work each control they find,
 * and their submissions land among the readers' in the same responses. Two
 * things separate them from someone reading the page: a click a script
 * dispatched carries `isTrusted` false, and a browser being driven says so on
 * `navigator.webdriver`, which the scanners running headless Chrome set as
 * surely as our own Playwright run does. Neither is proof and a determined
 * crawler defeats both, so this thins the noise rather than sealing anything.
 *
 * @param {Event} event
 * @returns {boolean}
 */
function automated(event) {
  return navigator.webdriver === true || !event.isTrusted;
}

// A page is answered once a day per browser. Long enough to stop a flood or a
// double send, short enough that a page revised next week can be answered
// again.
const ANSWERED_FOR = 24 * 60 * 60 * 1000;
const ANSWERED_KEY = 'feedback:answered:';

/**
 * Private browsing and storage turned off both throw on any of this. A reader
 * we cannot keep a note about is better served by being asked twice than by
 * losing the widget, so a failure reads as unanswered.
 *
 * @param {string} path
 * @returns {boolean}
 */
function answered(path) {
  try {
    const at = Number(localStorage.getItem(ANSWERED_KEY + path));

    return at > 0 && Date.now() - at < ANSWERED_FOR;
  } catch {
    return false;
  }
}

/** @param {string} path */
function recordAnswer(path) {
  try {
    localStorage.setItem(ANSWERED_KEY + path, String(Date.now()));
  } catch {
    // Nothing depends on the note having been kept.
  }
}

/**
 * Google Forms sends no CORS headers, so the POST has to go out as no-cors and
 * the response comes back opaque. There is no way to read whether the form
 * accepted it - a rejected submission looks identical to an accepted one, so
 * anything Google answered at all counts as accepted. A change to the form's
 * fields would therefore go unnoticed here.
 *
 * @param {string} page
 * @param {string} rating
 * @param {string} comment
 * @returns {Promise<void>}
 */
async function submit(page, rating, comment) {
  const body = new URLSearchParams();
  body.set(FIELD_PAGE, page);
  body.set(FIELD_RATING, rating);
  // The comment is marked required on the form, so a blank box still has to
  // send something for the submission to be accepted at all.
  body.set(FIELD_COMMENT, comment.trim() || ' ');

  await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body });
}

/**
 * The fragment is worth keeping - it says which section the reader had open -
 * but it is also the one part of the address that arrives verbatim from
 * whatever link was followed, and scanners crawl the docs appending prototype
 * pollution probes to it. Those probes ended up in the responses. Rather than
 * guess at which characters are junk, the fragment is kept only when it names
 * something on the page, which the legacy anchors carrying brackets, question
 * marks and emoji still do.
 *
 * @returns {string}
 */
function anchor() {
  const { hash } = window.location;
  if (hash.length < 2) return '';

  let id;
  try {
    id = decodeURIComponent(hash.slice(1));
  } catch {
    // A half-written escape sequence, so nothing a heading would answer to.
    return '';
  }

  return document.getElementById(id) ? hash : '';
}

/**
 * The title alone is ambiguous - "Overview" and "Prerequisites" repeat across
 * the docs - and the URL alone is unreadable in a spreadsheet, so the field
 * carries both. The query string is dropped, as campaign parameters say
 * nothing about the page.
 *
 * @param {string} title
 * @returns {string}
 */
function pageLabel(title) {
  const { origin, pathname } = window.location;
  const url = `${origin}${pathname}${anchor()}`;

  return title ? `${title} - ${url}` : url;
}

class Feedback {
  /** @param {HTMLElement} root */
  constructor(root) {
    this.root = root;
    this.votes = qsa('[data-feedback-vote]', root);
    this.comment = qs('[data-feedback-comment]', root);
    this.textarea = qs('textarea', root);
    this.send = qs('[data-feedback-send]', root);
    this.thanks = qs('[data-feedback-thanks]', root);
    this.trap = qs('[data-feedback-trap]', root);
    /** @type {string | null} */
    this.rating = null;
    this.votedAt = 0;

    if (answered(window.location.pathname)) {
      this.thank();
      return;
    }

    this.addListeners();
  }

  addListeners() {
    this.votes.forEach((button) => {
      button.addEventListener('click', () => this.vote(button));
    });
    this.send.addEventListener('click', (event) => this.submit(event));
  }

  /** @param {HTMLElement} chosen */
  vote(chosen) {
    this.rating = chosen.dataset.feedbackVote ?? null;
    this.votedAt = performance.now();
    this.votes.forEach((button) => {
      button.setAttribute('aria-pressed', String(button === chosen));
    });
    this.comment.hidden = false;
  }

  /**
   * Each of these is something a reader does not do. None of them is proof and
   * a crawler written against this widget defeats all three, so they thin the
   * noise rather than sealing anything.
   *
   * @param {Event} event
   * @returns {string} what gave the sender away, empty for a reader
   */
  crawlerTell(event) {
    if (automated(event)) return 'automated click';
    if (this.trap.value) return 'honeypot filled';
    if (performance.now() - this.votedAt < READING_TIME) return 'sent too fast';

    return '';
  }

  /** @param {Event} event */
  async submit(event) {
    if (!this.rating) return;

    // Answered the same way a reader's click is, so a crawler finds nothing to
    // work around and a run of the test suite still exercises the whole widget.
    const tell = this.crawlerTell(event);
    if (tell) {
      console.info(`[feedback] ${tell}, nothing sent`);
      this.thank();
      return;
    }

    // Guards against a second submission while the first is in flight.
    this.send.setAttribute('disabled', '');

    try {
      await submit(
        pageLabel(this.root.dataset.feedbackPage ?? ''),
        this.rating,
        this.textarea.value
      );
    } catch (err) {
      // Offline, or blocked by an extension - it never left the browser.
      console.warn('[feedback] submission failed', err);
      this.send.removeAttribute('disabled');
      return;
    }

    recordAnswer(window.location.pathname);
    this.thank();
  }

  thank() {
    this.root.querySelectorAll('.feedback__vote, .feedback__comment').forEach(
      /** @param {Element} el */ (el) => {
        /** @type {HTMLElement} */ (el).hidden = true;
      }
    );
    this.thanks.hidden = false;
  }
}

qsa('[data-feedback]').forEach((root) => new Feedback(root));
