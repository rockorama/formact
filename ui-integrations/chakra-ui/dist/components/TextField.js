"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const formact_1 = require("formact");
function TextField(props) {
    const field = (0, formact_1.useField)(props);
    return (react_1.default.createElement(react_2.FormControl, { isDisabled: props.disabled, isReadOnly: props.readOnly, isInvalid: field.showError, color: field.showError ? 'error' : undefined, isRequired: props.required, pb: 2 },
        props.label ? (react_1.default.createElement(react_2.FormLabel, { htmlFor: props.name }, props.label)) : null,
        react_1.default.createElement(react_2.Input, { isInvalid: field.showError, errorBorderColor: "error", id: props.name, type: props.type, value: field.fieldValue || '', onChange: (e) => {
                field.update(e.target.value);
            }, onBlur: (e) => {
                var _a;
                (_a = props.onBlur) === null || _a === void 0 ? void 0 : _a.call(props, e);
                field.onBlur();
            }, onKeyDown: (e) => {
                if (e.key === 'Enter') {
                    field.submit();
                }
            } }),
        field.showError || props.helperText ? (react_1.default.createElement(react_2.FormHelperText, { textColor: field.showError ? 'error' : undefined }, field.errorMessage || props.helperText)) : null));
}
exports.default = TextField;
