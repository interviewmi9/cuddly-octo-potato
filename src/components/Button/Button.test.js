import React from 'react'
import { shallow } from 'enzyme'
import Button from './'

describe('button component', () => {
  it('renders correctly', () => {
    const rendered = render(<Button onClick={() => {}}>Test</Button>)
    expect(rendered).toMatchSnapshot()
  })

  it('renders a text message', () => {
    const text = 'Test'

    const button = shallow(<Button onClick={() => {}}>{text}</Button>)
    expect(button.contains(text)).toBeTruthy()
  })

  it('calls an action when clicked', () => {
    const fn = jest.fn()
    const btn = shallow(<Button onClick={fn}>Test</Button>)
    btn.simulate('click')
    expect(fn).toBeCalled()
  })
})
