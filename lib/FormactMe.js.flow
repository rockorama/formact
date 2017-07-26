// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { REQUIRED } from './validation'

type Props = {
  name: string,
  required?: boolean,
  value?: any,
  defaultValue?: any,
  onChange?: () => {},
  validation?: () => {} | Array<() => {}>,
  component?: any,
  render?: () => {},
  children?: any,
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
    value: any,
    errorMessage: string,
    dirty: boolean,
  }

  constructor(props: Props, context: any) {
    super(props, context)

    const value =
      props.value
      || props.defaultValue
      || null

    this.state = {
      value,
      errorMessage: this.validate(value),
      dirty: false,
    }
  }

  componentDidMount () {
    if (this.context && this.context.addField) {
      const {value} = this.state
      this.context.addField({
        name: this.props.name,
        value,
        validate: this.validate,
      })

      if (value) {
        this.propagateValue(value)
      }
    }
  }

  componentWillUnmount () {
    if (this.context && this.context.removeField) {
      this.context.removeField(this.props.name)
    }
  }

  componentWillReceiveProps (nextProps: Props) {
    let {value} = this.state

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
      this.propagateValue(value)
    }
  }

  propagateValue = (value: any) => {
    if (this.context && this.context.valueChanged) {
      this.context.valueChanged(this.props.name, value)
      this.setState({
        value,
        errorMessage: this.validate(value),
      })
    }
  }

  onChange = (value: any) => {
    this.propagateValue(value)

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  validate = (proposedValue: any) => {
    const value = proposedValue || (this.state && this.state.value)
    let {validation, required} = this.props
    let errorMessage = ''

    if (!validation) {
      validation = []
    } else if (!Array.isArray(validation)) {
      validation = [validation]
    }

    if (required) {
      validation = [
        REQUIRED,
        ...validation,
      ]
    }

    errorMessage = validation.map(
      fun => fun(value, this.props.name)
    ).filter(m => m).join(' ')

    return errorMessage
  }

  setDirty = () => {
    this.setState({
      dirty: true,
    })
  }

  render () {
    const { children, component, render, ...other } = this.props
    const props = {
      ...other,
      onChange: this.onChange,
      setDirty: this.setDirty,
      submitted: this.context.submitted(),
      ...this.state,
    }

    return (
      component ? (
        React.createElement(component, props) : null
       ) : render ? (
         render(props)
       ) : children ? (
         typeof children === 'function' ? (
          children(props)
        ) : !isEmptyChildren(children) ? (
          React.Children.only(children)
        ) : (
          null
        )
       ) : null
     )
  }
}
