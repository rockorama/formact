// @flow

import _FormMe from './FormMe'
import _FieldMe from './FieldMe'
import _SubmitMe from './SubmitMe'
import {
  applyFormactField as _applyFormactField,
  applyFormactForm as _applyFormactForm,
  applyFormactSubmit as _applyFormactSubmit,
} from './applyFormact'

export const FormMe = _FormMe
export const FieldMe = _FieldMe
export const SubmitMe = _SubmitMe
export const applyFormactField = _applyFormactField
export const applyFormactForm = _applyFormactForm
export const applyFormactSubmit = _applyFormactSubmit

export type {
  FormSubmitPayload,
  FormChangePayload,
  FieldValidateFunction,
  FieldName,
  FieldValue,
  ElementChildren,
} from './types'
