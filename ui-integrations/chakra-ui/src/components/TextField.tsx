import React from 'react'

import { FormControl, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import { FieldProps, useField } from 'formact'

type Props = FieldProps & {
  label?: string
  helperText?: string
  disabled?: boolean
  readOnly?: boolean
}

export default function TextField(props: Props) {
  const field = useField<string>(props)

  return (
    <FormControl
      isDisabled={props.disabled}
      isReadOnly={props.readOnly}
      isInvalid={field.showError}
      color={field.showError ? 'error' : undefined}
      isRequired={props.required}
      pb={2}>
      {props.label ? (
        <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
      ) : null}
      <Input
        isInvalid={field.showError}
        errorBorderColor="error"
        id={props.name}
        type={props.type}
        value={field.fieldValue || ''}
        onChange={(e) => {
          field.update(e.target.value)
        }}
        onBlur={(e) => {
          props.onBlur?.(e)
          field.onBlur()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            field.submit()
          }
        }}
      />
      {field.showError || props.helperText ? (
        <FormHelperText textColor={field.showError ? 'error' : undefined}>
          {field.errorMessage || props.helperText}
        </FormHelperText>
      ) : null}
    </FormControl>
  )
}
