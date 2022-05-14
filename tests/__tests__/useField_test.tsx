import React from 'react'
import { render, waitFor } from '@testing-library/react'
import Form, { FieldProps, FieldValue, FormValues } from '../../src'
import TextField from '../components/TextField'
import { changeValue, pressEnter } from '../utils/fieldInteration'

describe('useField tests', () => {
  it('should render a field with no validation', async () => {
    const onBlur = jest.fn()
    const { tree, field } = renderField({ name: 'name', onBlur })

    pressEnter(field)
    const fieldError = tree.getByTestId('field-error-name')
    expect(fieldError.innerHTML).toEqual('')

    changeValue(field, 'John Doe')
    await waitFor(() => expect(field).toHaveProperty('value', 'John Doe'))
    expect(onBlur).toHaveBeenCalled()
    expect(fieldError.innerHTML).toEqual('')
  })

  it('should render a field with required validation', async () => {
    const { tree, field } = renderField({ name: 'name', required: true })

    pressEnter(field)
    const fieldError = tree.getByTestId('field-error-name')
    expect(fieldError.innerHTML).toEqual('Required field.')

    changeValue(field, 'John Doe')
    await waitFor(() => expect(field).toHaveProperty('value', 'John Doe'))
    expect(fieldError.innerHTML).toEqual('')
  })

  it('should render a field with email validation', async () => {
    const { tree, field } = renderField({
      name: 'name',
      required: true,
      type: 'email',
    })

    pressEnter(field)
    const fieldError = tree.getByTestId('field-error-name')
    expect(fieldError.innerHTML).toEqual('Required field.')

    changeValue(field, 'John Doe')
    await waitFor(() => expect(field).toHaveProperty('value', 'John Doe'))
    expect(fieldError.innerHTML).toEqual('Invalid email.')

    changeValue(field, 'john@example.com')
    await waitFor(() =>
      expect(field).toHaveProperty('value', 'john@example.com'),
    )
    expect(fieldError.innerHTML).toEqual('')
  })

  it('should render a field with email validation and defaultErrorMessage', async () => {
    const { tree, field } = renderField({
      name: 'name',
      required: true,
      type: 'email',
      defaultErrorMessages: {
        email: 'Email inválido.',
        required: 'Campo obrigatório.',
      },
    })

    pressEnter(field)
    const fieldError = tree.getByTestId('field-error-name')
    expect(fieldError.innerHTML).toEqual('Campo obrigatório.')

    changeValue(field, 'John Doe')
    await waitFor(() => expect(field).toHaveProperty('value', 'John Doe'))
    expect(fieldError.innerHTML).toEqual('Email inválido.')

    changeValue(field, 'john@example.com')
    await waitFor(() =>
      expect(field).toHaveProperty('value', 'john@example.com'),
    )
    expect(fieldError.innerHTML).toEqual('')
  })

  it('should render a field with custom validation', async () => {
    const { tree, field } = renderField({
      name: 'number',
      validation: NUMBER_VALIDATION,
    })

    changeValue(field, 'John Doe')
    await waitFor(() => expect(field).toHaveProperty('value', 'John Doe'))

    const fieldError = tree.getByTestId('field-error-number')
    expect(fieldError.innerHTML).toEqual('Must be a number.')

    changeValue(field, '1')
    await waitFor(() => expect(field).toHaveProperty('value', '1'))
    expect(fieldError.innerHTML).toEqual('')
  })

  it('should render a field with multiple validation', async () => {
    const { tree, field } = renderField({
      name: 'number',
      validation: [NUMBER_VALIDATION, IS_10_VALIDATION],
    })

    changeValue(field, 'John Doe')
    await waitFor(() => expect(field).toHaveProperty('value', 'John Doe'))

    const fieldError = tree.getByTestId('field-error-number')
    expect(fieldError.innerHTML).toEqual('Must be a number. Must be 10.')

    changeValue(field, '1')
    await waitFor(() => expect(field).toHaveProperty('value', '1'))
    expect(fieldError.innerHTML).toEqual('Must be 10.')

    changeValue(field, '10')
    await waitFor(() => expect(field).toHaveProperty('value', '10'))
    expect(fieldError.innerHTML).toEqual('')
  })

  it('should have validation depending on other field', async () => {
    const tree = render(
      <Form>
        <TextField name="password" type="password" label="Password" required />
        <TextField
          name="repeatPassword"
          type="password"
          label="Password"
          required
          validation={REPEAT_PASSWORD_VALIDATION}
          dependsOn={['password']}
        />
      </Form>,
    )

    const password = tree.getByTestId(`field-password`)
    const repeatPassword = tree.getByTestId(`field-repeatPassword`)

    changeValue(password, '123')
    changeValue(repeatPassword, '1234')
    await waitFor(() => expect(repeatPassword).toHaveProperty('value', '1234'))

    const repeatPasswordError = tree.getByTestId('field-error-repeatPassword')
    expect(repeatPasswordError.innerHTML).toEqual('Passwords must match.')

    changeValue(password, '1234')
    await waitFor(() => expect(password).toHaveProperty('value', '1234'))

    expect(repeatPasswordError.innerHTML).toEqual('')
  })

  it('should have validation depending on posterior rendered field', async () => {
    const tree = render(
      <Form>
        <TextField
          name="repeatPassword"
          type="password"
          label="Password"
          required
          validation={REPEAT_PASSWORD_VALIDATION}
          dependsOn={['password']}
        />
        <TextField name="password" type="password" label="Password" required />
      </Form>,
    )

    const password = tree.getByTestId(`field-password`)
    const repeatPassword = tree.getByTestId(`field-repeatPassword`)

    changeValue(password, '123')
    changeValue(repeatPassword, '1234')
    await waitFor(() => expect(repeatPassword).toHaveProperty('value', '1234'))

    const repeatPasswordError = tree.getByTestId('field-error-repeatPassword')
    expect(repeatPasswordError.innerHTML).toEqual('Passwords must match.')

    changeValue(password, '1234')
    await waitFor(() => expect(password).toHaveProperty('value', '1234'))

    expect(repeatPasswordError.innerHTML).toEqual('')
  })
})

function renderField(props: FieldProps) {
  const tree = render(
    <Form>
      <TextField label="Field" {...props} />
    </Form>,
  )
  const field = tree.getByTestId(`field-${props.name}`)

  return { tree, field }
}

function NUMBER_VALIDATION(value: FieldValue) {
  const isNumber = /^[0-9]+$/.test(value as string)
  if (!isNumber) {
    return 'Must be a number.'
  }
}

function IS_10_VALIDATION(value: FieldValue) {
  const number = Number(value)
  if (number !== 10) {
    return 'Must be 10.'
  }
}

function REPEAT_PASSWORD_VALIDATION(value: FieldValue, values: FormValues) {
  if (value !== values.password) {
    return 'Passwords must match.'
  }
}
