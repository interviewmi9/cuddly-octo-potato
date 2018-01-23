import React from 'react'
import Card from './'

describe('Product Card component', () => {
  const item = {
    id: 12,
    title: 'consequatur autem doloribus',
    description: ' natus consectetur',
    colorId: 2,
  }

  it('renders correctly', () => {
    const rendered = render(<Card item={item} remove={() => {}} />)
    expect(rendered).toMatchSnapshot()
  })
})
