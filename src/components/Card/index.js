import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Subheader from '../Subheader'
import Confirm from '../Confirm'
import Button from '../Button'
import ColorBar from '../ColorBar'

const Spacer = styled.div`
  width: 20%;
`
const Wrapper = styled.div`
  color: #606b87;
  margin: 10px;
  transition: background 0.4s ease;
  box-shadow: 0px 0px 3px #d4d5d8;
  background-color: #fff;
  display: flex;
  flex-direction: row;
`
const Bar = styled.div`
  width: 8px;
`
const Content = styled.div`
  padding: 20px;
`
const Clickable = styled.div`
  cursor: pointer;
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
  &:hover {
    background: none;
  }
`

const confirmationButton = <SmallButton>Really delete?</SmallButton>

const Card = ({ item, edit, remove }) => {
  return (
    <Spacer>
      <Wrapper title={item.title}>
        <Bar>
          <ColorBar colorIds={item.colorIds} />
        </Bar>
        <Content>
          <Clickable onClick={edit}>
            <Subheader>
              {item.title}
            </Subheader>
            <Text>{item.description}</Text>
          </Clickable>
          <Confirm by={confirmationButton}>
            <SmallButton onClick={remove}>Delete</SmallButton>
          </Confirm>
        </Content>
      </Wrapper>
    </Spacer>
  )
}

Card.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    colorIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  edit: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
}

export default Card
