import * as React from 'react';
import addons from '@storybook/addons';
import Panel from './components/Panel';
import { ADDON_ID, PANEL_ID, PARAM_KEY } from './shared';
import { createTitleListener } from './title';
addons.register(ADDON_ID, function (api) {
  addons.addPanel(PANEL_ID, {
    title: createTitleListener(api),
    render: function render(_ref) {
      var active = _ref.active,
          key = _ref.key;
      return /*#__PURE__*/React.createElement(Panel, {
        api: api,
        key: key,
        active: active
      });
    },
    paramKey: PARAM_KEY
  });
});