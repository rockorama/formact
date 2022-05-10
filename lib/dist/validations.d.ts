import { FieldValue } from './types';
export declare const REQUIRED_VALIDATION: (errorMessage?: string) => (value: FieldValue) => string;
export declare const EMAIL_REGEX: RegExp;
export declare const EMAIL_VALIDATION: (errorMessage?: string) => (value: FieldValue) => string;
