/// <reference types="react" />
export declare type GenericObject = Record<string, any>;
export declare type GenericFormType = GenericObject;
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
export declare type FormChangePayload<T extends FormValues> = {
    valid: boolean;
    values: T;
    errors: ErrorValues;
    action?: string;
};
export declare type PayloadField = {
    field: string;
    value?: FieldValue;
};
export declare type ValidationFunction = (value: FieldValue, values: Record<string, FieldValue>) => string | null | undefined;
export declare type Validation = ValidationFunction | Array<ValidationFunction>;
export declare type FormContextType = {
    errors: ErrorValues;
    values: FormValues;
    inForm: boolean;
    valid: boolean;
    submitted: boolean;
    submitting: boolean;
    isDirty: (field: string) => boolean;
    setDirty: (field: string) => any;
    getValue: (field: string) => FieldValue;
    updateValue: (field: string, value: FieldValue) => any;
    updateValues: (fields: Array<PayloadField>) => any;
    addField: (field: string, validation?: Validation) => any;
    removeField: (field: string) => any;
    submit: (mode?: any) => any;
    clear: () => any;
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
export declare type UpdateAction<T extends FormValues> = {
    type: 'UPDATE';
    payload: PayloadField | Array<PayloadField>;
    onChange?: (payload: FormChangePayload<T>) => any;
};
export declare type AddFieldAction<T extends FormValues> = {
    type: 'ADD';
    payload: {
        field: string;
        validation?: Validation;
    };
    onChange?: (payload: FormChangePayload<T>) => any;
};
export declare type RemoveFieldAction<T extends FormValues> = {
    type: 'REMOVE';
    payload: {
        field: string;
    };
    onChange?: (payload: FormChangePayload<T>) => any;
};
export declare type SetDirty<T extends FormValues> = {
    type: 'SET_DIRTY';
    payload: {
        field: string;
    };
    onChange?: (payload: FormChangePayload<T>) => any;
};
export declare type SetError<T extends FormValues> = {
    type: 'SET_ERROR';
    payload: {
        field: string;
        message?: string;
    };
    onChange?: (payload: FormChangePayload<T>) => any;
};
export declare type ClearAction<T extends FormValues> = {
    type: 'CLEAR';
    payload: {
        initialValues: T;
    };
    onChange?: (payload: FormChangePayload<T>) => any;
};
export declare type Action<T extends FormValues> = UpdateAction<T> | AddFieldAction<T> | RemoveFieldAction<T> | ClearAction<T> | SetDirty<T> | SetError<T>;
export declare function useForm(): FormContextType;
export declare type DefaultErrorMessages = {
    email?: string;
    required?: string;
};
export declare type FieldProps = {
    name: string;
    validation?: Validation;
    required?: boolean;
    type?: string;
    onBlur?: (event: GenericObject) => any;
    defaultErrorMessages?: DefaultErrorMessages;
};
export declare const EMAIL_REGEX: RegExp;
export declare const EMAIL_VALIDATION: (errorMessage?: string) => (value: FieldValue) => string;
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
export declare function useField<T extends FieldValue>(props: FieldProps): FieldPayload<T>;
export declare type Child = JSX.Element | string | null | undefined;
export declare type Children = Child[] | Child;
export declare type FormProps<T extends FormValues> = {
    onSubmit?: (payload: FormSubmitPayload<T>, mode?: string) => any;
    onChange?: (payload: FormChangePayload<T>) => any;
    initialState?: InitialState<T>;
    initialValues?: T;
    children: Children | ((payload: FormContextType) => Children);
};
export declare function Form<T extends FormValues>(props: FormProps<T>): JSX.Element;
export declare function GenericForm(props: FormProps<GenericFormType>): JSX.Element;
export default Form;
