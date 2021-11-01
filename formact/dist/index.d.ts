import React from 'react';
declare type GenericObject = Record<string, any>;
export declare type GenericFormType = GenericObject;
declare type FieldValue = string | boolean | number | GenericObject | Date | null | undefined;
declare type FormValues = Record<string, FieldValue>;
declare type ErrorValues = Record<string, string | null | undefined>;
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
declare type PayloadField = {
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
declare type Child = JSX.Element | string | null | undefined;
declare type Children = Child[] | Child;
export declare type FormProps<T extends FormValues> = {
    onSubmit?: (payload: FormSubmitPayload<T>, mode?: string) => any;
    onChange?: (payload: FormChangePayload<T>) => any;
    initialValues?: T;
    children: Children | ((payload: FormContextType) => Children);
};
export declare function Form<T extends FormValues>(props: FormProps<T>): JSX.Element;
export declare function GenericForm(props: FormProps<GenericFormType>): JSX.Element;
declare type SetDifference<A, B> = A extends B ? never : A;
declare type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
declare type Subtract<T extends T1, T1 extends object> = Pick<T, SetComplement<keyof T, keyof T1>>;
export declare function turnIntoField<ComponentProps extends FieldPayload<string>>(Component: React.ComponentType<ComponentProps>, defaultErrorMessages?: DefaultErrorMessages): React.FC<Subtract<ComponentProps, FieldPayload<string>> & FieldProps>;
export default Form;
