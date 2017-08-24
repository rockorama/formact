'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */
var EMAIL_REGEX = exports.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

var ERROR_MESSAGES = exports.ERROR_MESSAGES = {
  email: 'Please provide a valid e-mail address.',
  required: 'Field is required.'
};

var EMAIL = exports.EMAIL = function EMAIL(value) {
  if (value) {
    return EMAIL_REGEX.test(value) ? '' : ERROR_MESSAGES.email;
  }
};

var REQUIRED = exports.REQUIRED = function REQUIRED(value, label) {
  if (value) {
    return '';
  }

  if (label) {
    return label + ' is required.';
  }

  return ERROR_MESSAGES.required;
};