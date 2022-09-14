import "core-js/modules/es.function.name.js";
import addons from '@storybook/addons';
import { useEffect } from '@storybook/client-api';
import { STORY_CHANGED, FORCE_RE_RENDER } from '@storybook/core-events';
import debounce from 'lodash/debounce';
import KnobManager from './KnobManager';
import { CHANGE, CLICK, RESET, SET } from './shared';
export var manager = new KnobManager();
var knobStore = manager.knobStore;
var COMPONENT_FORCE_RENDER_DEBOUNCE_DELAY_MS = 325;

function forceReRender() {
  addons.getChannel().emit(FORCE_RE_RENDER);
}

function setPaneKnobs() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();
  var channel = addons.getChannel();
  channel.emit(SET, {
    knobs: knobStore.getAll(),
    timestamp: timestamp
  });
}

var resetAndForceUpdate = function resetAndForceUpdate() {
  knobStore.markAllUnused();
  forceReRender();
}; // Increase performance by reducing how frequently the story is recreated during knob changes


var debouncedResetAndForceUpdate = debounce(resetAndForceUpdate, COMPONENT_FORCE_RENDER_DEBOUNCE_DELAY_MS);

function knobChanged(change) {
  var name = change.name;
  var value = change.value; // Update the related knob and it's value.

  var knobOptions = knobStore.get(name);
  knobOptions.value = value;

  if (!manager.options.disableForceUpdate && !knobOptions.disableForceUpdate) {
    if (!manager.options.disableDebounce && !knobOptions.disableDebounce) {
      debouncedResetAndForceUpdate();
    } else {
      resetAndForceUpdate();
    }
  }
}

function knobClicked(clicked) {
  var knobOptions = knobStore.get(clicked.name);

  if (knobOptions.callback && knobOptions.callback() !== false) {
    forceReRender();
  }
}

function resetKnobs() {
  knobStore.reset();
  setPaneKnobs(false);
}

function resetKnobsAndForceReRender() {
  knobStore.reset();
  forceReRender();
  setPaneKnobs(false);
}

function disconnectCallbacks() {
  var channel = addons.getChannel();
  channel.removeListener(CHANGE, knobChanged);
  channel.removeListener(CLICK, knobClicked);
  channel.removeListener(STORY_CHANGED, resetKnobs);
  channel.removeListener(RESET, resetKnobsAndForceReRender);
  knobStore.unsubscribe(setPaneKnobs);
}

function connectCallbacks() {
  var channel = addons.getChannel();
  channel.on(CHANGE, knobChanged);
  channel.on(CLICK, knobClicked);
  channel.on(STORY_CHANGED, resetKnobs);
  channel.on(RESET, resetKnobsAndForceReRender);
  knobStore.subscribe(setPaneKnobs);
  return disconnectCallbacks;
}

export function registerKnobs() {
  useEffect(connectCallbacks, []);
}