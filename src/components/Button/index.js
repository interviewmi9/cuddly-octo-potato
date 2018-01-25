import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${({ theme, type }) => theme.button(type).backgroundColor};
  border-radius: ${props => props.theme.borders.radius};
  color: ${({ theme, type }) => theme.button(type).color};
  border: ${({ theme, type }) => theme.button(type).border};
  cursor: ${props => (props.type === 'disabled' ? 'not-allowed' : 'pointer')};
  display: inline-flex;
  flex-direction: row;
  font-size: ${props => props.theme.fontSizes.body};
  padding: 0.5rem 1rem;
  text-align: center;
  user-select: none;
  &:hover {
    background-color: ${props => props.theme.button.hover};
  }
`

const Button = ({ children, ...props }) => (
  <Wrapper onClick={() => props.onClick && props.onClick()} {...props}>{children}</Wrapper>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  onClick: () => {},
  type: 'primary',
}

export default Button
