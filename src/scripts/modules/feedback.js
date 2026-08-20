// @ts-check
import { qs, qsa } from './query.js';
import {
  FIELD_COMMENT,
  FIELD_PAGE,
  FIELD_RATING,
  FORM_URL,
} from './feedback-form.js';

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
  // Required on the form, and required by the widget as well, so there is
  // always something here.
  body.set(FIELD_COMMENT, comment.trim());

  await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body });
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
  const { origin, pathname, hash } = window.location;
  const url = `${origin}${pathname}${hash}`;

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

    this.addListeners();
  }

  addListeners() {
    this.votes.forEach((button) => {
      button.addEventListener('click', () => this.vote(button));
    });
    this.textarea.addEventListener('input', () => this.allowSend());
    this.send.addEventListener('click', () => this.submit());
  }

  /**
   * The security scanner that crawls the docs works every control it finds and
   * types into none of them, so each of its submissions arrives with an empty
   * box. Send is out of reach until there is something worth sending.
   */
  allowSend() {
    if (this.textarea.value.trim()) {
      this.send.removeAttribute('disabled');
    } else {
      this.send.setAttribute('disabled', '');
    }
  }

  /** @param {HTMLElement} chosen */
  vote(chosen) {
    this.rating = chosen.dataset.feedbackVote ?? null;
    this.votes.forEach((button) => {
      button.setAttribute('aria-pressed', String(button === chosen));
    });
    this.comment.hidden = false;
  }

  async submit() {
    // The disabled button covers both of these already. They are here for the
    // caller that reaches the handler another way.
    if (!this.rating || !this.textarea.value.trim()) return;

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
