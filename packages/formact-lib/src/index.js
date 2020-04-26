// @flow

import React, {
  type Element,
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react'

export type FormSubmitPayload = {
  valid: boolean,
  values: Object,
  errors: Object,
  onFinish: (clear?: boolean) => void,
}

type PayloadField = {
  field: string,
  value?: string,
}

type ValidationFunction = (value: string, values: Object) => ?string
export type Validation = ValidationFunction | Array<ValidationFunction>

export type FormContextType = {
  errors: Object,
  values: Object,
  valid: boolean,
  submitted: boolean,
  submitting: boolean,
  isDirty: (field: string) => boolean,
  setDirty: (field: string) => any,
  getValue: (field: string) => string,
  updateValue: (field: string, value: string) => any,
  updateValues: (fields: Array<PayloadField>) => any,
  addField: (field: string, validation?: Validation) => any,
  removeField: (field: string) => any,
  submit: () => any,
  clear: () => any,
}

const FormContext = createContext<FormContextType>({
  errors: {},
  values: {},
  valid: true,
  submitted: false,
  submitting: false,
  getValue: () => '',
  updateValue: () => {},
  updateValues: () => {},
  addField: () => {},
  removeField: () => {},
  submit: () => {},
  clear: () => {},
  isDirty: () => false,
  setDirty: () => {},
})

type State = {
  errors: Object,
  values: Object,
  validations: Object,
  dirty: Object,
  valid: boolean,
}

type UpdateAction = {
  type: 'UPDATE',
  payload: PayloadField | Array<PayloadField>,
}

type AddFieldAction = {
  type: 'ADD',
  payload: {
    field: string,
    validation?: Validation,
  },
}

type RemoveFieldAction = {
  type: 'REMOVE',
  payload: {
    field: string,
  },
}

type SetDirty = {
  type: 'SET_DIRTY',
  payload: {
    field: string,
  },
}

type ClearAction = {
  type: 'CLEAR',
}

type Action =
  | UpdateAction
  | AddFieldAction
  | RemoveFieldAction
  | ClearAction
  | SetDirty

const validate = (newstate) => {
  const errors = {}

  let valid = true
  Object.keys(newstate.validations).forEach((key) => {
    if (newstate.validations[key]) {
      let fieldErrors = newstate.validations[key]
        .map((fun) => fun(newstate.values[key], newstate.values))
        .join(' ')

      if (fieldErrors === ' ') {
        fieldErrors = ''
      }

      errors[key] = fieldErrors
      if (valid && fieldErrors) {
        valid = false
      }
    }
  })
  return { errors, valid }
}

const reducer = (state: State, action: Action) => {
  let newState = {}

  switch (action.type) {
    case 'UPDATE':
      if (Array.isArray(action.payload)) {
        const values = {}
        action.payload.forEach((element) => {
          values[element.field] = element.value
        })
        newState = { ...state, values: { ...state.values, ...values } }
      } else {
        newState = {
          ...state,
          values: {
            ...state.values,
            [action.payload.field]: action.payload.value,
          },
        }
      }
      break
    case 'ADD':
      if (action.payload.validation) {
        newState = {
          ...state,
          validations: {
            ...state.validations,
            [action.payload.field]: Array.isArray(action.payload.validation)
              ? action.payload.validation
              : [action.payload.validation],
          },
        }
      } else {
        newState = state
      }
      break

    case 'REMOVE':
      newState = {
        ...state,
        errors: { ...state.errors, [action.payload.field]: undefined },
        values: { ...state.values, [action.payload.field]: undefined },
        validations: {
          ...state.validations,
          [action.payload.field]: undefined,
        },
      }
      break
    case 'CLEAR':
      newState = {
        ...state,
        errors: {},
        values: {},
        dirty: {},
        validations: {
          ...state.validations,
        },
      }
      break
    case 'SET_DIRTY':
      newState = {
        ...state,
        dirty: { ...state.dirty, [action.payload.field]: true },
      }
      break
    default:
      newState = state
      break
  }

  const { errors, valid } = validate(newState)

  newState.errors = errors
  newState.valid = valid
  return newState
}

const useFormReducer = (initialValue: Object = {}) => {
  const [state, action] = useReducer<State, Action>(reducer, {
    validations: {},
    errors: {},
    dirty: {},
    values: initialValue,
    valid: true,
  })
  const getValue = (field: string) => {
    return state.values[field] || ''
  }

  const updateValue = (field: string, value: string) => {
    action({
      type: 'UPDATE',
      payload: {
        field,
        value,
      },
    })
  }

  const updateValues = (collection: Array<PayloadField>) => {
    action({
      type: 'UPDATE',
      payload: collection,
    })
  }

  const addField = (field: string, validation?: Validation) => {
    action({
      type: 'ADD',
      payload: {
        field,
        validation,
      },
    })
  }

  const removeField = (field: string) => {
    action({
      type: 'REMOVE',
      payload: {
        field,
      },
    })
  }

  const clear = () => {
    action({
      type: 'CLEAR',
    })
  }

  const isDirty = (field: string) => {
    return state.dirty[field]
  }

  const setDirty = (field: string) => {
    action({
      type: 'SET_DIRTY',
      payload: {
        field,
      },
    })
  }

  return {
    ...state,
    getValue,
    updateValue,
    updateValues,
    addField,
    removeField,
    isDirty,
    setDirty,
    clear,
  }
}

export const useForm = () => {
  return useContext(FormContext)
}

export type FieldProps = {
  name: string,
  validation?: Validation,
  required?: boolean,
  type?: string,
  onBlur?: (event: Object) => any,
  defaultErrorMessages?: {
    email?: string,
    required?: string,
  },
}

const REQUIRED_VALIDATION = (errorMessage: string = 'Required field.') => (
  value,
) => (!value ? errorMessage : '')

/* eslint-disable */
export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/* eslint-enable */

export const EMAIL_VALIDATION = (errorMessage: string = 'Invalid email.') => (
  value: string,
): string => {
  if (!value) {
    return ''
  }

  if (typeof value === 'string') {
    return EMAIL_REGEX.test(value) ? '' : errorMessage
  }

  return errorMessage
}

export const useField = (props: FieldProps) => {
  const { name } = props
  const {
    errors,
    getValue,
    isDirty,
    setDirty,
    updateValue,
    addField,
    removeField,
    submitted,
    submit,
    submitting,
    valid,
  } = useForm()

  let validation = props.validation
    ? Array.isArray(props.validation)
      ? [...props.validation]
      : [props.validation]
    : []

  if (props.required) {
    validation = [
      REQUIRED_VALIDATION(
        props.defaultErrorMessages
          ? props.defaultErrorMessages.required
          : undefined,
      ),
      ...validation,
    ]
  }

  if (props.type === 'email') {
    validation = [
      EMAIL_VALIDATION(
        props.defaultErrorMessages
          ? props.defaultErrorMessages.email
          : undefined,
      ),
      ...validation,
    ]
  }

  if (!validation.length) {
    validation = undefined
  }

  useEffect(
    () => {
      addField(name, validation)
      return () => {
        removeField(name)
      }
    },
    // eslint-disable-next-line
    [],
  )

  const dirty = isDirty(name)
  const error = errors[name]
  const showError = !!error && (submitted || dirty)

  const onBlur = (e: Object) => {
    setDirty(name)
    props.onBlur && props.onBlur(e)
  }

  const value = getValue(name)
  const update = (newvalue: string) => updateValue(name, newvalue)

  return { value, update, showError, error, onBlur, submit, submitting, valid }
}

type Children = ?Element<*> | Array<?Element<*>>

type FormProps = {
  onSubmit: (payload: FormSubmitPayload) => any,
  initialValues?: Object,
  children: Children | ((payload: FormContextType) => Children),
}

const Form = (props: FormProps) => {
  const reducer = useFormReducer(props.initialValues)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = () => {
    setSubmitted(true)
    setSubmitting(true)
    props.onSubmit({
      valid: reducer.valid,
      values: reducer.values,
      errors: reducer.errors,
      onFinish: (clear?: boolean) => {
        setSubmitting(false)

        if (clear) {
          reducer.clear()
          setSubmitted(false)
        }
      },
    })
  }

  const value = { ...reducer, submitted, submitting, submit: onSubmit }

  return (
    <FormContext.Provider value={value}>
      {typeof props.children === 'function'
        ? props.children(value)
        : props.children}
    </FormContext.Provider>
  )
}

export default Form
