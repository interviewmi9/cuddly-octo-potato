import React from 'react'
import Row from './'

describe('Row component', () => {
  it('renders correctly', () => {
    expect(render(<Row>Hello</Row>)).toMatchSnapshot()
  })
})
