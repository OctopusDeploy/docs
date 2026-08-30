// @ts-check

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
