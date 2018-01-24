import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Sidebar from './'

const sidebarContent = (Body, Footer) => [
  <Body key="body">Some content here</Body>,
  <Footer key="footer">Footer</Footer>,
]

storiesOf('Sidebar', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Default view', () => (
    <Sidebar isOpen content={sidebarContent} />
  ))
