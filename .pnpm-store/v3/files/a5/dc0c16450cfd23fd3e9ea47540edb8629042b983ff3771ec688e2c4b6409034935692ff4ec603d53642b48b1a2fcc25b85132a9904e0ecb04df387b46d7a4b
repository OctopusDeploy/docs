"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _StoryPanel = require("./StoryPanel");

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_addons.addons.register(_.ADDON_ID, function (api) {
  _addons.addons.addPanel(_.PANEL_ID, {
    title: 'Story',
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return active ? /*#__PURE__*/_react.default.createElement(_StoryPanel.StoryPanel, {
        key: key,
        api: api
      }) : null;
    },
    paramKey: 'storysource'
  });
});