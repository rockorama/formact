import React from 'react';
declare type ObjectRecord = Record<string, any>;
export declare type FormSubmitPayload = {
    valid: boolean;
    values: ObjectRecord;
    errors: ObjectRecord;
    onFinish: (clear?: boolean) => void;
    setError: (field: string, message: string) => void;
};
export declare type FormChangePayload = {
    valid: boolean;
    values: ObjectRecord;
    errors: ObjectRecord;
    action?: string;
};
declare type PayloadField = {
    field: string;
    value?: string;
};
export declare type ValidationFunction = (value: string, values: ObjectRecord) => string | null | undefined;
export declare type Validation = ValidationFunction | Array<ValidationFunction>;
export declare type FormContextType = {
    errors: ObjectRecord;
    values: ObjectRecord;
    valid: boolean;
    submitted: boolean;
    submitting: boolean;
    isDirty: (field: string) => boolean;
    setDirty: (field: string) => any;
    getValue: (field: string) => string;
    updateValue: (field: string, value: string) => any;
    updateValues: (fields: Array<PayloadField>) => any;
    addField: (field: string, validation?: Validation) => any;
    removeField: (field: string) => any;
    submit: (mode?: any) => any;
    clear: () => any;
    setError: (field: string, message: string) => any;
};
export declare const useForm: () => FormContextType;
export declare type DefaultErrorMessages = {
    email?: string;
    required?: string;
};
export declare type FieldProps = {
    name: string;
    validation?: Validation;
    required?: boolean;
    type?: string;
    onBlur?: (event: ObjectRecord) => any;
    defaultErrorMessages?: DefaultErrorMessages;
};
export declare const EMAIL_REGEX: RegExp;
export declare const EMAIL_VALIDATION: (errorMessage?: string) => (value: string) => string;
export declare type FieldPayload = {
    fieldValue?: string;
    update: (value: string) => any;
    showError: boolean;
    errorMessage?: string;
    onBlur: (e?: ObjectRecord) => any;
    submit: () => any;
    submitting: boolean;
    valid: boolean;
};
export declare const useField: (props: FieldProps) => FieldPayload;
declare type Children = (JSX.Element | null)[] | (JSX.Element | null);
export declare type FormProps = {
    onSubmit?: (payload: FormSubmitPayload, mode?: string) => any;
    onChange?: (payload: FormChangePayload) => any;
    initialValues?: ObjectRecord;
    children: Children | ((payload: FormContextType) => Children);
};
declare const Form: (props: FormProps) => JSX.Element;
declare type SetDifference<A, B> = A extends B ? never : A;
declare type SetComplement<A, A1 extends A> = SetDifference<A, A1>;
declare type Subtract<T extends T1, T1 extends object> = Pick<T, SetComplement<keyof T, keyof T1>>;
export declare const turnIntoField: <ComponentProps extends FieldPayload>(Component: React.ComponentType<ComponentProps>, defaultErrorMessages?: DefaultErrorMessages) => React.FC<Subtract<ComponentProps, FieldPayload> & FieldProps>;
export default Form;
