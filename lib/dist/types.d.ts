export declare type GenericObject = Record<string, any>;
export declare type FieldValue = string | boolean | number | GenericObject | Date | null | undefined;
export declare type FormValues = Record<string, FieldValue>;
export declare type ErrorValues = Record<string, string | null | undefined>;
export declare type FormSubmitPayload<T extends FormValues> = {
    valid: boolean;
    values: T;
    errors: ErrorValues;
    onFinish: (clear?: boolean) => void;
    setError: (field: string, message: string) => void;
};
export declare type FormChangeReason = 'create' | 'addField' | 'removeField' | 'changeValue' | 'reset' | 'setError';
export declare type FormChangeEvent = {
    when?: number;
    reason: FormChangeReason;
    fieldName?: string;
};
export declare type FormChangePayload<T extends FormValues> = {
    valid: boolean;
    values: T;
    errors: ErrorValues;
    event: FormChangeEvent;
};
export declare type PayloadField = {
    field: string;
    value?: FieldValue;
};
export declare type ValidationFunction = (value: FieldValue, values: Record<string, FieldValue>) => string | null | undefined;
export declare type Validation = ValidationFunction | ValidationFunction[];
export declare type FormField = {
    name: string;
    getValue: () => FieldValue;
    setValue: (value: FieldValue) => any;
    validate?: () => string | null | undefined;
    setError: (message: string) => void;
    clear: () => void;
};
export declare type FormContextType = {
    initialValues: FormValues;
    inForm: boolean;
    lastUpdate: FormChangeEvent;
    submitted: boolean;
    submitting: boolean;
    valid: boolean;
    addField: (payload: FormField) => any;
    removeField: (name: string) => any;
    getValues: () => FormValues;
    getValue: (field: string) => FieldValue;
    updateValue: (field: string, value: FieldValue) => any;
    updateValues: (fields: PayloadField[]) => any;
    notifyValueChange: (field: string) => any;
    submit: () => any;
    clear: () => any;
    getErrors: () => ErrorValues;
    setError: (field: string, message: string) => any;
};
export declare type State<T extends FormValues> = {
    errors: ErrorValues;
    values: T;
    validations: Record<string, (ValidationFunction | null)[]>;
    dirty: Record<string, boolean | undefined>;
    forcedErrors: ErrorValues;
    valid: boolean;
};
export declare type InitialState<T extends FormValues> = Partial<Pick<State<T>, 'values' | 'valid'>>;
export declare type DefaultErrorMessages = {
    email?: string;
    required?: string;
};
export declare type FieldProps = {
    name: string;
    type?: string;
    validation?: Validation;
    required?: boolean;
    defaultErrorMessages?: DefaultErrorMessages;
    onBlur?: (event?: GenericObject) => any;
    dependsOn?: string[];
};
export declare type FieldPayload<T> = {
    fieldValue?: T;
    update: (value: FieldValue) => any;
    showError: boolean;
    errorMessage?: string;
    onBlur: (e?: GenericObject) => any;
    submit: () => any;
    submitting: boolean;
    valid: boolean;
};
export declare type Child = JSX.Element | string | null | undefined;
export declare type Children = Child[] | Child;
export declare type FormProps<T extends FormValues> = {
    onSubmit?: (payload: FormSubmitPayload<T>, mode?: string) => any;
    onChange?: (payload: FormChangePayload<T>) => any;
    initialState?: InitialState<T>;
    initialValues?: T;
    children: Children | ((payload: FormContextType) => Children);
};
export declare type FormFields = Record<string, FormField>;
