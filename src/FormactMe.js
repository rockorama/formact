// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { REQUIRED } from './validation'

type Props = {
  name: string,
  required: boolean,
  value: string,
  defaultValue: string,
  onChange: () => {},
  validation: () => {} | Array<() => {}>,
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
    value: string,
  }

  constructor(props: Props, context: any) {
    super(props, context)

    const value =
      props.value
      || props.defaultValue
      || ''

    this.state = {
      value,
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

      if (this.state.value) {
        this.propagateValue()
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
      this.setState({
        value,
      }, this.propagateValue)
    }
  }

  propagateValue = () => {
    if (this.context && this.context.valueChanged) {
      this.context.valueChanged(this.props.name, this.state.value)
    }
  }

  onChange = (value: string) => {

    this.setState({
      value,
    }, this.propagateValue)

    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  validate = () => {
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
      fun => fun(this.state.value, this.props.name)
    ).filter(m => m).join(' ')

    return errorMessage
  }

  render () {
    const { children, component, render, ...other } = this.props
    const props = { value: this.state.value, onChange: this.onChange, ...other }

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
