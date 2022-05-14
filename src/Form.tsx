import React, {
  useContext,
  createContext,
  useState,
  useCallback,
  useRef,
} from 'react'
import {
  ErrorValues,
  FieldValue,
  FormChangeEvent,
  FormChangePayload,
  FormChangeReason,
  FormContextType,
  FormField,
  FormSubmitPayload,
  FormValues,
  InitialState,
  PayloadField,
} from './types'

const FormContext = createContext<FormContextType>({
  initialValues: {},
  inForm: false,
  lastUpdate: { when: 0, reason: 'create' },
  submitted: false,
  submitting: false,
  valid: true,
  addField: () => {},
  removeField: () => {},
  getErrors: () => ({}),
  getValues: () => ({}),
  getValue: () => '',
  updateValue: () => {},
  updateValues: () => {},
  notifyValueChange: () => {},
  submit: () => {},
  clear: () => {},
  setError: () => {},
})

export type Child = JSX.Element | string | null | undefined
export type Children = Child[] | Child

export type FormProps<T extends FormValues> = {
  onSubmit?: (payload: FormSubmitPayload<T>, mode?: string) => any
  onChange?: (payload: FormChangePayload<T>) => any
  initialState?: InitialState<T>
  initialValues?: T
  children: Children | ((payload: FormContextType) => Children)
}
type FormFields = Record<string, FormField>

const checkIsValid = (errors: ErrorValues) =>
  Object.keys(errors).filter((e) => errors[e]).length === 0

export function Form<T extends FormValues>(props: FormProps<T>) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [valid, setValid] = useState(props.initialState?.valid ?? true)

  const [lastUpdate, setLastUpdate] = useState<FormChangeEvent>({
    when: Date.now(),
    reason: 'create',
  })

  const fields = useRef<FormFields>({} as FormFields).current

  const getValues = useCallback(() => {
    const values: Record<string, FieldValue> = {}
    Object.keys(fields).forEach((name) => {
      values[name] = fields[name].getValue()
    })

    return values as T
  }, [])

  const getErrors = useCallback(() => {
    const errors: Record<string, string> = {}
    Object.keys(fields).forEach((name) => {
      const field = fields[name]
      errors[name] = field.validate()
    })
    return errors
  }, [])

  const getFormState = useCallback(() => {
    const values = getValues()
    const errors = getErrors()
    return { errors, values }
  }, [])

  const handleOnChange = useCallback(
    (reason: FormChangeReason, fieldName?: string) => {
      const { errors, values } = getFormState()
      const event = { when: Date.now(), reason, fieldName }
      const valid = checkIsValid(errors)

      setValid(valid)
      setLastUpdate(event)

      props.onChange?.({
        valid,
        errors,
        values,
        event,
      })
    },
    [props.onChange],
  )

  const addField = useCallback(
    (field: FormField) => {
      fields[field.name] = field
      handleOnChange('addField', field.name)
    },
    [handleOnChange],
  )

  const removeField = useCallback(
    (fieldName: string) => {
      delete fields[fieldName]
      handleOnChange('removeField', fieldName)
    },
    [handleOnChange],
  )

  const notifyValueChange = useCallback(
    (fieldName: string) => {
      handleOnChange('changeValue', fieldName)
    },
    [handleOnChange],
  )

  const getValue = useCallback((fieldName: string) => {
    return fields[fieldName]?.getValue()
  }, [])

  const updateValue = useCallback((fieldName: string, value: FieldValue) => {
    fields[fieldName].setValue(value)
  }, [])

  const updateValues = useCallback((fields: PayloadField[]) => {
    fields.forEach((f) => updateValue(f.field, f.value))
  }, [])

  const clear = useCallback(() => {
    Object.keys(fields).forEach((name) => {
      const field = fields[name]
      field.clear()
    })
    handleOnChange('reset')
  }, [handleOnChange])

  const setError = useCallback(
    (fieldName: string, message: string) => {
      fields[fieldName].setError(message)
      handleOnChange('setError', fieldName)
    },
    [handleOnChange],
  )

  const submit = useCallback(() => {
    setSubmitting(true)
    setSubmitted(true)

    if (props.onSubmit) {
      const { errors, values } = getFormState()

      const valid = checkIsValid(errors)

      props.onSubmit({
        values,
        valid,
        errors,
        setError,
        onFinish: (shouldClear?: boolean) => {
          if (shouldClear) {
            clear()
          }
          setSubmitting(false)
        },
      })
    }
  }, [setError, clear, props.onSubmit])

  const value: FormContextType = {
    inForm: true,
    initialValues: props.initialState?.values ?? props.initialValues ?? {},
    lastUpdate,
    valid,
    submitted,
    submitting,
    addField,
    removeField,
    getValues,
    getValue,
    updateValue,
    updateValues,
    notifyValueChange,
    submit,
    clear,
    getErrors,
    setError,
  }

  return (
    <FormContext.Provider value={value}>
      {typeof props.children === 'function'
        ? props.children(value)
        : props.children}
    </FormContext.Provider>
  )
}

export function useForm() {
  return useContext(FormContext)
}

export default Form
