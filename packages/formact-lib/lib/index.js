"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = exports.turnIntoField = exports.useField = exports.EMAIL_VALIDATION = exports.EMAIL_REGEX = exports.useForm = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FormContext = (0, _react.createContext)({
  errors: {},
  values: {},
  valid: true,
  submitted: false,
  submitting: false,
  getValue: function getValue() {
    return '';
  },
  updateValue: function updateValue() {},
  updateValues: function updateValues() {},
  addField: function addField() {},
  removeField: function removeField() {},
  submit: function submit() {},
  clear: function clear() {},
  isDirty: function isDirty() {
    return false;
  },
  setDirty: function setDirty() {},
  setError: function setError() {}
});

var validate = function validate(newstate) {
  var errors = {};
  var valid = true;
  Object.keys(newstate.validations).forEach(function (key) {
    if (newstate.validations[key]) {
      var fieldErrors = newstate.validations[key].map(function (fun) {
        return fun(newstate.values[key], newstate.values);
      }).join(' ');

      if (fieldErrors === ' ') {
        fieldErrors = '';
      }

      if (newstate.forcedErrors[key]) {
        fieldErrors = fieldErrors + ' ' + newstate.forcedErrors[key];
      }

      errors[key] = fieldErrors;

      if (valid && fieldErrors) {
        valid = false;
      }
    }
  });
  return {
    errors: errors,
    valid: valid
  };
};

var reducer = function reducer(state, action) {
  var _objectSpread4, _objectSpread5, _objectSpread6, _objectSpread7, _objectSpread8;

  var newState = {};

  switch (action.type) {
    case 'UPDATE':
      if (Array.isArray(action.payload)) {
        var _values = {};
        action.payload.forEach(function (element) {
          _values[element.field] = element.value;
        });
        newState = _objectSpread({}, state, {
          values: _objectSpread({}, state.values, {}, _values)
        });
      } else {
        var _objectSpread2;

        newState = _objectSpread({}, state, {
          values: _objectSpread({}, state.values, (_objectSpread2 = {}, _objectSpread2[action.payload.field] = action.payload.value, _objectSpread2))
        });
      }

      break;

    case 'ADD':
      if (action.payload.validation) {
        var _objectSpread3;

        newState = _objectSpread({}, state, {
          validations: _objectSpread({}, state.validations, (_objectSpread3 = {}, _objectSpread3[action.payload.field] = Array.isArray(action.payload.validation) ? action.payload.validation : [action.payload.validation], _objectSpread3))
        });
      } else {
        newState = state;
      }

      break;

    case 'REMOVE':
      newState = _objectSpread({}, state, {
        errors: _objectSpread({}, state.errors, (_objectSpread4 = {}, _objectSpread4[action.payload.field] = undefined, _objectSpread4)),
        values: _objectSpread({}, state.values, (_objectSpread5 = {}, _objectSpread5[action.payload.field] = undefined, _objectSpread5)),
        validations: _objectSpread({}, state.validations, (_objectSpread6 = {}, _objectSpread6[action.payload.field] = undefined, _objectSpread6))
      });
      break;

    case 'CLEAR':
      newState = _objectSpread({}, state, {
        errors: {},
        dirty: {},
        values: _objectSpread({}, action.payload.initialValue)
      });
      break;

    case 'SET_DIRTY':
      newState = _objectSpread({}, state, {
        dirty: _objectSpread({}, state.dirty, (_objectSpread7 = {}, _objectSpread7[action.payload.field] = true, _objectSpread7))
      });
      break;

    case 'SET_ERROR':
      newState = _objectSpread({}, state, {
        forcedErrors: _objectSpread({}, state.forcedErrors, (_objectSpread8 = {}, _objectSpread8[action.payload.field] = action.payload.message, _objectSpread8))
      });
      break;

    default:
      newState = state;
      break;
  }

  var _validate = validate(newState),
      errors = _validate.errors,
      valid = _validate.valid;

  newState.errors = errors;
  newState.valid = valid;
  action.onChange && action.onChange(_objectSpread({}, newState, {
    action: action.type
  }));
  return newState;
};

var useFormReducer = function useFormReducer(initialValue, onChange) {
  if (initialValue === void 0) {
    initialValue = {};
  }

  var _useReducer = (0, _react.useReducer)(reducer, {
    validations: {},
    errors: {},
    dirty: {},
    forcedErrors: {},
    values: initialValue,
    valid: true
  }),
      state = _useReducer[0],
      action = _useReducer[1];

  var getValue = function getValue(field) {
    return state.values[field] || '';
  };

  var updateValue = function updateValue(field, value) {
    action({
      type: 'UPDATE',
      payload: {
        field: field,
        value: value
      },
      onChange: onChange
    });
  };

  var updateValues = function updateValues(collection) {
    action({
      type: 'UPDATE',
      payload: collection,
      onChange: onChange
    });
  };

  var addField = function addField(field, validation) {
    action({
      type: 'ADD',
      payload: {
        field: field,
        validation: validation
      },
      onChange: onChange
    });
  };

  var removeField = function removeField(field) {
    action({
      type: 'REMOVE',
      payload: {
        field: field
      },
      onChange: onChange
    });
  };

  var clear = function clear() {
    action({
      type: 'CLEAR',
      payload: {
        initialValue: initialValue
      },
      onChange: onChange
    });
  };

  var isDirty = function isDirty(field) {
    return state.dirty[field];
  };

  var setDirty = function setDirty(field) {
    action({
      type: 'SET_DIRTY',
      payload: {
        field: field
      }
    });
  };

  var setError = function setError(field, message) {
    action({
      type: 'SET_ERROR',
      payload: {
        field: field,
        message: message
      },
      onChange: onChange
    });
  };

  return _objectSpread({}, state, {
    getValue: getValue,
    updateValue: updateValue,
    updateValues: updateValues,
    addField: addField,
    removeField: removeField,
    isDirty: isDirty,
    setDirty: setDirty,
    clear: clear,
    setError: setError
  });
};

var useForm = function useForm() {
  return (0, _react.useContext)(FormContext);
};

exports.useForm = useForm;

var REQUIRED_VALIDATION = function REQUIRED_VALIDATION(errorMessage) {
  if (errorMessage === void 0) {
    errorMessage = 'Required field.';
  }

  return function (value) {
    return !value ? errorMessage : '';
  };
};
/* eslint-disable */


var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

exports.EMAIL_REGEX = EMAIL_REGEX;

var EMAIL_VALIDATION = function EMAIL_VALIDATION(errorMessage) {
  if (errorMessage === void 0) {
    errorMessage = 'Invalid email.';
  }

  return function (value) {
    if (!value) {
      return '';
    }

    if (typeof value === 'string') {
      return EMAIL_REGEX.test(value) ? '' : errorMessage;
    }

    return errorMessage;
  };
};

exports.EMAIL_VALIDATION = EMAIL_VALIDATION;

var useField = function useField(props) {
  var name = props.name;

  var _useForm = useForm(),
      errors = _useForm.errors,
      getValue = _useForm.getValue,
      isDirty = _useForm.isDirty,
      setDirty = _useForm.setDirty,
      updateValue = _useForm.updateValue,
      addField = _useForm.addField,
      removeField = _useForm.removeField,
      submitted = _useForm.submitted,
      submit = _useForm.submit,
      submitting = _useForm.submitting,
      valid = _useForm.valid;

  var validation = props.validation ? Array.isArray(props.validation) ? [].concat(props.validation) : [props.validation] : [];

  if (props.required) {
    validation = [REQUIRED_VALIDATION(props.defaultErrorMessages ? props.defaultErrorMessages.required : undefined)].concat(validation);
  }

  if (props.type === 'email') {
    validation = [EMAIL_VALIDATION(props.defaultErrorMessages ? props.defaultErrorMessages.email : undefined)].concat(validation);
  }

  if (!validation.length) {
    validation = undefined;
  }

  (0, _react.useEffect)(function () {
    addField(name, validation);
    return function () {
      removeField(name);
    };
  }, // eslint-disable-next-line
  []);
  var dirty = isDirty(name);
  var errorMessage = errors[name];
  var showError = !!errorMessage && (submitted || dirty);

  var onBlur = function onBlur(e) {
    setDirty(name);
    props.onBlur && props.onBlur(e);
  };

  var fieldValue = getValue(name);

  var update = function update(newvalue) {
    return updateValue(name, newvalue);
  };

  var payload = {
    fieldValue: fieldValue,
    update: update,
    showError: showError,
    errorMessage: errorMessage,
    onBlur: onBlur,
    submit: submit,
    submitting: submitting,
    valid: valid
  };
  return payload;
};

exports.useField = useField;

var turnIntoField = function turnIntoField(Component, defaultErrorMessages) {
  return function (props) {
    var fieldProps = useField(_objectSpread({}, props, {
      defaultErrorMessages: defaultErrorMessages
    }));
    return /*#__PURE__*/_react.default.createElement(Component, (0, _extends2.default)({}, props, fieldProps));
  };
};

exports.turnIntoField = turnIntoField;

var Form = function Form(props) {
  var reducer = useFormReducer(props.initialValues, props.onChange);

  var _useState = (0, _react.useState)(false),
      submitted = _useState[0],
      setSubmitted = _useState[1];

  var _useState2 = (0, _react.useState)(false),
      submitting = _useState2[0],
      setSubmitting = _useState2[1];

  var onSubmit = function onSubmit(mode) {
    setSubmitted(true);

    if (props.onSubmit) {
      setSubmitting(true);
      props.onSubmit && props.onSubmit({
        valid: reducer.valid,
        values: reducer.values,
        errors: reducer.errors,
        onFinish: function onFinish(clear) {
          setSubmitting(false);

          if (clear) {
            reducer.clear();
            setSubmitted(false);
          }
        },
        setError: reducer.setError
      }, mode);
    }
  };

  var value = _objectSpread({}, reducer, {
    submitted: submitted,
    submitting: submitting,
    submit: onSubmit
  });

  return /*#__PURE__*/_react.default.createElement(FormContext.Provider, {
    value: value
  }, typeof props.children === 'function' ? props.children(value) : props.children);
};

var _default = Form;
exports.default = _default;