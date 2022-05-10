"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const Form_1 = require("./Form");
const validations_1 = require("./validations");
function useValidation(props, value, form, setError) {
    const { validation, required, type, defaultErrorMessages, dependsOn } = props;
    const validationArray = (0, react_1.useMemo)(() => {
        let fns = [];
        if (required) {
            fns.push((0, validations_1.REQUIRED_VALIDATION)(defaultErrorMessages === null || defaultErrorMessages === void 0 ? void 0 : defaultErrorMessages.required));
        }
        if (type === 'email') {
            fns.push((0, validations_1.EMAIL_VALIDATION)(defaultErrorMessages === null || defaultErrorMessages === void 0 ? void 0 : defaultErrorMessages.email));
        }
        if (validation) {
            if (Array.isArray(validation)) {
                fns = [...fns, ...validation];
            }
            else {
                fns.push(validation);
            }
        }
        return fns;
    }, [required, type, validation, defaultErrorMessages]);
    const { lastUpdate } = form;
    const lastDependantUpdated = (0, react_1.useMemo)(() => {
        if ((dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.indexOf((lastUpdate === null || lastUpdate === void 0 ? void 0 : lastUpdate.fieldName) || '')) || -1 > -1) {
            return Date.now();
        }
        return 0;
    }, [dependsOn, lastUpdate]);
    const dependsOnValues = (0, react_1.useMemo)(() => {
        const values = {};
        if (dependsOn === null || dependsOn === void 0 ? void 0 : dependsOn.length) {
            dependsOn.forEach((name) => {
                values[name] = form.getValue(name);
            });
        }
        return values;
    }, [lastDependantUpdated]);
    const errors = (0, react_1.useMemo)(() => {
        let error = '';
        if (validationArray.length) {
            error = validationArray
                .map((fn) => fn(value, dependsOnValues))
                .filter((error) => error)
                .join(' ');
        }
        setError(error);
        return error;
    }, [value, dependsOnValues, validationArray]);
    return () => errors;
}
function useField(props) {
    const form = (0, Form_1.useForm)();
    const [value, setValue] = (0, react_1.useState)(form.initialValues[props.name]);
    const [error, setError] = (0, react_1.useState)('');
    const [showError, setShowError] = (0, react_1.useState)(false);
    const fieldRef = (0, react_1.useRef)({
        getValue: () => value,
        setValue: (value) => {
            setValue(value);
        },
        setError,
        clear: () => {
            setValue(undefined);
            setShowError(false);
        },
        name: props.name,
    }).current;
    fieldRef.validate = useValidation(props, value, form, setError);
    (0, react_1.useEffect)(() => {
        setShowError(form.submitted);
    }, [form.submitted]);
    (0, react_1.useEffect)(() => {
        fieldRef.getValue = () => value;
        form.notifyValueChange(fieldRef.name);
    }, [value]);
    (0, react_1.useEffect)(() => {
        fieldRef.name = props.name;
        form.addField(fieldRef);
        return () => form.removeField(fieldRef.name);
    }, [props.name]);
    return {
        errorMessage: error,
        fieldValue: value,
        showError,
        valid: !error,
        submitting: form.submitting,
        update: setValue,
        onBlur: (e) => {
            var _a;
            (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
            setShowError(true);
        },
        submit: form.submit,
    };
}
exports.default = useField;
