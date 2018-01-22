import React from 'react'
import { mount } from 'enzyme'
import { ThemeProvider } from 'styled-components'
import theme from '../theme'
import Button from '../Button'
import Confirm from './'

const withTheme = child => <ThemeProvider theme={theme}>{child}</ThemeProvider>

describe('Confirm component', () => {
  let onDeleteFn
  let deleteButton
  let confirmationButton

  beforeEach(() => {
    onDeleteFn = jest.fn()
    deleteButton = (
      <Button onClick={onDeleteFn}>
        Delete
      </Button>
    )
    confirmationButton = <Button>Really delete?</Button>
  })

  it('renders correctly by default', () => {
    expect(
      render(<Confirm by={confirmationButton}>{deleteButton}</Confirm>),
    ).toMatchSnapshot()
  })

  it('does not call callback on first click', () => {
    const btn = mount(
      withTheme(<Confirm by={confirmationButton}>{deleteButton}</Confirm>),
    )

    btn.simulate('click')
    expect(onDeleteFn).not.toHaveBeenCalled()
  })

  it('calls callback after second click', () => {
    const btn = mount(
      withTheme(<Confirm by={confirmationButton}>{deleteButton}</Confirm>),
    )

    btn.simulate('click')
    btn.simulate('click')
    expect(onDeleteFn).toHaveBeenCalledTimes(1)
  })
})
