// @ts-check
import { qs, qsa } from './query.js';

// The Google Form behind the widget. Its three fields, read off the live form:
//   entry.336432709  "Which page did you view?"  short text, optional
//   entry.128617088  "How useful was the content?"  linear scale 1-5, required
//   entry.434783109  "...what we did well, or what we could improve"  required
// Yes maps to 5 and No to 1 - the form has no yes/no field to send to.
const FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSehVdN2w6tgSvp5QX7lHGnHDmgKi2Yfvko7bM2izgWQaqg-Wg/formResponse';
const FIELD_PAGE = 'entry.336432709';
const FIELD_RATING = 'entry.128617088';
const FIELD_COMMENT = 'entry.434783109';

/**
 * Google Forms sends no CORS headers, so the POST has to go out as no-cors and
 * the response comes back opaque. There is no way to read whether the form
 * accepted it - a rejected submission looks identical to an accepted one. The
 * widget therefore reports success optimistically.
 *
 * @param {string} rating
 * @param {string} comment
 * @returns {Promise<void>}
 */
async function submit(rating, comment) {
  const body = new URLSearchParams();
  body.set(FIELD_PAGE, window.location.href);
  body.set(FIELD_RATING, rating);
  // The comment is marked required on the form, so a blank box still has to
  // send something for the submission to be accepted at all.
  body.set(FIELD_COMMENT, comment.trim() || ' ');

  await fetch(FORM_URL, { method: 'POST', mode: 'no-cors', body });
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
    this.send.addEventListener('click', () => this.submit());
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
    if (!this.rating) return;

    // Guards against a second submission while the first is in flight.
    this.send.setAttribute('disabled', '');

    try {
      await submit(this.rating, this.textarea.value);
    } catch (err) {
      // A network-level failure. Nothing useful to offer the reader here, and
      // the design has no error state, so the thank you still shows.
      console.warn('[feedback] submission failed', err);
    }

    this.root.querySelectorAll('.feedback__vote, .feedback__comment').forEach(
      /** @param {Element} el */ (el) => {
        /** @type {HTMLElement} */ (el).hidden = true;
      }
    );
    this.thanks.hidden = false;
  }
}

export function enhanceFeedback() {
  qsa('[data-feedback]').forEach((root) => new Feedback(root));
}
