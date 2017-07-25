/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EMAIL_REGEX */
/* unused harmony export USERNAME_CHARACTERS */
/* unused harmony export USERNAME_ASCII_VALIDATION */
/* unused harmony export ASCII_VALIDATION */
/* unused harmony export ERROR_MESSAGES */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return EMAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return REQUIRED; });
/* unused harmony export USERNAME_INVALID_CHARACTERS */
/* unused harmony export PASSWORD_INVALID_CHARACTERS */
/* unused harmony export PASSWORD_LENGTH */
/* unused harmony export REGISTER_PASSWORD_VALIDATION */
/* eslint-disable */
var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */
var USERNAME_CHARACTERS = /[a-zA-Z0-9_]/g;
var USERNAME_ASCII_VALIDATION = new RegExp('^' + USERNAME_CHARACTERS.source + '*$');

var ASCII_VALIDATION = /^[\x20-\x7e]*$/;

var ERROR_MESSAGES = {
  email: 'Please provide a valid e-mail address.',
  required: 'Field is required.'
};

var EMAIL = function EMAIL(value) {
  if (value) {
    return EMAIL_REGEX.test(value) ? '' : ERROR_MESSAGES.email;
  }
};

var REQUIRED = function REQUIRED(value, label) {
  if (value) {
    return '';
  }

  if (label) {
    return label + ' is required.';
  }

  return ERROR_MESSAGES.required;
};

var USERNAME_INVALID_CHARACTERS = function USERNAME_INVALID_CHARACTERS(value) {
  return !USERNAME_ASCII_VALIDATION.test(value) ? 'There are invalid characters in this username.' : '';
};

var PASSWORD_INVALID_CHARACTERS = function PASSWORD_INVALID_CHARACTERS(value) {
  return !ASCII_VALIDATION.test(value) ? 'There are invalid characters in this password.' : '';
};

var PASSWORD_LENGTH = function PASSWORD_LENGTH(value) {
  return value && value.length < 5 ? 'Password must have at least 5 characters.' : '';
};

var REGISTER_PASSWORD_VALIDATION = [PASSWORD_LENGTH, PASSWORD_INVALID_CHARACTERS];

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Form__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return __WEBPACK_IMPORTED_MODULE_0__Form__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Input__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return __WEBPACK_IMPORTED_MODULE_1__Input__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Select__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Select", function() { return __WEBPACK_IMPORTED_MODULE_2__Select__["a"]; });







/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'form',
        _extends({}, others, { onChange: this.onChange, onSubmit: this.onSubmit }),
        children
      );
    }
  }]);

  return Form;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Form.childContextTypes = {
  addField: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  removeField: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  valueChanged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  submitted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
/* harmony default export */ __webpack_exports__["a"] = (Form);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validation__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input(props, context) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props, context));

    _this.propagateValue = function () {
      if (_this.context && _this.context.valueChanged) {
        _this.context.valueChanged(_this.props.name, _this.state.value);
      }
    };

    _this.onChange = function (e) {
      var _ref = e.currentTarget,
          value = _ref.value;


      _this.setState({
        value: value
      }, _this.propagateValue);

      if (_this.props.onChange) {
        _this.props.onChange(e);
      }
    };

    _this.validate = function () {
      var _this$props = _this.props,
          validation = _this$props.validation,
          required = _this$props.required;


      if (!validation) {
        validation = [];
      } else if (!Array.isArray(validation)) {
        validation = [validation];
      }

      if (required) {
        validation = [__WEBPACK_IMPORTED_MODULE_2__validation__["a" /* REQUIRED */]].concat(_toConsumableArray(validation));
      }

      if (_this.props.type === 'email') {
        validation = [__WEBPACK_IMPORTED_MODULE_2__validation__["b" /* EMAIL */]].concat(_toConsumableArray(validation));
      }

      return validation.map(function (fun) {
        return fun(_this.state.value, _this.props.label);
      }).filter(function (m) {
        return m;
      }).join(' ');
    };

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
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('textarea', _extends({}, remainingProps, {
          value: this.state.value,
          onChange: this.onChange
        }));
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', _extends({}, remainingProps, {
        value: this.state.value,
        onChange: this.onChange
      }));
    }
  }]);

  return Input;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Input.defaultProps = {
  type: 'text'
};
Input.contextTypes = {
  addField: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  removeField: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  valueChanged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  submitted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
};
/* harmony default export */ __webpack_exports__["a"] = (Input);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validation__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'option',
          { key: 'option-' + item },
          item
        );
      }
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('option', _extends({}, item, { key: 'option-' + item.toString() }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          other = _objectWithoutProperties(_props, ['options']);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

Select.contextTypes = {
  addField: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  removeField: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  valueChanged: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  submitted: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func
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
      validation = [__WEBPACK_IMPORTED_MODULE_2__validation__["a" /* REQUIRED */]].concat(_toConsumableArray(validation));
    }

    errorMessage = validation.map(function (fun) {
      return fun(_this3.state.value, _this3.props.name);
    }).filter(function (m) {
      return m;
    }).join(' ');

    return errorMessage;
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Select);

/***/ })
/******/ ]);