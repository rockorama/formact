# Formact [![codecov](https://codecov.io/gh/diogoperillo/formact/branch/main/graph/badge.svg?token=MIYML221SA)](https://codecov.io/gh/diogoperillo/formact)

A zero dependency and design agnostic **Form** library for React.

## Installation

In your terminal, add it to the project by running:

```bash
npm install --save formact
```

## Usage

#### Creating fields
As formact is design agnostic, you'll need to create your own fields. You can it by using the hook `useField` in a function component:

```typescript
import { useField, FieldProps } from 'formact'

export default function TextField(props: FieldProps) {
  const field = useField(props)

  return <input value={field.fieldValue} onChange={(e) => field.update(e.target.value) />
}
```

#### Using the fields
These fields are useless if not wrapped in a `Form` component.

```typescript
import Form from "formact" 

<Form onChange=(console.log) onSubmit={console.log}>
  <TextField name="country" />
</Form>
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
