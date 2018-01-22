import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-size: ${props => props.theme.fontSizes.subHeader};
  font-weight: 400;
  line-height: ${props => props.theme.whitespace.base};
  padding-bottom: ${props => props.theme.whitespace.xs};
  text-transform: uppercase;
  overflow: hidden;
  text-overflow: ellipsis;
`

const SubHeader = ({ children }) => <Wrapper>{children}</Wrapper>

SubHeader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SubHeader
