import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { selectSidebarProductId, closeProductSidebar } from '../../redux/ui'
import { selectProductById } from '../../redux/products'
import ProductSidebar from './Sidebar'

const EditProduct = ({ productId, product, dispatch }) => {
  const showSidebar = !!productId

  return (
    <ProductSidebar
      product={product}
      isVisible={showSidebar}
      close={() => dispatch(closeProductSidebar())}
    />
  )
}

EditProduct.propTypes = {
  productId: PropTypes.number,
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    colorIds: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
}

EditProduct.defaultProps = {
  productId: null,
}

export default connect((state) => {
  let product = {}
  const productId = selectSidebarProductId(state)
  if (productId) {
    product = selectProductById(state, productId)
  }
  return { productId, product }
})(EditProduct)

