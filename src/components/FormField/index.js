/* eslint-disable react/require-default-props */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const FieldMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ hasError, theme }) => (hasError ? theme.palette.alert : theme.palette.secondary)};
`

const LeftColumn = styled.span`
  align-self: flex-start;
`
const RightColumn = styled.span`
  align-self: flex-end;
`

const Wrapper = styled.div`
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.whitespace.xs};
  margin-right: ${({ theme }) => theme.whitespace.xs};
`

const InputContainer = styled.div`
  border: ${({ theme }) => `${theme.borders.width} solid ${theme.palette.border}`};
  border-radius: ${props => props.theme.borders.radius};
  background: ${({ theme }) => theme.palette.activeBg};
  display: flex;
  position: relative;
  input {
    appearance: none;
    border: 0;
    outline: 0;
    padding: ${props => props.theme.whitespace.xs}
      ${props => props.theme.whitespace.xs};
    font-size: ${props => props.theme.fontSizes.body};
    flex-grow: 1;
    background: none;
    z-index: 1;
  }
`

const FormField = ({
  hasError = false,
  error,
  required = false,
  label,
  inline = false,
  ...defaultProps
}) => {
  const hasFieldMeta = label || required

  return (
    <Wrapper inline={inline}>
      {hasFieldMeta && (
        <FieldMeta hasError={hasError}>
          {label && (
            <LeftColumn>{label}</LeftColumn>
            )}
          {(required || hasError) && (
            <RightColumn>{hasError ? error : '* required'}</RightColumn>
          )}
        </FieldMeta>
      )}
      {defaultProps.children}
    </Wrapper>
  )
}

FormField.propTypes = {
  hasError: PropTypes.bool,
  error: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string,
  inline: PropTypes.bool,
  inlineLabel: PropTypes.bool,
}

export { InputContainer }
export default FormField
