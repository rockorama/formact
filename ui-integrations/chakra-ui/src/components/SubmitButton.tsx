import React from 'react'

import { useForm } from 'formact'
import { Button } from '@chakra-ui/react'

type Props = React.ComponentProps<typeof Button> & {
  disabledInvalid?: boolean
}

export default function SubmitButton(props: Props) {
  const { valid, submit, submitting } = useForm()
  const { disabledInvalid, ...other } = props

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    submit()
    props.onClick && props.onClick(e)
  }

  return (
    <Button
      isLoading={submitting}
      loadingText="Submitting"
      disabled={(disabledInvalid && !valid) || submitting}
      width="100%"
      variant="solid"
      {...other}
      onClick={onSubmit}
    />
  )
}
