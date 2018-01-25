import React from 'react'
import { shallow } from 'enzyme'
import Sidebar from './'

describe('Sidebar component', () => {
  it('fires onBeforeClose and onAfterClose events', () => {
    const onBeforeClose = jest.fn()
    const onAfterClose = jest.fn()

    const sidebar = shallow(<Sidebar
      isOpen
      onBeforeClose={onBeforeClose}
      onAfterClose={onAfterClose}
      content={() => <div>content</div>}
    />)

    sidebar.setProps({
      isOpen: false,
      onBeforeClose,
      onAfterClose,
    }, () => {
      expect(onBeforeClose).toBeCalled()
      expect(onAfterClose).toBeCalled()
    })
  })
})
