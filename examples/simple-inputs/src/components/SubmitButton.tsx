import React from 'react'
import { useForm } from 'formact'

export default function SubmitButton() {
  const form = useForm()
  return (
    <button type="submit" disabled={!form.valid} onClick={form.submit}>
      Submit
    </button>
  )
}
