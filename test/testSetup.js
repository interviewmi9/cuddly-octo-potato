import 'raf/polyfill'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import renderer from 'react-test-renderer'
import toJson from 'enzyme-to-json'
import { ThemeProvider } from 'styled-components'
import theme from '../src/components/theme'

Enzyme.configure({ adapter: new Adapter() })

// Make Enzyme functions available in all test files without importing
global.shallow = shallow
global.mount = mount
global.toJson = node => toJson(node, { mode: 'deep' })

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    /* eslint-disable no-console */
    console.log(error)
    console.log(info)
  }
  render() {
    /* eslint-disable react/prop-types */
    return this.props.children
  }
}

global.mountWithTheme = children => {
  /* eslint-disable */
  return mount(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{children}</MemoryRouter>
    </ThemeProvider>,
  )
  /* eslint-enable */
}

const withTheme = child => (
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <ErrorBoundary>{child}</ErrorBoundary>
    </ThemeProvider>
  </ErrorBoundary>
)

global.render = child => renderer.create(withTheme(child)).toJSON()

global.simulateNativeClick = node =>
  node.simulate('click', {
    nativeEvent: { stopImmediatePropagation: () => {} },
  })
