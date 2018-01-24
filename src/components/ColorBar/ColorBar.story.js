import React from 'react'
import styled from 'styled-components'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import ColorBar from './'

const Wrapper = styled.div`
  height: 50px;
  width: 7px;
`

const colorIds = [3, 2, 1]
storiesOf('ColorBar', module)
  .addDecorator((story, context) => withInfo()(story)(context))
  .add('Default view', () => {
    return <Wrapper><ColorBar colorIds={colorIds} /></Wrapper>
  })
