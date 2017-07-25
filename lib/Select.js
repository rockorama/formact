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

var Select = function (_Component) {
  _inherits(Select, _Component);

  function Select(props, context) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props, context));

    _initialiseProps.call(_this);

    var value = props.value || props.defaultValue || _this.getFirstValue(props) || '';

    _this.state = {
      value: value
    };
    return _this;
  }

  _createClass(Select, [{
    key: 'getFirstValue',
    value: function getFirstValue(props) {
      if (props.options.length) {
        if (typeof props.options[0] === 'string') {
          return props.options[0];
        } else {
          return props.options[0].value;
        }
      }
    }
  }, {
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
      }

      if (value !== this.state.value) {
        this.setState({
          value: value
        }, this.propagateValue);
      }
    }
  }, {
    key: 'renderOption',
    value: function renderOption(item) {
      if (typeof item === 'string') {
        return _react2.default.createElement(
          'option',
          { key: 'option-' + item },
          item
        );
      }
      return _react2.default.createElement('option', _extends({}, item, { key: 'option-' + item.toString() }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          other = _objectWithoutProperties(_props, ['options']);

      return _react2.default.createElement(
        'select',
        _extends({}, other, {
          value: this.state.value,
          onChange: this.onChange
        }),
        options.map(function (item) {
          return _this2.renderOption(item);
        })
      );
    }
  }]);

  return Select;
}(_react.Component);

Select.contextTypes = {
  addField: _propTypes2.default.func,
  removeField: _propTypes2.default.func,
  valueChanged: _propTypes2.default.func,
  submitted: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.propagateValue = function () {
    if (_this3.context && _this3.context.valueChanged) {
      _this3.context.valueChanged(_this3.props.name, _this3.state.value);
    }
  };

  this.onChange = function (e) {
    var _ref = e.currentTarget,
        value = _ref.value;


    _this3.setState({
      value: value
    }, _this3.propagateValue);

    if (_this3.props.onChange) {
      _this3.props.onChange(e);
    }
  };

  this.validate = function () {
    var _props2 = _this3.props,
        validation = _props2.validation,
        required = _props2.required;

    var errorMessage = '';

    if (!validation) {
      validation = [];
    } else if (!Array.isArray(validation)) {
      validation = [validation];
    }

    if (required) {
      validation = [_validation.REQUIRED].concat(_toConsumableArray(validation));
    }

    errorMessage = validation.map(function (fun) {
      return fun(_this3.state.value, _this3.props.name);
    }).filter(function (m) {
      return m;
    }).join(' ');

    return errorMessage;
  };
};

exports.default = Select;