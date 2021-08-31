import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
} from 'react'

type ObjectRecord = Record<string, any>

export type FormSubmitPayload = {
  valid: boolean
  values: ObjectRecord
  errors: ObjectRecord
  onFinish: (clear?: boolean) => void
  setError: (field: string, message: string) => void
}

export type FormChangePayload = {
  valid: boolean
  values: ObjectRecord
  errors: ObjectRecord
  action?: string
}

type PayloadField = {
  field: string
  value?: string
}

export type ValidationFunction = (
  value: string,
  values: ObjectRecord,
) => string | null | undefined
export type Validation = ValidationFunction | Array<ValidationFunction>

export type FormContextType = {
  errors: ObjectRecord
  values: ObjectRecord
  valid: boolean
  submitted: boolean
  submitting: boolean
  isDirty: (field: string) => boolean
  setDirty: (field: string) => any
  getValue: (field: string) => string
  updateValue: (field: string, value: string) => any
  updateValues: (fields: Array<PayloadField>) => any
  addField: (field: string, validation?: Validation) => any
  removeField: (field: string) => any
  submit: (mode?: any) => any
  clear: () => any
  setError: (field: string, message: string) => any
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
  setError: () => {},
})

type State = {
  errors: ObjectRecord
  values: ObjectRecord
  validations: ObjectRecord
  dirty: ObjectRecord
  forcedErrors: ObjectRecord
  valid: boolean
}

type UpdateAction = {
  type: 'UPDATE'
  payload: PayloadField | Array<PayloadField>
  onChange?: (payload: FormChangePayload) => any
}

type AddFieldAction = {
  type: 'ADD'
  payload: {
    field: string
    validation?: Validation
  }
  onChange?: (payload: FormChangePayload) => any
}

type RemoveFieldAction = {
  type: 'REMOVE'
  payload: {
    field: string
  }
  onChange?: (payload: FormChangePayload) => any
}

type SetDirty = {
  type: 'SET_DIRTY'
  payload: {
    field: string
  }
  onChange?: (payload: FormChangePayload) => any
}

type SetError = {
  type: 'SET_ERROR'
  payload: {
    field: string
    message?: string
  }
  onChange?: (payload: FormChangePayload) => any
}

type ClearAction = {
  type: 'CLEAR'
  payload: {
    initialValue: ObjectRecord
  }
  onChange?: (payload: FormChangePayload) => any
}

type Action =
  | UpdateAction
  | AddFieldAction
  | RemoveFieldAction
  | ClearAction
  | SetDirty
  | SetError

const validate = (newstate: State) => {
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

      if (newstate.forcedErrors[key]) {
        fieldErrors = fieldErrors + ' ' + newstate.forcedErrors[key]
      }

      errors[key] = fieldErrors
      if (valid && fieldErrors) {
        valid = false
      }
    }
  })
  return { errors, valid }
}

function reducer(state: State, action: Action): State {
  let newState: State = {} as State

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
        dirty: {},
        values: { ...action.payload.initialValue },
      }
      break
    case 'SET_DIRTY':
      newState = {
        ...state,
        dirty: { ...state.dirty, [action.payload.field]: true },
      }
      break

    case 'SET_ERROR':
      newState = {
        ...state,
        forcedErrors: {
          ...state.forcedErrors,
          [action.payload.field]: action.payload.message,
        },
      }

      break

    default:
      newState = state
      break
  }

  const { errors, valid } = validate(newState)

  newState.errors = errors
  newState.valid = valid

  action.onChange && action.onChange({ ...newState, action: action.type })

  return newState
}

const useFormReducer = (
  initialValue: ObjectRecord = {},
  onChange?: (payload: FormChangePayload) => any,
) => {
  const [state, action] = useReducer(reducer, {
    validations: {},
    errors: {},
    dirty: {},
    forcedErrors: {},
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
      onChange,
    })
  }

  const updateValues = (collection: Array<PayloadField>) => {
    action({
      type: 'UPDATE',
      payload: collection,
      onChange,
    })
  }

  const addField = (field: string, validation?: Validation) => {
    action({
      type: 'ADD',
      payload: {
        field,
        validation,
      },
      onChange,
    })
  }

  const removeField = (field: string) => {
    action({
      type: 'REMOVE',
      payload: {
        field,
      },
      onChange,
    })
  }

  const clear = () => {
    action({
      type: 'CLEAR',
      payload: { initialValue },
      onChange,
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

  const setError = (field: string, message?: string) => {
    action({
      type: 'SET_ERROR',
      payload: {
        field,
        message,
      },
      onChange,
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
    setError,
  }
}

export const useForm = () => {
  return useContext(FormContext)
}

export type DefaultErrorMessages = {
  email?: string
  required?: string
}

export type FieldProps = {
  name: string
  validation?: Validation
  required?: boolean
  type?: string
  onBlur?: (event: ObjectRecord) => any
  defaultErrorMessages?: DefaultErrorMessages
}

const REQUIRED_VALIDATION =
  (errorMessage: string = 'Required field.') =>
  (value) =>
    !value ? errorMessage : ''

/* eslint-disable */
export const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
/* eslint-enable */

export const EMAIL_VALIDATION =
  (errorMessage: string = 'Invalid email.') =>
  (value: string): string => {
    if (!value) {
      return ''
    }

    if (typeof value === 'string') {
      return EMAIL_REGEX.test(value) ? '' : errorMessage
    }

    return errorMessage
  }

export type FieldPayload = {
  fieldValue?: string
  update: (value: string) => any
  showError: boolean
  errorMessage?: string
  onBlur: (e?: ObjectRecord) => any
  submit: () => any
  submitting: boolean
  valid: boolean
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
  const errorMessage = errors[name]
  const showError = !!errorMessage && (submitted || dirty)

  const onBlur = (e: ObjectRecord) => {
    setDirty(name)
    props.onBlur && props.onBlur(e)
  }

  const fieldValue = getValue(name)
  const update = (newvalue: string) => updateValue(name, newvalue)

  const payload: FieldPayload = {
    fieldValue,
    update,
    showError,
    errorMessage,
    onBlur,
    submit,
    submitting,
    valid,
  }
  return payload
}

export const turnIntoField = (
  Component: any,
  defaultErrorMessages?: DefaultErrorMessages,
) => {
  return (props: FieldProps) => {
    const fieldProps: FieldPayload = useField({
      ...props,
      defaultErrorMessages,
    })

    return <Component {...props} {...fieldProps} />
  }
}

type Children = (JSX.Element | null)[] | (JSX.Element | null)

export type FormProps = {
  onSubmit?: (payload: FormSubmitPayload, mode?: string) => any
  onChange?: (payload: FormChangePayload) => any
  initialValues?: ObjectRecord
  children: Children | ((payload: FormContextType) => Children)
}

const Form = (props: FormProps) => {
  const reducer = useFormReducer(props.initialValues, props.onChange)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (mode?: any) => {
    setSubmitted(true)
    if (props.onSubmit) {
      setSubmitting(true)
      props.onSubmit &&
        props.onSubmit(
          {
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
            setError: reducer.setError,
          },
          mode,
        )
    }
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
