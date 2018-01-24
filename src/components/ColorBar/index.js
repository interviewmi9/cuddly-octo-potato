import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors } from '../../fixtures'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Bar = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor};
  flex-grow: 1;
`

const ColorBar = ({ colorIds }) => {
  return (
    <Wrapper>
      {colorIds.map(id => <Bar key={id} backgroundColor={colors[id].value} />)}
    </Wrapper>
  )
}

ColorBar.propTypes = {
  colorIds: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default ColorBar
