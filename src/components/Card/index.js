import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../Subheader'
import Confirm from '../Confirm'
import Button from '../Button'
import { colors } from '../../fixtures'

const Spacer = styled.div`
  width: 20%;
`
const Wrapper = styled.div`
  cursor: pointer;
  border-left: 8px solid ${({ colorId }) => colors[colorId].value};
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
  padding-bottom: ${({ theme }) => theme.whitespace.xs};
`
const SmallButton = styled(Button)`
  background: none;
  padding: ${({ theme }) => theme.whitespace.xxs};
  color: ${({ theme }) => theme.palette.base};
  font-size: 12px;
  border-color: ${({ theme }) => theme.palette.border};
  &:hover{
    background: none;
  }
`

const confirmationButton = <SmallButton>Really delete?</SmallButton>

const Card = ({ item, deleteItem }) => {
  return (
    <Spacer>
      <Wrapper title={item.title} colorId={item.colorId}>
        <Subheader>{item.title}</Subheader>
        <Text>{item.description}</Text>
        <Confirm by={confirmationButton}><SmallButton onClick={deleteItem}>Delete</SmallButton></Confirm>
      </Wrapper>
    </Spacer>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    colorId: PropTypes.number.isRequired,
  }).isRequired,
  deleteItem: PropTypes.func.isRequired,
}

export default Card
