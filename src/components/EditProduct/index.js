import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  selectSidebarProductId,
  selectSidebarIsNewProduct,
  closeProductSidebar,
} from '../../redux/ui'
import { selectProductById, saveProduct } from '../../redux/products'
import ProductSidebar from './Sidebar'

const EditProduct = ({ productId, product, dispatch, isNew }) => {
  const showSidebar = !!productId || isNew
  return (
    <ProductSidebar
      product={product}
      isNew={isNew}
      isVisible={showSidebar}
      close={() => dispatch(closeProductSidebar())}
      save={payload => dispatch(saveProduct(productId, payload))}
    />
  )
}

EditProduct.propTypes = {
  productId: PropTypes.number,
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    colorIds: PropTypes.array,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  isNew: PropTypes.bool,
}

EditProduct.defaultProps = {
  productId: null,
  isNew: false,
}

export default connect(state => {
  let product = { title: '', description: '', colorIds: [] }
  const productId = selectSidebarProductId(state)
  if (productId) {
    product = selectProductById(state, productId)
  }
  const isNew = selectSidebarIsNewProduct(state)
  return { productId, product, isNew }
})(EditProduct)
