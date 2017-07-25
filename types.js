// @flow

import type { Component, Element } from 'react'

export type ElementChild = void | number | string | Element<*>

export type ElementChildren = ElementChild | Array<ElementChild>
