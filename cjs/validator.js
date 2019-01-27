"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidLabel = isValidLabel;
exports.isValidValue = isValidValue;

/**
 * @file LTSV validator.
 */

/**
 * validate label.
 *
 * @param {string} label
 * @return {boolean}
 */
function isValidLabel(label) {
  return /^[0-9A-Za-z_.-]+$/.test(label);
}
/**
 * validate for value.
 *
 * @param {string} value
 * @return {boolean}
 */


function isValidValue(value) {
  // eslint-disable-next-line no-control-regex
  return /^[\x01-\x08\x0B\x0C\x0E-\xFF]*$/.test(value);
}
//# sourceMappingURL=validator.js.map