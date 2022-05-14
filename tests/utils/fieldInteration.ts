import { fireEvent } from '@testing-library/react'

export function changeValue(field: HTMLElement, value: string) {
  fireEvent.change(field, { target: { value } })
  fireEvent.blur(field)
}

export function pressEnter(field: HTMLElement) {
  fireEvent.keyDown(field, { key: 'Enter', code: 13, charCode: 13 })
}
