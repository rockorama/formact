// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import type { FieldName, FieldValidateFunction } from './types'

import { REQUIRED } from './validation'

type Props = {
  name: FieldName,
  required?: boolean,
  value?: string,
  defaultValue?: string,
  onChange?: (e: SyntheticEvent<*>) => void,
  options: Array<string | Object>,
  validation?: FieldValidateFunction | Array<FieldValidateFunction>,
}

type State = {
  value: string,
}

export default class Select extends Component<Props, State> {
  static contextTypes = {
    addField: PropTypes.func,
    removeField: PropTypes.func,
    valueChanged: PropTypes.func,
    submitted: PropTypes.func,
  }

  constructor(props: Props, context: any) {
    super(props, context)

    const value =
      props.value || props.defaultValue || this.getFirstValue(props) || ''

    this.state = {
      value,
    }
  }

  getFirstValue(props: Props) {
    if (props.options.length) {
      if (typeof props.options[0] === 'string') {
        return props.options[0]
      } else {
        return props.options[0].value
      }
    }
  }

  componentDidMount() {
    if (this.context && this.context.addField) {
      const { value } = this.state
      this.context.addField({
        name: this.props.name,
        value,
        validate: this.validate,
      })

      if (this.state.value) {
        this.propagateValue()
      }
    }
  }

  componentWillUnmount() {
    if (this.context && this.context.removeField) {
      this.context.removeField(this.props.name)
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    let { value } = this.state

    if ('value' in nextProps) {
      value = nextProps.value
    }

    if (this.context && this.props.name !== nextProps.name) {
      this.context.removeField(this.props.name)
      this.context.addField({
        name: nextProps.name,
        value,
        validate: this.validate,
      })
    }

    if (value !== this.state.value) {
      this.setState(
        {
          value,
        },
        this.propagateValue,
      )
    }
  }

  propagateValue = () => {
    if (this.context && this.context.valueChanged) {
      this.context.valueChanged(this.props.name, this.state.value)
    }
  }

  onChange = (e: SyntheticEvent<*>) => {
    const { value } = (e.currentTarget: window.HTMLInputElement)

    this.setState(
      {
        value,
      },
      this.propagateValue,
    )

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  validate = () => {
    let { validation, required } = this.props
    let errorMessage = ''

    if (!validation) {
      validation = []
    } else if (!Array.isArray(validation)) {
      validation = [validation]
    }

    if (required) {
      validation = [REQUIRED, ...validation]
    }

    errorMessage = validation
      .map(fun => fun(this.state.value, this.props.name))
      .filter(m => m)
      .join(' ')

    return errorMessage
  }

  renderOption(item: string | Object) {
    if (typeof item === 'string') {
      return <option key={`option-${item}`}>{item}</option>
    }
    return <option {...item} key={`option-${item.toString()}`} />
  }

  render() {
    const { options, ...other } = this.props
    return (
      <select {...other} value={this.state.value} onChange={this.onChange}>
        {options.map(item => this.renderOption(item))}
      </select>
    )
  }
}
