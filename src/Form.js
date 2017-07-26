// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Form extends Component {
  props: {
    onSubmit: () => {},
    onChange?: () => {},
    children?: any,
  }

  static childContextTypes = {
    addField: PropTypes.func,
    removeField: PropTypes.func,
    valueChanged: PropTypes.func,
    submitted: PropTypes.func,
  }

  state: {
    submitted: boolean,
  } = {
    submitted: false,
  }

  fields = {}
  errors = {}
  validators = {}
  submitted = false

  getChildContext () {
    return {
      addField: this.addField,
      removeField: this.removeField,
      valueChanged: this.valueChanged,
      submitted: this.checkSubmitted,
    }
  }

  checkSubmitted = () => {
    return this.state.submitted
  }

  triggerOnChange = (name: string) => {
    const { onChange } = this.props

    if (onChange) {
      onChange({
        fields: this.fields,
        errors: this.errors,
        lastChange: name,
        valid: this.isValid(),
      })
    }
  }

  valueChanged = (name: string, value: string) => {
    if (name) {
      this.fields[name] = value

      this.validate()
      this.triggerOnChange(name)
    }
  }

  addField = ({name, value, validate}: { name: string, value: string, validate: () => {} }) => {
    this.fields[name] = value
    this.validators[name] = {
      validate,
    }
    this.validate()
    this.triggerOnChange(name)
  }

  removeField = (name: string) => {
    const newFields = {}
    const newErrors = {}
    Object.keys(this.fields).forEach(field => {
      if (name !== field) {
        newFields[field] = this.fields[field]
        newErrors[field] = this.errors[field]
      }
    })
    this.fields = newFields
    this.errors = newErrors
    this.validators[name] = null
    this.validate()
    this.triggerOnChange(name)
  }

  validate = () => {
    Object.keys(this.fields).forEach(field => {
      this.errors[field] = this.validateField(field)
    })
  }

  validateField = (field: string)  => {
    const {validate} = this.validators[field]
    if (!validate || typeof validate !== `function`) {
      return ''
    }
    return validate(this.fields[field])
  }

  isValid = () => {
    return !Object.keys(this.errors).find(field => this.errors[field])
  }

  onSubmit = (e: SyntheticEvent) => {
    const valid = this.isValid()
    this.setState({
      submitted: true,
    })

    if (!valid) {
      e.preventDefault()
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(e, {valid, fields: this.fields, errors: this.errors})
    }
  }

  onChange (e: SyntheticEvent) {
    e.preventDefault()
  }

  render () {
    let {children, ...others} = this.props
    return (
      <form {...others} onChange={this.onChange} onSubmit={this.onSubmit}>
        {children}
      </form>
    )
  }
}
