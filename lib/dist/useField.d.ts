import { FieldPayload, FieldProps, FieldValue } from './types';
export default function useField<T extends FieldValue>(props: FieldProps): FieldPayload<T>;
