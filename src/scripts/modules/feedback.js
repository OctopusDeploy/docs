// @ts-check
import { qs, qsa } from './query.js';
import { prefillUrl } from './feedback-form.js';

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

/**
 * Nothing is submitted from here. The widget collects the rating and the
 * comment, then hands the reader to the form with both filled in, and the
 * submission happens there. Send is an ordinary link, so it still reaches the
 * form with the page prefilled if this script never runs, and the site's
 * external link handling gives it its own tab.
 */
class Feedback {
  /** @param {HTMLElement} root */
  constructor(root) {
    this.root = root;
    this.votes = qsa('[data-feedback-vote]', root);
    this.comment = qs('[data-feedback-comment]', root);
    this.textarea = qs('textarea', root);
    this.send = qs('[data-feedback-send]', root);
    /** @type {string | null} */
    this.rating = null;

    this.addListeners();
    this.updateLink();
  }

  addListeners() {
    this.votes.forEach((button) => {
      button.addEventListener('click', () => this.vote(button));
    });
    this.textarea.addEventListener('input', () => this.updateLink());
  }

  /** @param {HTMLElement} chosen */
  vote(chosen) {
    this.rating = chosen.dataset.feedbackVote ?? null;
    this.votes.forEach((button) => {
      button.setAttribute('aria-pressed', String(button === chosen));
    });
    this.comment.hidden = false;
    this.updateLink();
  }

  updateLink() {
    this.send.setAttribute(
      'href',
      prefillUrl(
        pageLabel(this.root.dataset.feedbackPage ?? ''),
        this.rating,
        this.textarea.value
      )
    );
  }
}

qsa('[data-feedback]').forEach((root) => new Feedback(root));
