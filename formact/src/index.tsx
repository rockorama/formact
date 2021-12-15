import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react'

export type GenericObject = Record<string, any>

export type GenericFormType = GenericObject

export type FieldValue =
  | string
  | boolean
  | number
  | GenericObject
  | Date
  | null
  | undefined

export type FormValues = Record<string, FieldValue>

export type ErrorValues = Record<string, string | null | undefined>

export type FormSubmitPayload<T extends FormValues> = {
  valid: boolean
  values: T
  errors: ErrorValues
  onFinish: (clear?: boolean) => void
  setError: (field: string, message: string) => void
}

export type FormChangePayload<T extends FormValues> = {
  valid: boolean
  values: T
  errors: ErrorValues
  action?: string
}

export type PayloadField = {
  field: string
  value?: FieldValue
}

export type ValidationFunction = (
  value: FieldValue,
  values: Record<string, FieldValue>,
) => string | null | undefined
export type Validation = ValidationFunction | Array<ValidationFunction>

export type FormContextType = {
  errors: ErrorValues
  values: FormValues
  inForm: boolean
  valid: boolean
  submitted: boolean
  submitting: boolean
  isDirty: (field: string) => boolean
  setDirty: (field: string) => any
  getValue: (field: string) => FieldValue
  updateValue: (field: string, value: FieldValue) => any
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
  inForm: false,
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

export type State<T extends FormValues> = {
  errors: ErrorValues
  values: T
  validations: Record<string, (ValidationFunction | null)[]>
  dirty: Record<string, boolean | undefined>
  forcedErrors: ErrorValues
  valid: boolean
}

export type UpdateAction<T extends FormValues> = {
  type: 'UPDATE'
  payload: PayloadField | Array<PayloadField>
  onChange?: (payload: FormChangePayload<T>) => any
}

export type AddFieldAction<T extends FormValues> = {
  type: 'ADD'
  payload: {
    field: string
    validation?: Validation
  }
  onChange?: (payload: FormChangePayload<T>) => any
}

export type RemoveFieldAction<T extends FormValues> = {
  type: 'REMOVE'
  payload: {
    field: string
  }
  onChange?: (payload: FormChangePayload<T>) => any
}

export type SetDirty<T extends FormValues> = {
  type: 'SET_DIRTY'
  payload: {
    field: string
  }
  onChange?: (payload: FormChangePayload<T>) => any
}

export type SetError<T extends FormValues> = {
  type: 'SET_ERROR'
  payload: {
    field: string
    message?: string
  }
  onChange?: (payload: FormChangePayload<T>) => any
}

export type ClearAction<T extends FormValues> = {
  type: 'CLEAR'
  payload: {
    initialValues: T
  }
  onChange?: (payload: FormChangePayload<T>) => any
}

export type Action<T extends FormValues> =
  | UpdateAction<T>
  | AddFieldAction<T>
  | RemoveFieldAction<T>
  | ClearAction<T>
  | SetDirty<T>
  | SetError<T>

function validate<T extends FormValues>(newstate: State<T>) {
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

const createReducer =
  <T extends FormValues>() =>
  (state: State<T>, action: Action<T>): State<T> => {
    let newState: State<T> = {} as State<T>

    const currentValues = state.values

    switch (action.type) {
      case 'UPDATE':
        if (Array.isArray(action.payload)) {
          const values = {}
          action.payload.forEach((element) => {
            values[element.field] = element.value
          })
          newState = { ...state, values: { ...currentValues, ...values } }
        } else {
          newState = {
            ...state,
            values: {
              ...currentValues,
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
          values: { ...currentValues, [action.payload.field]: undefined },
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
          values: { ...action.payload.initialValues },
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

function useFormReducer<T extends FormValues>(
  initialValues?: T,
  onChange?: (payload: FormChangePayload<T>) => any,
) {
  const reducer = useCallback(createReducer<T>(), [])
  const [state, action] = useReducer(reducer, {
    validations: {},
    errors: {},
    dirty: {},
    forcedErrors: {},
    values: initialValues || ({} as T),
    valid: true,
  })

  const getValue = (field: keyof T) => {
    return state.values?.[field]
  }

  const updateValue = (field: string, value: FieldValue) => {
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
      payload: { initialValues },
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

export function useForm() {
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
  onBlur?: (event: GenericObject) => any
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
  (value: FieldValue): string => {
    if (!value) {
      return ''
    }

    if (typeof value === 'string') {
      return EMAIL_REGEX.test(value) ? '' : errorMessage
    }

    return errorMessage
  }

export type FieldPayload<T> = {
  fieldValue?: T
  update: (value: FieldValue) => any
  showError: boolean
  errorMessage?: string
  onBlur: (e?: GenericObject) => any
  submit: () => any
  submitting: boolean
  valid: boolean
}

export function useField<T extends FieldValue>(props: FieldProps) {
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

  const onBlur = (e: GenericObject) => {
    setDirty(name)
    props.onBlur && props.onBlur(e)
  }

  const fieldValue = getValue(name) as T
  const update = (newvalue: T) => updateValue(name, newvalue)

  const payload: FieldPayload<T> = {
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

export type Child = JSX.Element | string | null | undefined
export type Children = Child[] | Child

export type FormProps<T extends FormValues> = {
  onSubmit?: (payload: FormSubmitPayload<T>, mode?: string) => any
  onChange?: (payload: FormChangePayload<T>) => any
  initialValues?: T
  children: Children | ((payload: FormContextType) => Children)
}

export function Form<T extends FormValues>(props: FormProps<T>) {
  const reducer = useFormReducer<T>(props.initialValues, props.onChange)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (mode?: any) => {
    setSubmitted(true)
    if (props.onSubmit) {
      setSubmitting(true)
      props.onSubmit?.(
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

  const value = {
    ...reducer,
    submitted,
    submitting,
    submit: onSubmit,
    inForm: true,
  }

  return (
    <FormContext.Provider value={value}>
      {typeof props.children === 'function'
        ? props.children(value)
        : props.children}
    </FormContext.Provider>
  )
}

export function GenericForm(props: FormProps<GenericFormType>) {
  return <Form<GenericFormType> {...props} />
}
export default Form
