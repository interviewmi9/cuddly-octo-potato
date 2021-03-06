import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import Button from './'

storiesOf('Button', module).add('Primary', () => (
  <Button onClick={action('button-click')}>
    Primary
  </Button>
)).add('Disabled', () => (
  <Button type="disabled" onClick={action('button-click')}>
    Disabled
  </Button>
))
