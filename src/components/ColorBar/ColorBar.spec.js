import React from 'react'
import ColorBar from './'

describe('Color Bar component', () => {
  const colorIds = [1, 2, 3]

  it('renders correctly', () => {
    const rendered = render(<ColorBar colorIds={colorIds} />)
    expect(rendered).toMatchSnapshot()
  })
})
