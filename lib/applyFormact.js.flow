// @flow
import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'
import FormactMe from './FormactMe'

/**
 * A public higher-order component to apply formact context
 */
const applyFormact = (Component: any) => {
  const C = (props: Object) => {
    const { wrappedComponentRef, ...remainingProps } = props

    return (
      <FormactMe
        {...props}
        render={routeComponentProps =>
          <Component
            {...remainingProps}
            {...routeComponentProps}
            ref={wrappedComponentRef}
          />}
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

export default applyFormact
