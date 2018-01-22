import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  align-items: center;
  background-color: ${props => props.theme.button.backgroundColor};
  border-radius: ${props => props.theme.borders.radius};
  border: ${props => props.theme.button.border};
  color: ${props => props.theme.button.color};
  cursor: pointer;
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
  onClick: PropTypes.func,
}

Button.defaultProps = {
  onClick: () => {},
}

export default Button
