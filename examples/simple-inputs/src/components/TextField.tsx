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
        <div style={{ color: 'red' }}>{field.errorMessage}</div>
      ) : null}
    </div>
  )
}
