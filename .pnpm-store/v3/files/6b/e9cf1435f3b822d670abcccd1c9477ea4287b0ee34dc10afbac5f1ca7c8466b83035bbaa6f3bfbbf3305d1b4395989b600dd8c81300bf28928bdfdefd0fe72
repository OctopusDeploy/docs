/* global window */

var passiveSupported = false; // eslint-disable-line import/no-mutable-exports

if (typeof window !== 'undefined') {
  try {
    var options = Object.defineProperty({}, 'passive', {
      get: function get() {
        passiveSupported = true;
      }
    });

    window.addEventListener('test', null, options);
    window.removeEventListener('test', null, options);
  } catch (err) {} // eslint-disable-line no-empty
}

export default passiveSupported;
