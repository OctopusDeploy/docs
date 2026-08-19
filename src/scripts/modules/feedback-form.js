// @ts-check

// Constants shared by the widget's script, its markup and its tests. Nothing
// here reads the DOM, so the component can import it during the build.

// The Google Form behind the feedback widget. Its three fields, read off the
// live form:
//   entry.336432709  "Which page did you view?"  short text, optional
//   entry.128617088  "How useful was the content?"  linear scale 1-5, required
//   entry.434783109  "...what we did well, or what we could improve"  required
// Yes maps to 5 and No to 1 - the form has no yes/no field to send to.
export const FORM_ID =
  '1FAIpQLSehVdN2w6tgSvp5QX7lHGnHDmgKi2Yfvko7bM2izgWQaqg-Wg';
export const FORM_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
export const FIELD_PAGE = 'entry.336432709';
export const FIELD_RATING = 'entry.128617088';
export const FIELD_COMMENT = 'entry.434783109';
export const RATING_YES = '5';
export const RATING_NO = '1';

// A scanner drove the widget by loading every page with a payload in the
// fragment and clicking each button it found, which sent a stream of
// thumbs-down responses carrying that payload in the page field. The rest of
// this file is what separates that from a person reading a page.

// Events a person produces on the way to the widget. Pointer and touch presses
// are left out: they arrive as part of the click rather than ahead of it, so
// they say nothing about what came first.
export const HUMAN_EVENTS = [
  'pointermove',
  'wheel',
  'scroll',
  'keydown',
  'touchmove',
];

// Three, so one synthesised mouse move in front of a click falls short.
export const HUMAN_EVENTS_NEEDED = 3;

// The scanner loaded a page, clicked through it and submitted inside three
// seconds. Reading enough of an article to hold an opinion takes longer.
export const MIN_READ_MS = 3000;

// Long enough to reach for the textarea and then the button.
export const MIN_VOTE_TO_SEND_MS = 800;

// Well past the longest heading slug in the docs, and short enough that the
// field cannot be used to carry a payload.
export const MAX_HASH_LENGTH = 100;
