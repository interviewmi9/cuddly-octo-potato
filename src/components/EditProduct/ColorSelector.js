import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { colors } from '../../fixtures'

const Label = styled.label`
  display: block;
  padding-top: ${({ theme }) => theme.whitespace.xs};
`

const Warning = styled.div`
  color: ${({ theme }) => theme.palette.alert};
  padding-top: ${({ theme }) => theme.whitespace.xs};
`

const ColorSelector = ({ values, isValid, onChange }) => {
  const selection = values.reduce((acc, val) => {
    acc[val] = true
    return acc
  }, {})

  const toggle = (toggleId, checked) => {
    const updatedSelection = {
      ...selection,
      [toggleId]: checked,
    }

    const result = Object.keys(colors).filter(id => updatedSelection[id])
    onChange(result)
  }

  return (
    <div>
      {Object.keys(colors).map(id => (
        <Label htmlFor={id} key={id}>
          <input
            id={id}
            type="checkbox"
            value={id}
            checked={selection[id]}
            onChange={({ target }) => toggle(id, target.checked)}
          />{' '}
          {colors[id].title}
        </Label>
      ))}
      {!isValid && <Warning>Please select at least one color</Warning>}
    </div>
  )
}

ColorSelector.propTypes = {
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func.isRequired,
}

ColorSelector.defaultProps = {
  values: [],
}

export default ColorSelector
