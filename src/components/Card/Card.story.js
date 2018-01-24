import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import Card from './'

const item = {
  id: 12,
  title: 'consequatur autem doloribus',
  description: 'natus consectetur',
  colorIds: [2, 3],
}
storiesOf('Card', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Default view', () => {
    return <Card item={item} remove={() => {}} />
  })
