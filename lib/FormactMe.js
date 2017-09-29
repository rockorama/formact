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

var FormactMe = function (_Component) {
  _inherits(FormactMe, _Component);

  function FormactMe(props, context) {
    _classCallCheck(this, FormactMe);

    var _this = _possibleConstructorReturn(this, (FormactMe.__proto__ || Object.getPrototypeOf(FormactMe)).call(this, props, context));

    _initialiseProps.call(_this);

    var fieldValue = props.fieldValue || props.defaultValue || null;

    _this.state = {
      fieldValue: fieldValue,
      errorMessage: _this.validate(fieldValue, props),
      dirty: false
    };
    return _this;
  }

  _createClass(FormactMe, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.context && this.context.addField) {
        var _fieldValue = this.state.fieldValue;

        this.context.addField({
          name: this.props.name,
          fieldValue: _fieldValue,
          validate: this.validate
        });

        if (_fieldValue) {
          this.propagateValue(_fieldValue);
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
      var fieldValue = this.state.fieldValue;


      if ('fieldValue' in nextProps) {
        fieldValue = nextProps.fieldValue;
      }

      if (this.context && this.props.name !== nextProps.name) {
        var _value = nextProps.fieldValue || nextProps.defaultValue;
        this.context.removeField(this.props.name);
        this.context.addField({
          name: nextProps.name,
          value: _value,
          validate: this.validate
        });
        this.setState({
          fieldValue: _value,
          errorMessage: this.validate(_value, nextProps),
          dirty: false
        });
      } else if (fieldValue !== this.state.fieldValue) {
        this.propagateValue(fieldValue);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          render = _props.render,
          other = _objectWithoutProperties(_props, ['component', 'render']);

      var props = _extends({}, other, {
        onChange: this.onChange,
        setDirty: this.setDirty,
        submitted: this.context.submitted()
      }, this.state);

      if (component) {
        return _react2.default.createElement(component, props);
      }

      if (render) {
        return render(props);
      }

      return null;
    }
  }]);

  return FormactMe;
}(_react.Component);

FormactMe.contextTypes = {
  addField: _propTypes2.default.func,
  removeField: _propTypes2.default.func,
  valueChanged: _propTypes2.default.func,
  submitted: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.propagateValue = function (fieldValue) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.props;

    _this2.setState({
      fieldValue: fieldValue,
      errorMessage: _this2.validate(fieldValue, props)
    }, _this2.setValueChanged);
  };

  this.setValueChanged = function () {
    if (_this2.context && _this2.context.valueChanged) {
      _this2.context.valueChanged(_this2.props.name, _this2.state.fieldValue);
    }
  };

  this.onChange = function (fieldValue) {
    _this2.propagateValue(fieldValue);

    if (_this2.props.onChange) {
      _this2.props.onChange(fieldValue);
    }
  };

  this.validate = function (fieldValue) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _this2.props;
    var validation = props.validation,
        required = props.required,
        type = props.type;

    var errorMessage = '';

    if (!validation) {
      validation = [];
    } else if (!Array.isArray(validation)) {
      validation = [validation];
    }

    if (required) {
      validation = [_validation.REQUIRED].concat(_toConsumableArray(validation));
    }

    if (type === 'email') {
      validation = [_validation.EMAIL].concat(_toConsumableArray(validation));
    }

    errorMessage = validation.map(function (fun) {
      return fun(fieldValue, props.label || props.name);
    }).filter(function (m) {
      return m;
    }).join(' ');

    return errorMessage;
  };

  this.setDirty = function () {
    _this2.setState({
      dirty: true
    });
  };
};

exports.default = FormactMe;