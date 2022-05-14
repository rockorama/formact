import React, { useEffect } from 'react'

import { fireEvent, render, waitFor } from '@testing-library/react'

import Form, { FormContextType, FormProps, useForm } from '../../src'
import SubmitButton from '../components/SubmitButton'
import TextField from '../components/TextField'
import { changeValue, pressEnter } from '../utils/fieldInteration'
import sleep from '../utils/sleep'

const DEFAULT_SUBMIT_PAYLOAD = {
  valid: true,
  values: {},
  errors: {
    name: '',
    email: '',
  },
  onFinish: expect.any(Function),
  setError: expect.any(Function),
}

describe('Form tests', () => {
  it('should render and submit a simple Form', () => {
    const { nameField, emailField, submitButton, onSubmit } = renderForm()

    expect(submitButton).toHaveProperty('disabled', true)

    changeValue(nameField, 'John Doe')
    changeValue(emailField, 'john@example.com')

    expect(submitButton).toHaveProperty('disabled', false)

    fireEvent.click(submitButton)

    expect(onSubmit).toHaveBeenCalledWith({
      ...DEFAULT_SUBMIT_PAYLOAD,
      values: { name: 'John Doe', email: 'john@example.com' },
    })
  })

  it('should submit with errors', () => {
    const { emailField, onSubmit } = renderForm()

    changeValue(emailField, 'not-an-email')
    pressEnter(emailField)

    expect(onSubmit).toHaveBeenCalledWith({
      ...DEFAULT_SUBMIT_PAYLOAD,
      valid: false,
      values: {
        name: undefined,
        email: 'not-an-email',
      },
      errors: {
        name: 'Required field.',
        email: 'Invalid email.',
      },
    })
  })

  it('should render with initial values', () => {
    const { emailField, nameField } = renderForm({
      initialValues: {
        name: 'John Doe',
        email: 'john@example.com',
      },
    })

    expect(nameField).toHaveProperty('value', 'John Doe')
    expect(emailField).toHaveProperty('value', 'john@example.com')
  })

  it('should render with initial state', () => {
    const onChange = jest.fn()

    const { emailField, nameField } = renderForm({
      onChange,
      initialState: {
        values: {
          name: 'John Doe',
          email: 'john@example.com',
        },
        valid: false,
      },
    })

    expect(nameField).toHaveProperty('value', 'John Doe')
    expect(emailField).toHaveProperty('value', 'john@example.com')

    expect(onChange).toHaveBeenCalledTimes(2)

    expect(onChange).toHaveBeenCalledWith({
      valid: true,
      errors: { name: '' },
      values: { name: 'John Doe' },
      event: {
        when: expect.any(Number),
        reason: 'addField',
        fieldName: 'name',
      },
    })

    expect(onChange).toHaveBeenCalledWith({
      valid: true,
      errors: { name: '', email: '' },
      values: { name: 'John Doe', email: 'john@example.com' },
      event: {
        when: expect.any(Number),
        reason: 'addField',
        fieldName: 'email',
      },
    })
  })

  it('should set error on field on submit', async () => {
    const { emailField, nameField, submitButton, tree } = renderForm({
      onSubmit: (payload) => {
        payload.setError('email', 'Email already taken')
        payload.onFinish()
      },
    })

    changeValue(nameField, 'John Doe')
    changeValue(emailField, 'john@example.com')
    fireEvent.click(submitButton)

    await waitFor(() =>
      expect(tree.getByText('Email already taken')).toBeTruthy(),
    )
  })

  it('should clear forn on submit', async () => {
    const { emailField, nameField, submitButton, tree } = renderForm({
      onSubmit: async (payload) => {
        await sleep(100)
        payload.onFinish(true)
      },
    })

    changeValue(nameField, 'John Doe')
    changeValue(emailField, 'john@example.com')

    expect(tree.getByText('Submit')).toBeTruthy()
    fireEvent.click(submitButton)
    await waitFor(() => expect(tree.getByText('Submitting...')).toBeTruthy())

    await waitFor(() => expect(nameField).toHaveProperty('value', ''))
    await waitFor(() => expect(emailField).toHaveProperty('value', ''))
  })

  it('should render form with function as children', async () => {
    let formContext: FormContextType
    const tree = render(
      <Form>
        {(form) => {
          formContext = form
          return (
            <>
              <TextField name="name" label="Name" />
              <TextField name="email" label="Email" type="email" />
            </>
          )
        }}
      </Form>,
    )
    expect(tree.getByTestId('field-name')).toBeTruthy()
    expect(tree.getByTestId('field-email')).toBeTruthy()

    formContext.updateValue('name', 'John Doe')
    await waitFor(() => expect(formContext.getValue('name')).toBe('John Doe'))

    formContext.updateValues([
      { field: 'name', value: 'Alex' },
      { field: 'email', value: 'email@example.com' },
    ])
    await waitFor(() => expect(formContext.getValue('name')).toBe('Alex'))
    await waitFor(() =>
      expect(formContext.getValue('email')).toBe('email@example.com'),
    )
    await waitFor(() => expect(formContext.valid).toBe(true))
  })

  it('should get default context when useForm is not in provider', () => {
    let formContext: FormContextType

    const tree = render(
      <UseFormComponent onReady={(form) => (formContext = form)} />,
    )
    expect(JSON.stringify(formContext.initialValues)).toBe(JSON.stringify({}))
    expect(formContext.inForm).toBe(false)
    expect(formContext.submitting).toBe(false)
    expect(formContext.valid).toBe(true)

    formContext.submit()
    expect(formContext.submitted).toBe(false)

    formContext.setError('name', 'Required field.')
    expect(JSON.stringify(formContext.getErrors())).toBe(JSON.stringify({}))

    formContext.updateValue('name', 'John Doe')
    expect(formContext.getValue('name')).toBe('')

    formContext.notifyValueChange('name')
    expect(JSON.stringify(formContext.lastUpdate)).toBe(
      JSON.stringify({ when: 0, reason: 'create' }),
    )

    formContext.clear()
    formContext.updateValues([
      { field: 'name', value: 'Alex' },
      { field: 'email', value: 'email@example.com' },
    ])
    expect(JSON.stringify(formContext.getValues())).toBe(JSON.stringify({}))
  })
})

function renderForm(
  props: Omit<
    FormProps<{
      name: string
      email: string
    }>,
    'children'
  > = {},
) {
  const onSubmit = jest.fn()

  const tree = render(
    <Form onSubmit={onSubmit} {...props}>
      <TextField name="name" label="Name" required />
      <TextField name="email" type="email" label="Name" />
      <SubmitButton />
    </Form>,
  )

  const nameField = tree.getByTestId('field-name')
  const emailField = tree.getByTestId('field-email')
  const submitButton = tree.getByTestId('submit-button')
  return { nameField, emailField, submitButton, onSubmit, tree }
}

function UseFormComponent({
  onReady,
}: {
  onReady: (form: FormContextType) => any
}) {
  const form = useForm()
  useEffect(() => {
    onReady(form)
  }, [])
  return (
    <>
      <TextField name="name" label="Name" required />
      <TextField name="email" type="email" label="Name" />
      <SubmitButton />
    </>
  )
}
