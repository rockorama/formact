import { useEffect, useMemo, useRef, useState } from 'react'

import { useForm } from './Form'
import {
  FieldPayload,
  FieldProps,
  FieldValue,
  FormContextType,
  FormField,
  FormValues,
  GenericObject,
} from './types'
import { EMAIL_VALIDATION, REQUIRED_VALIDATION } from './validations'

function useValidation(
  props: FieldProps,
  value: FieldValue,
  form: FormContextType,
  setError: (error: string) => void,
) {
  const { validation, required, type, defaultErrorMessages, dependsOn } = props

  const validationArray = useMemo(() => {
    let fns = []

    if (required) {
      fns.push(REQUIRED_VALIDATION(defaultErrorMessages?.required))
    }

    if (type === 'email') {
      fns.push(EMAIL_VALIDATION(defaultErrorMessages?.email))
    }

    if (validation) {
      if (Array.isArray(validation)) {
        fns = [...fns, ...validation]
      } else {
        fns.push(validation)
      }
    }

    return fns
  }, [required, type, validation, defaultErrorMessages])

  const { lastUpdate } = form

  const lastDependencieUpdated = useMemo(() => {
    if (dependsOn?.indexOf(lastUpdate.fieldName || '') || -1 > -1) {
      return Date.now()
    }

    return 0
  }, [dependsOn, lastUpdate])

  const dependsOnValues = useMemo(() => {
    const values = {} as FormValues
    if (dependsOn?.length) {
      dependsOn.forEach((name) => {
        values[name] = form.getValue(name)
      })
    }
    return values
  }, [lastDependencieUpdated])

  const errors = useMemo(() => {
    let error = ''
    if (validationArray.length) {
      error = validationArray
        .map((fn) => fn(value, dependsOnValues))
        .filter((error) => error)
        .join(' ')
    }
    setError(error)
    return error
  }, [value, dependsOnValues, validationArray])

  return () => errors
}

export default function useField<T extends FieldValue>(props: FieldProps) {
  const form = useForm()
  const [value, setValue] = useState<T | undefined>(
    form.initialValues[props.name] as T,
  )
  const [error, setError] = useState<string>('')
  const [showError, setShowError] = useState<boolean>(false)

  const validate = useValidation(props, value, form, setError)

  const fieldRef = useRef<FormField>({
    getValue: () => value,
    setValue: (value) => {
      setValue(value as T)
    },
    setError,
    clear: () => {
      setValue(form.initialValues[props.name] as T)
      setShowError(false)
    },
    name: props.name,
    validate,
    initialized: false,
  }).current

  // seems like this is not needed, but it's important for every other render
  fieldRef.validate = validate

  useEffect(() => {
    if (fieldRef.initialized) {
      // do not care about this on first render as the addField effect should take care of it
      fieldRef.getValue = () => value
      form.notifyValueChange(fieldRef.name)
    }
  }, [value])

  useEffect(() => {
    fieldRef.name = props.name
    form.addField(fieldRef)
    fieldRef.initialized = true
    return () => form.removeField(fieldRef.name)
  }, [props.name])

  useEffect(() => {
    setShowError(form.submitted)
  }, [form.submitted])

  return {
    errorMessage: error,
    fieldValue: value,
    showError,
    valid: !error,
    submitting: form.submitting,
    update: setValue,
    onBlur: (e?: GenericObject) => {
      props.onBlur?.(e)
      setShowError(true)
    },
    submit: form.submit,
  } as FieldPayload<T>
}
