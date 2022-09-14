'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = jestExpectAdapter;

var _expect = require('@jest/expect');

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable local/prefer-spread-eventually */
function jestExpectAdapter(config) {
  // eslint-disable-next-line no-restricted-globals
  global.expect = _expect.jestExpect;

  _expect.jestExpect.setState({
    expand: config.expand
  }); // eslint-disable-next-line no-restricted-globals

  const jasmine = global.jasmine;
  jasmine.anything = _expect.jestExpect.anything;
  jasmine.any = _expect.jestExpect.any;
  jasmine.objectContaining = _expect.jestExpect.objectContaining;
  jasmine.arrayContaining = _expect.jestExpect.arrayContaining;
  jasmine.stringMatching = _expect.jestExpect.stringMatching;

  jasmine.addMatchers = jasmineMatchersObject => {
    const jestMatchersObject = Object.create(null);
    Object.keys(jasmineMatchersObject).forEach(name => {
      jestMatchersObject[name] = function (...args) {
        // use "expect.extend" if you need to use equality testers (via this.equal)
        const result = jasmineMatchersObject[name](null, null); // if there is no 'negativeCompare', both should be handled by `compare`

        const negativeCompare = result.negativeCompare || result.compare;
        return this.isNot
          ? negativeCompare.apply(null, args)
          : result.compare.apply(null, args);
      };
    });

    _expect.jestExpect.extend(jestMatchersObject);
  };
}
