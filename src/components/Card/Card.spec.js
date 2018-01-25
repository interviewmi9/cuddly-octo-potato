import React from 'react'
import Card from './'

describe('Product Card component', () => {
  const item = {
    id: 12,
    title: 'consequatur autem doloribus',
    description: ' natus consectetur',
    colorIds: [1, 2, 3],
  }

  it('renders correctly', () => {
    const rendered = render(<Card item={item} remove={() => {}} edit={() => {}} />)
    expect(rendered).toMatchSnapshot()
  })
})
