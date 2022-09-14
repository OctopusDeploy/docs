import "core-js/modules/es.regexp.exec.js";
import "core-js/modules/es.string.split.js";

var unconvertable = function unconvertable() {
  return undefined;
};

export var converters = {
  jsonParse: function jsonParse(value) {
    return JSON.parse(value);
  },
  jsonStringify: function jsonStringify(value) {
    return JSON.stringify(value);
  },
  simple: function simple(value) {
    return value;
  },
  stringifyIfSet: function stringifyIfSet(value) {
    return value === null || value === undefined ? '' : String(value);
  },
  stringifyIfTruthy: function stringifyIfTruthy(value) {
    return value ? String(value) : null;
  },
  toArray: function toArray(value) {
    if (Array.isArray(value)) {
      return value;
    }

    return value.split(',');
  },
  toBoolean: function toBoolean(value) {
    return value === 'true';
  },
  toDate: function toDate(value) {
    return new Date(value).getTime() || new Date().getTime();
  },
  toFloat: function toFloat(value) {
    return value === '' ? null : parseFloat(value);
  }
};
export var serializers = {
  array: converters.simple,
  boolean: converters.stringifyIfTruthy,
  button: unconvertable,
  checkbox: converters.simple,
  color: converters.simple,
  date: converters.toDate,
  files: unconvertable,
  number: converters.stringifyIfSet,
  object: converters.jsonStringify,
  options: converters.simple,
  radios: converters.simple,
  select: converters.simple,
  text: converters.simple
};
export var deserializers = {
  array: converters.toArray,
  boolean: converters.toBoolean,
  button: unconvertable,
  checkbox: converters.simple,
  color: converters.simple,
  date: converters.toDate,
  files: unconvertable,
  number: converters.toFloat,
  object: converters.jsonParse,
  options: converters.simple,
  radios: converters.simple,
  select: converters.simple,
  text: converters.simple
};