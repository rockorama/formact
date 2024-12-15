export type GenericObject = Record<string, any>

export type FieldValue =
  | string
  | boolean
  | number
  | bigint
  | GenericObject
  | Date
  | null
  | undefined

export type FormValues = Record<string, FieldValue>

export type ErrorValues = Record<string, string | null | undefined>

export type FormSubmitPayload<T extends FormValues> = {
  valid: boolean
  values: T
  errors: ErrorValues
  onFinish: (clear?: boolean) => void
  setError: (field: string, message: string) => void
}

export type FormChangeReason =
  | 'create'
  | 'addField'
  | 'removeField'
  | 'changeValue'
  | 'reset'
  | 'setError'

export type FormChangeEvent = {
  when?: number
  reason: FormChangeReason
  fieldName?: string
}

export type FormChangePayload<T extends FormValues> = {
  valid: boolean
  values: T
  errors: ErrorValues
  event: FormChangeEvent
}

export type PayloadField = {
  field: string
  value?: FieldValue
}

export type ValidationFunction = (
  value: FieldValue,
  values: Record<string, FieldValue>,
) => string | null | undefined
export type Validation = ValidationFunction | ValidationFunction[]

export type FormField = {
  name: string
  getValue: () => FieldValue
  setValue: (value: FieldValue) => any
  validate: () => string | null | undefined
  setError: (message: string) => void
  clear: () => void
  initialized?: boolean
}

export type FormContextType = {
  initialValues: FormValues
  inForm: boolean
  lastUpdate: FormChangeEvent
  submitted: boolean
  submitting: boolean
  valid: boolean
  addField: (payload: FormField) => any
  removeField: (name: string) => any
  getValues: () => FormValues
  getValue: (field: string) => FieldValue
  updateValue: (field: string, value: FieldValue) => any
  updateValues: (fields: PayloadField[]) => any
  notifyValueChange: (field: string) => any
  submit: () => any
  clear: () => any
  getErrors: () => ErrorValues
  setError: (field: string, message: string) => any
}

export type State<T extends FormValues> = {
  errors: ErrorValues
  values: T
  validations: Record<string, (ValidationFunction | null)[]>
  dirty: Record<string, boolean | undefined>
  forcedErrors: ErrorValues
  valid: boolean
}

export type InitialState<T extends FormValues> = Partial<
  Pick<State<T>, 'values' | 'valid'>
>

export type DefaultErrorMessages = {
  email?: string
  required?: string
}

export type FieldProps = {
  name: string
  type?: string
  validation?: Validation
  required?: boolean
  defaultErrorMessages?: DefaultErrorMessages
  onBlur?: (event?: GenericObject) => any
  dependsOn?: string[]
}

export type FieldPayload<T> = {
  fieldValue?: T
  update: (value: FieldValue) => any
  showError: boolean
  errorMessage?: string
  onBlur: (e?: GenericObject) => any
  submit: () => any
  submitting: boolean
  valid: boolean
}

export type Child = JSX.Element | string | null | undefined
export type Children = Child[] | Child

export type FormProps<T extends FormValues> = {
  onSubmit?: (payload: FormSubmitPayload<T>, mode?: string) => any
  onChange?: (payload: FormChangePayload<T>) => any
  initialState?: InitialState<T>
  initialValues?: T
  children: Children | ((payload: FormContextType) => Children)
}

export type FormFields = Record<string, FormField>
