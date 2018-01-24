import React from 'react'
import { shallow } from 'enzyme'
import SideBar from './'

describe('Sidebar component', () => {
  it('fires onBeforeClose and onAfterClose events', () => {
    const onBeforeClose = jest.fn()
    const onAfterClose = jest.fn()

    const sideBar = shallow(<SideBar
      isOpen
      onBeforeClose={onBeforeClose}
      onAfterClose={onAfterClose}
      content={() => <div>content</div>}
    />)

    sideBar.setProps({
      isOpen: false,
      onBeforeClose,
      onAfterClose,
    }, () => {
      expect(onBeforeClose).toBeCalled()
      expect(onAfterClose).toBeCalled()
    })
  })
})
