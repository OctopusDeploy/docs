import "core-js/modules/es.array.from.js";
import "core-js/modules/es.array.iterator.js";
import "core-js/modules/es.array.map.js";
import "core-js/modules/es.function.name.js";
import "core-js/modules/es.object.to-string.js";
import "core-js/modules/es.promise.js";
import "core-js/modules/es.string.iterator.js";
import "core-js/modules/web.dom-collections.iterator.js";
import { FileReader } from 'global';
import PropTypes from 'prop-types';
import React from 'react';
import { styled } from '@storybook/theming';
import { Form } from '@storybook/components';
var FileInput = styled(Form.Input)({
  paddingTop: 4
});

function fileReaderPromise(file) {
  return new Promise(function (resolve) {
    var fileReader = new FileReader();

    fileReader.onload = function (e) {
      return resolve(e.currentTarget.result);
    };

    fileReader.readAsDataURL(file);
  });
}

var serialize = function serialize() {
  return undefined;
};

var deserialize = function deserialize() {
  return undefined;
};

var FilesType = function FilesType(_ref) {
  var knob = _ref.knob,
      _onChange = _ref.onChange;
  return /*#__PURE__*/React.createElement(FileInput, {
    type: "file",
    name: knob.name,
    multiple: true,
    onChange: function onChange(e) {
      if (e.target.files) {
        Promise.all(Array.from(e.target.files).map(fileReaderPromise)).then(_onChange);
      }
    },
    accept: knob.accept,
    size: "flex"
  });
};

FilesType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
FilesType.propTypes = {
  knob: PropTypes.shape({
    name: PropTypes.string
  }),
  onChange: PropTypes.func
};
FilesType.serialize = serialize;
FilesType.deserialize = deserialize;
export default FilesType;