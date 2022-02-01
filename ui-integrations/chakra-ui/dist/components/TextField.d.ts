/// <reference types="react" />
import { FieldProps } from 'formact';
declare type Props = FieldProps & {
    label?: string;
    helperText?: string;
    disabled?: boolean;
    readOnly?: boolean;
};
export default function TextField(props: Props): JSX.Element;
export {};
