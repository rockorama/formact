import { FieldValue } from './types'

export const REQUIRED_VALIDATION =
  (errorMessage: string = 'Required field.') =>
  (value: FieldValue) =>
    !value ? errorMessage : ''

/* eslint-disable */
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/* eslint-enable */

export const EMAIL_VALIDATION =
  (errorMessage: string = 'Invalid email.') =>
  (value: FieldValue): string => {
    if (!value) {
      return ''
    }

    if (typeof value === 'string') {
      return EMAIL_REGEX.test(value) ? '' : errorMessage
    }

    return errorMessage
  }
