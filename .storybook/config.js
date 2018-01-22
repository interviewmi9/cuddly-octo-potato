import React from 'react'
import { configure, addDecorator } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { setDefaults } from '@storybook/addon-info'
import theme from '../src/components/theme'

const req = require.context('../src/components', true, /\.?story\.js$/)
const loadStories = () => req.keys().forEach(filename => req(filename))

setDefaults({
  header: false,
  inline: true,
  source: true,
})
addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>)
configure(loadStories, module)
