<p align="center"><img src="./formact-logo.png" width="400px" /></p>

# Formact [![codecov](https://codecov.io/gh/rockorama/formact/graph/badge.svg?token=MIYML221SA)](https://codecov.io/gh/rockorama/formact)

A zero dependency and design agnostic **Form** library for React.

## Installation

In your terminal, add it to the project by running:

```bash
npm install --save formact
```

## Usage

#### Creating fields

As formact is design agnostic, you'll need to create your own fields. You can it by using the hook `useField` in a function component.

##### This how a TextField would look like:

```typescript
import { useField, FieldProps } from 'formact'

export default function TextField(props: FieldProps & { label: string }) {
  const field = useField<string>(props)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '5px 10px',
      }}>
      <div>
        <label htmlFor={props.name}>{props.label}</label>
      </div>
      <input
        // @ts-ignore
        data-testid={`field-${props.name}`}
        name={props.name}
        id={props.name}
        type={props.type}
        onBlur={(e) => {
          // call field.onBlur to make sure the field is dirty
          field.onBlur(e)
        }}
        // use field value
        value={field.fieldValue || ''}
        // update the field value
        onChange={(e) => field.update(e.target.value)}
        onKeyDown={(e) => {
          // Submit the form when pressing enter
          if (e.key === 'Enter') {
            field.submit()
          }
        }}
      />
      {field.showError ? (
        <div data-testid={`field-error-${props.name}`} style={{ color: 'red' }}>
          {field.errorMessage}
        </div>
      ) : null}
    </div>
  )
}
```

##### A submit button:

```typescript
export default function SubmitButton() {
  const form = useForm()
  return (
    <button
      data-testid="submit-button"
      type="submit"
      disabled={!form.valid}
      onClick={form.submit}>
      {form.submitting ? 'Submitting...' : 'Submit'}
    </button>
  )
}
```

#### Using the fields

These fields become really powerful when wrapped in a Form component.

```typescript
import Form from "formact"

<Form onChange=(console.log) onSubmit={console.log}>
  <TextField name="country" />
  <SubmitButton />
</Form>
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
