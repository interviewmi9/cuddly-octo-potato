import React, { Component } from 'react'
import { withTheme } from 'styled-components'
import FormField, { InputContainer } from '../FormField/'
import ErrorBoundary from './ErrorBoundary'

class TextInput extends Component {
  componentDidMount() {
    if (this.props.focus) {
      this.input.focus()
    }
  }

  input

  focusInput = () => {
    this.input.focus()
  }

  render() {
    const {
      placeholder = '',
      ...defaultProps
    } = this.props

    return (
      <ErrorBoundary>
        <FormField {...defaultProps}>
          <InputContainer>
            <ErrorBoundary>
              <input
                {...defaultProps}
                ref={f => (this.input = f)} // eslint-disable-line no-return-assign
                placeholder={placeholder}
              />
            </ErrorBoundary>
          </InputContainer>
        </FormField>
      </ErrorBoundary>
    )
  }
}

TextInput.propTypes = {
  ...FormField.propTypes,
}

export default withTheme(TextInput)
