// @ts-check

// The Google Form behind the feedback widget. Its three fields, read off the
// live form:
//   entry.336432709  "Which page did you view?"  short text, optional
//   entry.128617088  "How useful was the content?"  linear scale 1-5, required
//   entry.434783109  "...what we did well, or what we could improve"  required
// Yes maps to 5 and No to 1 - the form has no yes/no field to send to.
export const FORM_ID =
  '1FAIpQLSehVdN2w6tgSvp5QX7lHGnHDmgKi2Yfvko7bM2izgWQaqg-Wg';

// The form as a reader sees it. Google fills a field from the query string when
// `usp=pp_url` is set, so the widget hands over what has been answered so far
// and the reader presses submit on Google's own page.
export const VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;
export const FIELD_PAGE = 'entry.336432709';
export const FIELD_RATING = 'entry.128617088';
export const FIELD_COMMENT = 'entry.434783109';
export const RATING_YES = '5';
export const RATING_NO = '1';

// A prefilled answer travels in the URL, and browsers stop honouring one a few
// thousand characters in, so a very long one is cut. The reader sees the cut
// text sitting in the form and can finish it there.
export const COMMENT_LIMIT = 1500;

/**
 * @param {string} page
 * @param {string | null} rating
 * @param {string} comment
 * @returns {string}
 */
export function prefillUrl(page, rating, comment) {
  const params = new URLSearchParams({ usp: 'pp_url' });
  params.set(FIELD_PAGE, page);

  if (rating) params.set(FIELD_RATING, rating);

  const answer = comment.trim().slice(0, COMMENT_LIMIT);
  if (answer) params.set(FIELD_COMMENT, answer);

  return `${VIEW_URL}?${params}`;
}
