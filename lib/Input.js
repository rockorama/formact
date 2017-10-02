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

var _validation = require('./validation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props, context) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

    _initialiseProps.call(_this);

    _this.state = {
      value: props.value || props.defaultValue || ''
    };
    return _this;
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.context && this.context.addField) {
        var _value = this.state.value;

        this.context.addField({
          name: this.props.name,
          value: _value,
          validate: this.validate
        });

        if (this.state.value) {
          this.propagateValue();
        }
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.context && this.context.removeField) {
        this.context.removeField(this.props.name);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = this.state.value;


      if ('value' in nextProps) {
        value = nextProps.value;
      }

      if (this.context && this.props.name !== nextProps.name) {
        this.context.removeField(this.props.name);
        this.context.addField({
          name: nextProps.name,
          value: value,
          validate: this.validate
        });
        value = nextProps.value || nextProps.defaultValue;
      }

      if (value !== this.state.value) {
        this.setState({
          value: value
        }, this.propagateValue);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          validation = _props.validation,
          multiline = _props.multiline,
          remainingProps = _objectWithoutProperties(_props, ['validation', 'multiline']);

      if (multiline) {
        return _react2.default.createElement('textarea', _extends({}, remainingProps, {
          value: this.state.value,
          onChange: this.onChange
        }));
      }

      return _react2.default.createElement('input', _extends({}, remainingProps, {
        value: this.state.value,
        onChange: this.onChange
      }));
    }
  }]);

  return Input;
}(_react.Component);

Input.defaultProps = {
  type: 'text'
};
Input.contextTypes = {
  addField: _propTypes2.default.func,
  removeField: _propTypes2.default.func,
  valueChanged: _propTypes2.default.func,
  submitted: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.propagateValue = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this2.props;

    if (_this2.context && _this2.context.valueChanged) {
      _this2.context.valueChanged(props.name, _this2.state.value);
    }
  };

  this.onChange = function (e) {
    var _ref = e.currentTarget,
        value = _ref.value;


    _this2.setState({
      value: value
    }, _this2.propagateValue);

    if (_this2.props.onChange) {
      _this2.props.onChange(e);
    }
  };

  this.validate = function () {
    var _props2 = _this2.props,
        validation = _props2.validation,
        required = _props2.required;


    if (!validation) {
      validation = [];
    } else if (!Array.isArray(validation)) {
      validation = [validation];
    }

    if (required) {
      validation = [_validation.REQUIRED].concat(_toConsumableArray(validation));
    }

    if (_this2.props.type === 'email') {
      validation = [_validation.EMAIL].concat(_toConsumableArray(validation));
    }

    return validation.map(function (fun) {
      return fun(_this2.state.value, _this2.props.label);
    }).filter(function (m) {
      return m;
    }).join(' ');
  };
};

exports.default = Input;