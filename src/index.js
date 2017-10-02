// @flow

import _Form from './Form'
import _Input from './Input'
import _Select from './Select'
import _FormactMe from './FormactMe'
import _applyFormact from './applyFormact'

export const Form = _Form
export const Input = _Input
export const Select = _Select
export const FormactMe = _FormactMe
export const applyFormact = _applyFormact

export type {
  FormSubmitPayload,
  FormChangePayload,
  FieldValidateFunction,
  FieldName,
  FieldValue,
  ElementChildren,
} from './types'
