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

  fields = {}
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
    return this.submitted
  }

  triggerOnChange (name: string) {
    const { onChange } = this.props

    if (onChange) {
      onChange({
        fields: this.fields,
        lastChange: name,
        valid: this.isValid(),
      })
    }
  }

  valueChanged = (name: string, value: string) => {
    if (name) {
      this.fields[name].value = value

      this.validate()
      this.triggerOnChange(name)
    }
  }

  addField = ({name, value, validate}: { name: string, value: string, validate: () => {} }) => {
    this.fields[name] = {
      value,
    }
    this.validators[name] = {
      validate,
    }
    this.validate()
    this.triggerOnChange(name)
  }

  removeField = (name: string) => {
    const newFields = {}
    Object.keys(this.fields).forEach(field => {
      if (name !== field) {
        newFields[field] = this.fields[field]
      }
    })
    this.fields = newFields
    this.validators[name] = null
    this.validate()
    this.triggerOnChange(name)
  }

  validate () {
    Object.keys(this.fields).forEach(field => {
      this.fields[field].errors = this.validateField(field)
    })
  }

  validateField (field: string) {
    const {validate} = this.validators[field]
    if (!validate || typeof validate !== `function`) {
      return ''
    }
    return validate()
  }

  isValid () {
    return !Object.keys(this.fields).find(field => this.fields[field].errors)
  }

  onSubmit = (e: SyntheticEvent) => {
    const valid = this.isValid()
    this.submitted = true

    if (!valid) {
      e.preventDefault()
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(e, {valid, fields: this.fields})
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
