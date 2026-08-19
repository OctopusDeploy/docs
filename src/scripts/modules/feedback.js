// @ts-check
import { qs, qsa } from './query.js';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  FORM_URL,
  HUMAN_EVENTS,
  HUMAN_EVENTS_NEEDED,
  MAX_HASH_LENGTH,
  MIN_READ_MS,
  MIN_VOTE_TO_SEND_MS,
} from './feedback-form.js';

// The gates below read what the browser reports about the input itself, so none
// of them depend on recognising a particular tool. See feedback-form.js for
// what they are answering.

// Capture, so scrolling inside a nested container still counts. Passive, as
// these only ever read.
const LISTENER_OPTIONS = { capture: true, passive: true };

// Selenium, Puppeteer and Playwright all set this. A browser a person is
// sitting at reports false, and a caller that clears it still has the rest of
// the gates to get past.
const automated = navigator.webdriver === true;

let humanEvents = 0;

/** @param {Event} event */
function countHumanEvent(event) {
  // Synthesised events are the reason this counter exists.
  if (!event.isTrusted) return;

  humanEvents += 1;

  if (humanEvents >= HUMAN_EVENTS_NEEDED) {
    HUMAN_EVENTS.forEach((name) =>
      window.removeEventListener(name, countHumanEvent, LISTENER_OPTIONS)
    );
  }
}

if (!automated) {
  HUMAN_EVENTS.forEach((name) =>
    window.addEventListener(name, countHumanEvent, LISTENER_OPTIONS)
  );
}

/**
 * `isTrusted` is false for anything dispatched from script, `element.click()`
 * included.
 *
 * @param {Event} event
 * @returns {boolean}
 */
function fromAPerson(event) {
  return !automated && event.isTrusted && humanEvents >= HUMAN_EVENTS_NEEDED;
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
 * A fragment is kept only where it names a heading that is on the page, so the
 * field carries a real section of a real page and nothing else. The fragment is
 * the one part of the URL this field preserves, which is where a scanner
 * probing the page from the address bar puts its payload.
 *
 * @returns {string}
 */
function sectionHash() {
  const id = window.location.hash.slice(1);

  // Slug characters only, which rules out the `=` and `&` a query string needs.
  if (!id || id.length > MAX_HASH_LENGTH || !/^[\w-]+$/.test(id)) return '';

  return document.getElementById(id) ? `#${id}` : '';
}

/**
 * The title alone is ambiguous - "Overview" and "Prerequisites" repeat across
 * the docs - and the URL alone is unreadable in a spreadsheet, so the field
 * carries both. The hash says which section was open. The query string is
 * dropped, as campaign parameters say nothing about the page.
 *
 * @param {string} title
 * @returns {string}
 */
function pageLabel(title) {
  const { origin, pathname } = window.location;
  const url = `${origin}${pathname}${sectionHash()}`;

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
    /** @type {string | null} */
    this.rating = null;
    /** Milliseconds since the page loaded, as `performance.now()` reports. */
    this.votedAt = 0;

    this.addListeners();
  }

  addListeners() {
    this.votes.forEach((button) => {
      button.addEventListener('click', (event) => this.vote(event, button));
    });
    this.send.addEventListener('click', (event) => this.submit(event));
  }

  /**
   * A rejected click does nothing and says nothing, so a caller reading the DOM
   * afterwards learns only that the widget is where it was.
   *
   * @param {Event} event
   * @param {HTMLElement} chosen
   */
  vote(event, chosen) {
    if (!fromAPerson(event)) return;

    this.rating = chosen.dataset.feedbackVote ?? null;
    this.votedAt = performance.now();
    this.votes.forEach((button) => {
      button.setAttribute('aria-pressed', String(button === chosen));
    });
    this.comment.hidden = false;
    // The markup ships this disabled, so a widget that never took a vote leaves
    // a button the browser fires no click on at all.
    this.send.removeAttribute('disabled');
  }

  /**
   * The two waits sit here rather than on the vote, so an early click still
   * opens the comment box and the reader has somewhere to go. Writing anything
   * at all takes longer than either wait.
   *
   * @param {Event} event
   */
  async submit(event) {
    if (!this.rating) return;
    if (!fromAPerson(event)) return;
    if (performance.now() < MIN_READ_MS) return;
    if (performance.now() - this.votedAt < MIN_VOTE_TO_SEND_MS) return;

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

    this.root.querySelectorAll('.feedback__vote, .feedback__comment').forEach(
      /** @param {Element} el */ (el) => {
        /** @type {HTMLElement} */ (el).hidden = true;
      }
    );
    this.thanks.hidden = false;
  }
}

qsa('[data-feedback]').forEach((root) => new Feedback(root));
