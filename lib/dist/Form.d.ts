import { FormChangePayload, FormContextType, FormSubmitPayload, FormValues, InitialState } from './types';
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
export declare function useForm(): FormContextType;
export default Form;
