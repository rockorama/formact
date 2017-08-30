'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _Form = require('../Form');

var _Form2 = _interopRequireDefault(_Form);

var _Input = require('../Input');

var _Input2 = _interopRequireDefault(_Input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global describe, expect, it, jest */
describe('Form', function () {
  it('Should render a component', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
      _Form2.default,
      null,
      _react2.default.createElement(_Input2.default, { name: 'test-input' })
    ));

    console.log(wrapper);
  });
});