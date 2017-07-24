/* eslint-disable */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/* eslint-enable */
export const USERNAME_CHARACTERS = /[a-zA-Z0-9_]/g
export const USERNAME_ASCII_VALIDATION = new RegExp(`^${USERNAME_CHARACTERS.source}*$`)

export const ASCII_VALIDATION = /^[\x20-\x7e]*$/

export const ERROR_MESSAGES = {
  email: 'Please provide a valid e-mail address.',
  required: 'Field is required.',
}

export const EMAIL = (value) => {
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

export const USERNAME_INVALID_CHARACTERS = (value) => {
  return (!USERNAME_ASCII_VALIDATION.test(value))
    ? 'There are invalid characters in this username.' : ''
}

export const PASSWORD_INVALID_CHARACTERS = (value) => {
  return (!ASCII_VALIDATION.test(value))
    ? 'There are invalid characters in this password.' : ''
}

export const PASSWORD_LENGTH = (value) => {
  return (value && value.length < 5)
    ? 'Password must have at least 5 characters.' : ''
}

export const REGISTER_PASSWORD_VALIDATION = [PASSWORD_LENGTH, PASSWORD_INVALID_CHARACTERS]
