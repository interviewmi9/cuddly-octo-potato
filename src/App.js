import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectProducts } from './redux/products'
import Card from './components/Card'


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
  <Header>Products</Header>,

  <Wrapper>
    {productsList.map(item => <Card item={item} />)}
  </Wrapper>,

]

export default connect((state) => {
  const productsList = selectProducts(state)
  return { productsList }
})(App)
