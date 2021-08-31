"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.turnIntoField = exports.useField = exports.EMAIL_VALIDATION = exports.EMAIL_REGEX = exports.useForm = void 0;
const react_1 = __importStar(require("react"));
const FormContext = (0, react_1.createContext)({
    errors: {},
    values: {},
    valid: true,
    submitted: false,
    submitting: false,
    getValue: () => '',
    updateValue: () => { },
    updateValues: () => { },
    addField: () => { },
    removeField: () => { },
    submit: () => { },
    clear: () => { },
    isDirty: () => false,
    setDirty: () => { },
    setError: () => { },
});
const validate = (newstate) => {
    const errors = {};
    let valid = true;
    Object.keys(newstate.validations).forEach((key) => {
        if (newstate.validations[key]) {
            let fieldErrors = newstate.validations[key]
                .map((fun) => fun(newstate.values[key], newstate.values))
                .join(' ');
            if (fieldErrors === ' ') {
                fieldErrors = '';
            }
            if (newstate.forcedErrors[key]) {
                fieldErrors = fieldErrors + ' ' + newstate.forcedErrors[key];
            }
            errors[key] = fieldErrors;
            if (valid && fieldErrors) {
                valid = false;
            }
        }
    });
    return { errors, valid };
};
function reducer(state, action) {
    let newState = {};
    switch (action.type) {
        case 'UPDATE':
            if (Array.isArray(action.payload)) {
                const values = {};
                action.payload.forEach((element) => {
                    values[element.field] = element.value;
                });
                newState = Object.assign(Object.assign({}, state), { values: Object.assign(Object.assign({}, state.values), values) });
            }
            else {
                newState = Object.assign(Object.assign({}, state), { values: Object.assign(Object.assign({}, state.values), { [action.payload.field]: action.payload.value }) });
            }
            break;
        case 'ADD':
            if (action.payload.validation) {
                newState = Object.assign(Object.assign({}, state), { validations: Object.assign(Object.assign({}, state.validations), { [action.payload.field]: Array.isArray(action.payload.validation)
                            ? action.payload.validation
                            : [action.payload.validation] }) });
            }
            else {
                newState = state;
            }
            break;
        case 'REMOVE':
            newState = Object.assign(Object.assign({}, state), { errors: Object.assign(Object.assign({}, state.errors), { [action.payload.field]: undefined }), values: Object.assign(Object.assign({}, state.values), { [action.payload.field]: undefined }), validations: Object.assign(Object.assign({}, state.validations), { [action.payload.field]: undefined }) });
            break;
        case 'CLEAR':
            newState = Object.assign(Object.assign({}, state), { errors: {}, dirty: {}, values: Object.assign({}, action.payload.initialValue) });
            break;
        case 'SET_DIRTY':
            newState = Object.assign(Object.assign({}, state), { dirty: Object.assign(Object.assign({}, state.dirty), { [action.payload.field]: true }) });
            break;
        case 'SET_ERROR':
            newState = Object.assign(Object.assign({}, state), { forcedErrors: Object.assign(Object.assign({}, state.forcedErrors), { [action.payload.field]: action.payload.message }) });
            break;
        default:
            newState = state;
            break;
    }
    const { errors, valid } = validate(newState);
    newState.errors = errors;
    newState.valid = valid;
    action.onChange && action.onChange(Object.assign(Object.assign({}, newState), { action: action.type }));
    return newState;
}
const useFormReducer = (initialValue = {}, onChange) => {
    const [state, action] = (0, react_1.useReducer)(reducer, {
        validations: {},
        errors: {},
        dirty: {},
        forcedErrors: {},
        values: initialValue,
        valid: true,
    });
    const getValue = (field) => {
        return state.values[field] || '';
    };
    const updateValue = (field, value) => {
        action({
            type: 'UPDATE',
            payload: {
                field,
                value,
            },
            onChange,
        });
    };
    const updateValues = (collection) => {
        action({
            type: 'UPDATE',
            payload: collection,
            onChange,
        });
    };
    const addField = (field, validation) => {
        action({
            type: 'ADD',
            payload: {
                field,
                validation,
            },
            onChange,
        });
    };
    const removeField = (field) => {
        action({
            type: 'REMOVE',
            payload: {
                field,
            },
            onChange,
        });
    };
    const clear = () => {
        action({
            type: 'CLEAR',
            payload: { initialValue },
            onChange,
        });
    };
    const isDirty = (field) => {
        return state.dirty[field];
    };
    const setDirty = (field) => {
        action({
            type: 'SET_DIRTY',
            payload: {
                field,
            },
        });
    };
    const setError = (field, message) => {
        action({
            type: 'SET_ERROR',
            payload: {
                field,
                message,
            },
            onChange,
        });
    };
    return Object.assign(Object.assign({}, state), { getValue,
        updateValue,
        updateValues,
        addField,
        removeField,
        isDirty,
        setDirty,
        clear,
        setError });
};
const useForm = () => {
    return (0, react_1.useContext)(FormContext);
};
exports.useForm = useForm;
const REQUIRED_VALIDATION = (errorMessage = 'Required field.') => (value) => !value ? errorMessage : '';
/* eslint-disable */
exports.EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */
const EMAIL_VALIDATION = (errorMessage = 'Invalid email.') => (value) => {
    if (!value) {
        return '';
    }
    if (typeof value === 'string') {
        return exports.EMAIL_REGEX.test(value) ? '' : errorMessage;
    }
    return errorMessage;
};
exports.EMAIL_VALIDATION = EMAIL_VALIDATION;
const useField = (props) => {
    const { name } = props;
    const { errors, getValue, isDirty, setDirty, updateValue, addField, removeField, submitted, submit, submitting, valid, } = (0, exports.useForm)();
    let validation = props.validation
        ? Array.isArray(props.validation)
            ? [...props.validation]
            : [props.validation]
        : [];
    if (props.required) {
        validation = [
            REQUIRED_VALIDATION(props.defaultErrorMessages
                ? props.defaultErrorMessages.required
                : undefined),
            ...validation,
        ];
    }
    if (props.type === 'email') {
        validation = [
            (0, exports.EMAIL_VALIDATION)(props.defaultErrorMessages
                ? props.defaultErrorMessages.email
                : undefined),
            ...validation,
        ];
    }
    if (!validation.length) {
        validation = undefined;
    }
    (0, react_1.useEffect)(() => {
        addField(name, validation);
        return () => {
            removeField(name);
        };
    }, 
    // eslint-disable-next-line
    []);
    const dirty = isDirty(name);
    const errorMessage = errors[name];
    const showError = !!errorMessage && (submitted || dirty);
    const onBlur = (e) => {
        setDirty(name);
        props.onBlur && props.onBlur(e);
    };
    const fieldValue = getValue(name);
    const update = (newvalue) => updateValue(name, newvalue);
    const payload = {
        fieldValue,
        update,
        showError,
        errorMessage,
        onBlur,
        submit,
        submitting,
        valid,
    };
    return payload;
};
exports.useField = useField;
const turnIntoField = (Component, defaultErrorMessages) => {
    return (props) => {
        const fieldProps = (0, exports.useField)(Object.assign(Object.assign({}, props), { defaultErrorMessages }));
        return react_1.default.createElement(Component, Object.assign({}, props, fieldProps));
    };
};
exports.turnIntoField = turnIntoField;
const Form = (props) => {
    const reducer = useFormReducer(props.initialValues, props.onChange);
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const [submitting, setSubmitting] = (0, react_1.useState)(false);
    const onSubmit = (mode) => {
        setSubmitted(true);
        if (props.onSubmit) {
            setSubmitting(true);
            props.onSubmit &&
                props.onSubmit({
                    valid: reducer.valid,
                    values: reducer.values,
                    errors: reducer.errors,
                    onFinish: (clear) => {
                        setSubmitting(false);
                        if (clear) {
                            reducer.clear();
                            setSubmitted(false);
                        }
                    },
                    setError: reducer.setError,
                }, mode);
        }
    };
    const value = Object.assign(Object.assign({}, reducer), { submitted, submitting, submit: onSubmit });
    return (react_1.default.createElement(FormContext.Provider, { value: value }, typeof props.children === 'function'
        ? props.children(value)
        : props.children));
};
exports.default = Form;
