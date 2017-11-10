// @flow

import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'

import type { FormSubmitPayload } from './types'

type Props = {
  component?: ?any,
  render?: ?(props: Object) => void,
}

export default class SubmitMe extends Component<Props> {
  static contextTypes = {
    submitForm: PropTypes.func,
  }

  render() {
    const { component, render, ...other } = this.props
    const props = {
      ...other,
      onSubmit: this.context.submitForm,
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
