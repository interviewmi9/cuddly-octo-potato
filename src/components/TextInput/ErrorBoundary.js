/* eslint-disable react/no-unused-state, react/prop-types */
import { Component } from 'react'

export default class extends Component {
  constructor() {
    super()
    this.state = { hasError: false }
  }
  componentDidCatch() {
    this.setState({ hasError: true })
  }
  render() {
    return this.props.children
  }
}
