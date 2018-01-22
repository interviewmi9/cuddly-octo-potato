import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import { action } from '@storybook/addon-actions'
import Button from '../Button'
import Confirm from './'

const confirmationButton = <Button>Really delete?</Button>

storiesOf('Confirm', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Two-state button', () => (
    <Confirm by={confirmationButton}>
      <Button onClick={action('Delete-confirmed')}>
        Delete
      </Button>
    </Confirm>
  ))
