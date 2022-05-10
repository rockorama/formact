"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useForm = exports.Form = void 0;
const react_1 = require("react");
const FormContext = (0, react_1.createContext)({
    initialValues: {},
    inForm: false,
    lastUpdate: { when: 0, reason: 'create' },
    submitted: false,
    submitting: false,
    valid: true,
    addField: () => { },
    removeField: () => { },
    getErrors: () => ({}),
    getValues: () => ({}),
    getValue: () => '',
    updateValue: () => { },
    updateValues: () => { },
    notifyValueChange: () => { },
    submit: () => { },
    clear: () => { },
    setError: () => { },
});
const checkIsValid = (errors) => Object.keys(errors).filter((e) => errors[e]).length === 0;
function Form(props) {
    var _a, _b, _c, _d, _e;
    const [submitting, setSubmitting] = (0, react_1.useState)(false);
    const [submitted, setSubmitted] = (0, react_1.useState)(false);
    const [valid, setValid] = (0, react_1.useState)((_b = (_a = props.initialState) === null || _a === void 0 ? void 0 : _a.valid) !== null && _b !== void 0 ? _b : true);
    const [lastUpdate, setLastUpdate] = (0, react_1.useState)({
        when: Date.now(),
        reason: 'create',
    });
    const fields = (0, react_1.useRef)({}).current;
    const getValues = (0, react_1.useCallback)(() => {
        const values = {};
        Object.keys(fields).forEach((name) => {
            values[name] = fields[name].getValue();
        });
        return values;
    }, []);
    const getErrors = (0, react_1.useCallback)(() => {
        const errors = {};
        Object.keys(fields).forEach((name) => {
            var _a;
            const field = fields[name];
            errors[name] = ((_a = field.validate) === null || _a === void 0 ? void 0 : _a.call(field)) || '';
        });
        return errors;
    }, []);
    const getFormState = (0, react_1.useCallback)(() => {
        const values = getValues();
        const errors = getErrors();
        return { errors, values };
    }, []);
    const onChange = (0, react_1.useCallback)((reason, fieldName) => {
        setLastUpdate({ when: Date.now(), reason, fieldName });
    }, []);
    (0, react_1.useEffect)(() => {
        var _a;
        const { errors, values } = getFormState();
        const valid = checkIsValid(errors);
        setValid(valid);
        (_a = props.onChange) === null || _a === void 0 ? void 0 : _a.call(props, {
            valid,
            errors,
            values,
            event: lastUpdate,
        });
    }, [lastUpdate]);
    const addField = (0, react_1.useCallback)((field) => {
        fields[field.name] = field;
        onChange('addField', field.name);
    }, []);
    const removeField = (0, react_1.useCallback)((fieldName) => {
        delete fields[fieldName];
        onChange('removeField', fieldName);
    }, []);
    const notifyValueChange = (0, react_1.useCallback)((fieldName) => {
        onChange('changeValue', fieldName);
    }, []);
    const getValue = (0, react_1.useCallback)((fieldName) => {
        var _a;
        return (_a = fields[fieldName]) === null || _a === void 0 ? void 0 : _a.getValue();
    }, []);
    const updateValue = (0, react_1.useCallback)((fieldName, value) => {
        var _a;
        (_a = fields[fieldName]) === null || _a === void 0 ? void 0 : _a.setValue(value);
    }, []);
    const updateValues = (0, react_1.useCallback)((fields) => {
        fields.forEach((f) => updateValue(f.field, f.value));
    }, []);
    const clear = (0, react_1.useCallback)(() => {
        Object.keys(fields).forEach((name) => {
            const field = fields[name];
            field.clear();
        });
        onChange('reset');
    }, []);
    const setError = (0, react_1.useCallback)((fieldName, message) => {
        var _a;
        (_a = fields[fieldName]) === null || _a === void 0 ? void 0 : _a.setError(message);
        onChange('setError', fieldName);
    }, []);
    const submit = (0, react_1.useCallback)(() => {
        setSubmitting(true);
        setSubmitted(true);
        if (props.onSubmit) {
            const { errors, values } = getFormState();
            const valid = checkIsValid(errors);
            props.onSubmit({
                values,
                valid,
                errors,
                setError,
                onFinish: (shouldClear) => {
                    setSubmitting(false);
                    if (shouldClear) {
                        clear();
                    }
                },
            });
        }
        setSubmitting(false);
    }, []);
    const value = {
        inForm: true,
        initialValues: (_e = (_d = (_c = props.initialState) === null || _c === void 0 ? void 0 : _c.values) !== null && _d !== void 0 ? _d : props.initialValues) !== null && _e !== void 0 ? _e : {},
        lastUpdate,
        valid,
        submitted,
        submitting,
        addField,
        removeField,
        getValues,
        getValue,
        updateValue,
        updateValues,
        notifyValueChange,
        submit,
        clear,
        getErrors,
        setError,
    };
    return (react_1.default.createElement(FormContext.Provider, { value: value }, typeof props.children === 'function'
        ? props.children(value)
        : props.children));
}
exports.Form = Form;
function useForm() {
    return (0, react_1.useContext)(FormContext);
}
exports.useForm = useForm;
exports.default = Form;
//# sourceMappingURL=../src/dist/Form.js.map