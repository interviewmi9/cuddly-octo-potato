import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectProducts } from './redux/products'
import Card from './components/Card'
import Button from './components/Button'
import Row from './components/Row'

const Header = styled.div`
  background: #000;
  color: #fff;
  padding: 20px;
  font-size: 18px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const App = ({ productsList }) => [
  <Header>
    <Row justify="space-between" align="center">
      Products
      <Button>Add new</Button>
    </Row>
  </Header>,

  <Wrapper>
    {productsList.map(item => <Card item={item} />)}
  </Wrapper>,

]

export default connect((state) => {
  const productsList = selectProducts(state)
  return { productsList }
})(App)
