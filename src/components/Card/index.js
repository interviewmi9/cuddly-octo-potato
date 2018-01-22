import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Spacer = styled.div`
  width: 20%;
`

const Wrapper = styled.div`
  cursor: pointer;
  border-left: 8px solid transparent;
  padding: 20px;
  color: #606b87;
  margin: 20px;
  transition: background 0.4s ease;
  box-shadow: 0px 0px 3px #d4d5d8;
  background-color: #fff;
  &:first-letter {
    text-transform: capitalize;
  }
`

const Card = ({ item }) => {
  return (
    <Spacer>
      <Wrapper title={item.title}>{item.title}</Wrapper>
    </Spacer>
  )
}

Card.propTypes = {
  item: PropTypes.shape(PropTypes.string).isRequired,
}

export default Card
