'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this.fields = {}, _this.validators = {}, _this.submitted = false, _this.checkSubmitted = function () {
      return _this.submitted;
    }, _this.valueChanged = function (name, value) {
      if (name) {
        _this.fields[name].value = value;

        _this.validate();
        _this.triggerOnChange(name);
      }
    }, _this.addField = function (_ref2) {
      var name = _ref2.name,
          value = _ref2.value,
          validate = _ref2.validate;

      _this.fields[name] = {
        value: value
      };
      _this.validators[name] = {
        validate: validate
      };
      _this.validate();
      _this.triggerOnChange(name);
    }, _this.removeField = function (name) {
      var newFields = {};
      Object.keys(_this.fields).forEach(function (field) {
        if (name !== field) {
          newFields[field] = _this.fields[field];
        }
      });
      _this.fields = newFields;
      _this.validators[name] = null;
      _this.validate();
      _this.triggerOnChange(name);
    }, _this.onSubmit = function (e) {
      var valid = _this.isValid();
      _this.submitted = true;

      if (!valid) {
        e.preventDefault();
      }

      if (_this.props.onSubmit) {
        _this.props.onSubmit(e, { valid: valid, fields: _this.fields });
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        addField: this.addField,
        removeField: this.removeField,
        valueChanged: this.valueChanged,
        submitted: this.checkSubmitted
      };
    }
  }, {
    key: 'triggerOnChange',
    value: function triggerOnChange(name) {
      var onChange = this.props.onChange;


      if (onChange) {
        onChange({
          fields: this.fields,
          lastChange: name,
          valid: this.isValid()
        });
      }
    }
  }, {
    key: 'validate',
    value: function validate() {
      var _this2 = this;

      Object.keys(this.fields).forEach(function (field) {
        _this2.fields[field].errors = _this2.validateField(field);
      });
    }
  }, {
    key: 'validateField',
    value: function validateField(field) {
      var validate = this.validators[field].validate;

      if (!validate || typeof validate !== 'function') {
        return '';
      }
      return validate();
    }
  }, {
    key: 'isValid',
    value: function isValid() {
      var _this3 = this;

      return !Object.keys(this.fields).find(function (field) {
        return _this3.fields[field].errors;
      });
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      e.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          others = _objectWithoutProperties(_props, ['children']);

      return _react2.default.createElement(
        'form',
        _extends({}, others, { onChange: this.onChange, onSubmit: this.onSubmit }),
        children
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.childContextTypes = {
  addField: _propTypes2.default.func,
  removeField: _propTypes2.default.func,
  valueChanged: _propTypes2.default.func,
  submitted: _propTypes2.default.func
};
exports.default = Form;