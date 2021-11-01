import { useField, FieldProps } from 'formact'

export default function Checkbox(props: FieldProps & { label: string }) {
  const field = useField<boolean>(props)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        margin: '5px 10px',
      }}>
      <input
        name={props.name}
        id={props.name}
        type="checkbox"
        // use field value
        checked={field.fieldValue || false}
        // update the field value
        onChange={(e) => field.update(e.target.checked)}
      />
      <div>
        <label htmlFor={props.name}>{props.label}</label>
      </div>
    </div>
  )
}
