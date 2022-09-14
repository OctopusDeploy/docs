import "core-js/modules/es.object.assign.js";
import addons, { makeDecorator } from '@storybook/addons';
import { SET_OPTIONS } from './shared';
import { manager, registerKnobs } from './registerKnobs';
export function knob(name, options) {
  return manager.knob(name, options);
}
export function text(name, value, groupId) {
  return manager.knob(name, {
    type: 'text',
    value: value,
    groupId: groupId
  });
}
export function boolean(name, value, groupId) {
  return manager.knob(name, {
    type: 'boolean',
    value: value,
    groupId: groupId
  });
}
export function number(name, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  var rangeDefaults = {
    min: 0,
    max: 10,
    step: 1
  };
  var mergedOptions = options.range ? Object.assign({}, rangeDefaults, options) : options;
  var finalOptions = Object.assign({
    type: 'number'
  }, mergedOptions, {
    value: value,
    groupId: groupId
  });
  return manager.knob(name, finalOptions);
}
export function color(name, value, groupId) {
  return manager.knob(name, {
    type: 'color',
    value: value,
    groupId: groupId
  });
}
export function object(name, value, groupId) {
  return manager.knob(name, {
    type: 'object',
    value: value,
    groupId: groupId
  });
}
export function select(name, options, value, groupId) {
  return manager.knob(name, {
    type: 'select',
    selectV2: true,
    options: options,
    value: value,
    groupId: groupId
  });
}
export function radios(name, options, value, groupId) {
  return manager.knob(name, {
    type: 'radios',
    options: options,
    value: value,
    groupId: groupId
  });
}
export function array(name, value) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ',';
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return manager.knob(name, {
    type: 'array',
    value: value,
    separator: separator,
    groupId: groupId
  });
}
export function date(name) {
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();
  var groupId = arguments.length > 2 ? arguments[2] : undefined;
  var proxyValue = value ? value.getTime() : new Date().getTime();
  return manager.knob(name, {
    type: 'date',
    value: proxyValue,
    groupId: groupId
  });
}
export function button(name, callback, groupId) {
  return manager.knob(name, {
    type: 'button',
    callback: callback,
    hideLabel: true,
    groupId: groupId
  });
}
export function files(name, accept) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var groupId = arguments.length > 3 ? arguments[3] : undefined;
  return manager.knob(name, {
    type: 'files',
    accept: accept,
    value: value,
    groupId: groupId
  });
}
export function optionsKnob(name, valuesObj, value, optionsObj, groupId) {
  return manager.knob(name, {
    type: 'options',
    options: valuesObj,
    value: value,
    optionsObj: optionsObj,
    groupId: groupId
  });
}
var defaultOptions = {
  escapeHTML: true
};
export var withKnobs = makeDecorator({
  name: 'withKnobs',
  parameterName: 'knobs',
  skipIfNoParametersOrOptions: false,
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options,
        parameters = _ref.parameters;
    var storyOptions = parameters || options;
    var allOptions = Object.assign({}, defaultOptions, storyOptions);
    var channel = addons.getChannel();
    manager.setChannel(channel);
    manager.setOptions(allOptions);
    channel.emit(SET_OPTIONS, allOptions);
    registerKnobs();
    return getStory(context);
  }
});
export * from './shared';

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}