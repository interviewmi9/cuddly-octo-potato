import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { selectProducts, removeProduct } from './redux/products'
import Card from './components/Card'
import Button from './components/Button'
import Row from './components/Row'
import Toast from './components/Toast'

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
const Loader = styled.div`
  font-size: 18px;
  margin: ${({ theme }) => theme.whitespace.base};
`

const App = ({ productsList, remove }) => (
  <div>
    <Toast />
    <Header>
      <Row justify="space-between" align="center">
        Products
        <Button>Add new</Button>
      </Row>
    </Header>

    {!productsList.length && <Loader>Loading...</Loader>}
    {!!productsList.length && (
      <Wrapper>
        {productsList.map(item => (
          <Card key={item.id} item={item} remove={() => remove(item.id)} />
        ))}
      </Wrapper>
    )}
  </div>
)

App.propTypes = {
  productsList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    colorIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  })).isRequired,
  remove: PropTypes.func.isRequired,
}

export default connect(
  state => {
    const productsList = selectProducts(state)
    return { productsList }
  },
  dispatch => ({
    remove(id) {
      dispatch(removeProduct(id))
    },
  }),
)(App)
