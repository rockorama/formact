import React from 'react'

import { useForm } from '../../src'

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
