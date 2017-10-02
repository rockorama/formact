// @flow

import type { Component, Element } from 'react'

export type ElementChildren = ?any

export type FieldName = string

export type FieldValue = string | boolean | number | Object

export type FieldValidateFunction = (
  value?: ?FieldValue,
  name?: ?FieldName,
) => string

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
