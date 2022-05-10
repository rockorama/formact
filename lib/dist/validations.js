"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_VALIDATION = exports.EMAIL_REGEX = exports.REQUIRED_VALIDATION = void 0;
const REQUIRED_VALIDATION = (errorMessage = 'Required field.') => (value) => !value ? errorMessage : '';
exports.REQUIRED_VALIDATION = REQUIRED_VALIDATION;
/* eslint-disable */
exports.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */
const EMAIL_VALIDATION = (errorMessage = 'Invalid email.') => (value) => {
    if (!value) {
        return '';
    }
    if (typeof value === 'string') {
        return exports.EMAIL_REGEX.test(value) ? '' : errorMessage;
    }
    return errorMessage;
};
exports.EMAIL_VALIDATION = EMAIL_VALIDATION;
//# sourceMappingURL=../src/dist/validations.js.map