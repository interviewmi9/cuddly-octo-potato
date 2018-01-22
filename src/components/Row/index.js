import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const justifyOptions = [
  'flex-start',
  'center',
  'flex-end',
  'space-between',
  'space-around',
]
export const alignOptions = [
  'flex-start',
  'center',
  'flex-end',
  'stretch',
  'baseline',
]

const Layout = styled.div`
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 1;
  & > * {
    margin: 0 ${props => props.spacing}px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`
const Row = ({ children, ...props }) => <Layout {...props}>{children}</Layout>

Row.propTypes = {
  align: PropTypes.oneOf(alignOptions),
  children: PropTypes.node.isRequired,
  justify: PropTypes.oneOf(justifyOptions),
  spacing: PropTypes.number,
}
Row.defaultProps = {
  align: 'flex-start',
  justify: 'flex-start',
  spacing: 10,
}

export default Row
