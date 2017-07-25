'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable */
var EMAIL_REGEX = exports.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */
var USERNAME_CHARACTERS = exports.USERNAME_CHARACTERS = /[a-zA-Z0-9_]/g;
var USERNAME_ASCII_VALIDATION = exports.USERNAME_ASCII_VALIDATION = new RegExp('^' + USERNAME_CHARACTERS.source + '*$');

var ASCII_VALIDATION = exports.ASCII_VALIDATION = /^[\x20-\x7e]*$/;

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

var USERNAME_INVALID_CHARACTERS = exports.USERNAME_INVALID_CHARACTERS = function USERNAME_INVALID_CHARACTERS(value) {
  return !USERNAME_ASCII_VALIDATION.test(value) ? 'There are invalid characters in this username.' : '';
};

var PASSWORD_INVALID_CHARACTERS = exports.PASSWORD_INVALID_CHARACTERS = function PASSWORD_INVALID_CHARACTERS(value) {
  return !ASCII_VALIDATION.test(value) ? 'There are invalid characters in this password.' : '';
};

var PASSWORD_LENGTH = exports.PASSWORD_LENGTH = function PASSWORD_LENGTH(value) {
  return value && value.length < 5 ? 'Password must have at least 5 characters.' : '';
};

var REGISTER_PASSWORD_VALIDATION = exports.REGISTER_PASSWORD_VALIDATION = [PASSWORD_LENGTH, PASSWORD_INVALID_CHARACTERS];