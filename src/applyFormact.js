// @flow
import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import FieldMe from './FieldMe'
import FormMe from './FormMe'
import SubmitMe from './SubmitMe'

/**
 * A public higher-order component to apply formact context
 */
const applyFormactElement = (Component: any, type: ?string) => {
  const C = (props: Object) => {
    const { wrappedComponentRef, ...remainingProps } = props
    const RootComponent =
      type === 'form' ? FormMe : type === 'submit' ? SubmitMe : FieldMe

    return (
      <RootComponent
        {...props}
        render={routeComponentProps => (
          <Component
            {...remainingProps}
            {...routeComponentProps}
            ref={wrappedComponentRef}
          />
        )}
      />
    )
  }

  C.displayName = `applyFormact(${Component.displayName || Component.name})`
  C.WrappedComponent = Component
  C.propTypes = {
    wrappedComponentRef: PropTypes.func,
  }

  return hoistStatics(C, Component)
}

export const applyFormactSubmit = (Component: any) =>
  applyFormactElement(Component, 'submit')
export const applyFormactField = (Component: any) =>
  applyFormactElement(Component, 'field')
export const applyFormactForm = (Component: any) =>
  applyFormactElement(Component, 'form')
