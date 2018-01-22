import React from 'react'
import { storiesOf } from '@storybook/react'
import styled from 'styled-components'
import TextInput from '../TextInput/'
import Form from './index'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const UIForm = Form(({ field }) => (
  <Wrapper>
    <TextInput
      label="A text field with error"
      {...field('textFieldWithError')}
      required
      error="This field is required"
      hasError
    />
    <TextInput
      label="An another one"
      required
    />
  </Wrapper>
))

storiesOf('Formular - text input', module).add('Default view', () => (<UIForm />))
