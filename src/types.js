// @flow

import type { Component, Element } from 'react'

export type ElementChild = void | number | string | Element<*>

export type ElementChildren = ElementChild | Array<ElementChild>

export type FieldName = string

export type FieldValue = string | boolean | number | Object

export type FieldValidateFunction = () => string

export type FormSubmitPayload = {
  valid: boolean,
  fields: Object,
  errors: Object,
}

export type FormChangePayload = {
  valid: boolean,
  fields: Object,
  errors: Object,
  lastChange: FieldName,
}

export type FormAddFieldPayload = {
  name: string,
  value: string,
  validate?: FieldValidateFunction,
}
