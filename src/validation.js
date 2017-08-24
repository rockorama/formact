/* eslint-disable */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/* eslint-enable */

export const ERROR_MESSAGES = {
  email: 'Please provide a valid e-mail address.',
  required: 'Field is required.',
}

export const EMAIL = value => {
  if (value) {
    return EMAIL_REGEX.test(value) ? '' : ERROR_MESSAGES.email
  }
}

export const REQUIRED = (value, label) => {
  if (value) {
    return ''
  }

  if (label) {
    return `${label} is required.`
  }

  return ERROR_MESSAGES.required
}
