import React from 'react'
import { shallow } from 'enzyme'
import Button from './'

describe('button component', () => {
  it('renders correctly by default', () => {
    const rendered = render(<Button onClick={() => {}}>Test</Button>)
    expect(rendered).toMatchSnapshot()
  })

  it('renders disabled state correctly', () => {
    const rendered = render(<Button type="disabled" onClick={() => {}}>Test</Button>)
    expect(rendered).toMatchSnapshot()
  })

  it('calls an action when clicked', () => {
    const fn = jest.fn()
    const btn = shallow(<Button onClick={fn}>Test</Button>)
    btn.simulate('click')
    expect(fn).toBeCalled()
  })
})
