/*!
 * @license ltsv.js Copyright(c) 2013 sasa+1
 * https://github.com/sasaplus1/ltsv.js
 * Released under the MIT license.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.ltsv = {})));
}(this, (function (exports) { 'use strict';

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

  /**
   * convert to record string from object.
   *
   * @private
   * @param {Object} object
   * @param {boolean} strict
   * @return {string}
   * @throws {TypeError}
   */

  function objectToRecord(object, strict) {
    if (object === null || typeof object !== 'object') {
      throw new TypeError('object must be an Object');
    }

    const keys = Object.keys(object);
    const fields = [];

    for (let i = 0, len = keys.length; i < len; ++i) {
      const label = keys[i];
      const value = object[keys[i]];

      if (strict && !isValidLabel(label)) {
        throw new SyntaxError(`unexpected character of label: "${label}"`);
      }

      if (strict && !isValidValue(value)) {
        throw new SyntaxError(`unexpected character of value: "${value}"`);
      }

      fields[i] = label + ':' + value;
    }

    return fields.join('\t');
  }
  /**
   * convert to LTSV string from object or array.
   *
   * @private
   * @param {Object|Object[]} data
   * @param {boolean} strict
   * @return {string}
   * @throws {TypeError}
   */


  function baseFormat(data, strict) {
    const isArray = Array.isArray(data);

    if (!isArray || data === null || typeof data !== 'object') {
      throw new TypeError('data must be an Object or Array');
    }

    const records = [];

    if (isArray) {
      for (let i = 0, len = data.length; i < len; ++i) {
        records[i] = objectToRecord(data[i], strict);
      }
    } else {
      records.push(objectToRecord(data, strict));
    }

    return records.join('\n');
  }
  /**
   * convert to LTSV string from object or array.
   *
   * @see baseFormat
   */


  function format(data) {
    return baseFormat(data, false);
  }
  /**
   * convert to LTSV string from object or array.
   *
   * @see baseFormat
   */

  function formatStrict(data) {
    return baseFormat(data, true);
  }

  /**
   * split to label and value from field.
   *
   * @private
   * @param {string} chunk
   * @param {boolean} strict
   * @return {Object}
   * @throws {SyntaxError}
   */

  function splitField(chunk, strict) {
    const field = String(chunk);
    const index = field.indexOf(':');

    if (index === -1) {
      throw new SyntaxError(`field separator is not found: "${field}"`);
    }

    const label = field.slice(0, index);
    const value = field.slice(index + 1);

    if (strict && !isValidLabel(label)) {
      throw new SyntaxError(`unexpected character of label: "${label}"`);
    }

    if (strict && !isValidValue(value)) {
      throw new SyntaxError(`unexpected character of value: "${value}"`);
    }

    return {
      label,
      value
    };
  }
  /**
   *
   * @private
   * @param {string} text
   * @param {boolean} strict
   * @return {Object[]}
   */


  function baseParse(text, strict) {
    const lines = String(text).replace(/(?:\r?\n)+$/, '').split(/\r?\n/);
    const records = [];

    for (let i = 0, len = lines.length; i < len; ++i) {
      records[i] = splitField(lines[i], strict);
    }

    return records;
  }
  /**
   *
   * @private
   * @param {string} line
   * @param {boolean} strict
   * @return {Object}
   */


  function baseParseLine(line, strict) {
    const fields = String(line).replace(/(?:\r?\n)+$/, '').split('\t');
    const record = {};

    for (let i = 0, len = fields.length; i < len; ++i) {
      const {
        label,
        value
      } = splitField(fields[i], strict);
      record[label] = value;
    }

    return record;
  }

  function parse(text) {
    return baseParse(text, false);
  }
  function parseLine(line) {
    return baseParseLine(line, false);
  }
  function parseStrict(text) {
    return baseParse(text, true);
  }
  function parseLineStrict(line) {
    return baseParseLine(line, true);
  }

  exports.format = format;
  exports.formatStrict = formatStrict;
  exports.parse = parse;
  exports.parseLine = parseLine;
  exports.parseStrict = parseStrict;
  exports.parseLineStrict = parseLineStrict;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ltsv.js.map
