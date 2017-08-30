// @flow

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import { REQUIRED, EMAIL } from './validation'

import type { FieldName, FieldValue, FieldValidateFunction } from './types'

type Props = {
  name: FieldName,
  required?: ?boolean,
  fieldValue?: ?FieldValue,
  defaultValue?: ?FieldValue,
  onChange?: ?(value: ?FieldValue) => void,
  validation?: ?FieldValidateFunction | ?Array<FieldValidateFunction>,
  component?: ?any,
  render?: ?(props: Object) => void,
  type?: ?string,
}

export default class FormactMe extends Component {
  props: Props

  static contextTypes = {
    addField: PropTypes.func,
    removeField: PropTypes.func,
    valueChanged: PropTypes.func,
    submitted: PropTypes.func,
  }

  state: {
    fieldValue: ?FieldValue,
    errorMessage: ?string,
    dirty: boolean,
  }

  constructor(props: Props, context: any) {
    super(props, context)

    const fieldValue = props.fieldValue || props.defaultValue || null

    this.state = {
      fieldValue,
      errorMessage: this.validate(fieldValue),
      dirty: false,
    }
  }

  componentDidMount() {
    if (this.context && this.context.addField) {
      const { fieldValue } = this.state
      this.context.addField({
        name: this.props.name,
        fieldValue,
        validate: this.validate,
      })

      if (fieldValue) {
        this.propagateValue(fieldValue)
      }
    }
  }

  componentWillUnmount() {
    if (this.context && this.context.removeField) {
      this.context.removeField(this.props.name)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    let { fieldValue } = this.state

    if ('fieldValue' in nextProps) {
      fieldValue = nextProps.fieldValue
    }

    if (this.context && this.props.name !== nextProps.name) {
      this.context.removeField(this.props.name)
      this.context.addField({
        name: nextProps.name,
        fieldValue,
        validate: this.validate,
      })
    }

    if (fieldValue !== this.state.fieldValue) {
      this.propagateValue(fieldValue)
    }
  }

  propagateValue = (fieldValue: ?FieldValue) => {
    this.setState(
      {
        fieldValue,
        errorMessage: this.validate(fieldValue),
      },
      this.setValueChanged,
    )
  }

  setValueChanged = () => {
    if (this.context && this.context.valueChanged) {
      this.context.valueChanged(this.props.name, this.state.fieldValue)
    }
  }

  onChange = (fieldValue: ?FieldValue) => {
    this.propagateValue(fieldValue)

    if (this.props.onChange) {
      this.props.onChange(fieldValue)
    }
  }

  validate = (fieldValue: ?FieldValue) => {
    let { validation, required, type } = this.props
    let errorMessage = ''

    if (!validation) {
      validation = []
    } else if (!Array.isArray(validation)) {
      validation = [validation]
    }

    if (required) {
      validation = [REQUIRED, ...validation]
    }

    if (type === 'email') {
      validation = [EMAIL, ...validation]
    }

    errorMessage = validation
      .map(fun => fun(fieldValue, this.props.name))
      .filter(m => m)
      .join(' ')

    return errorMessage
  }

  setDirty = () => {
    this.setState({
      dirty: true,
    })
  }

  render() {
    const { component, render, ...other } = this.props
    const props = {
      ...other,
      onChange: this.onChange,
      setDirty: this.setDirty,
      submitted: this.context.submitted(),
      ...this.state,
    }

    if (component) {
      return React.createElement(component, props)
    }

    if (render) {
      return render(props)
    }

    return null
  }
}
