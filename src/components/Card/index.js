import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../Subheader'

const Spacer = styled.div`
  width: 20%;
`

const Wrapper = styled.div`
  cursor: pointer;
  border-left: 8px solid transparent;
  padding: 20px;
  color: #606b87;
  margin: 10px;
  transition: background 0.4s ease;
  box-shadow: 0px 0px 3px #d4d5d8;
  background-color: #fff;
`

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

const Card = ({ item }) => {
  return (
    <Spacer>
      <Wrapper title={item.title}>
        <Subheader>{item.title}</Subheader>
        <Text>{item.description}</Text>
      </Wrapper>
    </Spacer>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
}

export default Card
