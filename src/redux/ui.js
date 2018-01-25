import getProp from 'lodash/get'

const actionTypes = {
  OPEN_PRODUCT_SIDEBAR: 'OPEN_PRODUCT_SIDEBAR',
  CLOSE_PRODUCT_SIDEBAR: 'CLOSE_PRODUCT_SIDEBAR',
}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.OPEN_PRODUCT_SIDEBAR: {
      return {
        ...state,
        productSidebar: {
          productId: action.productId,
        },
      }
    }
    case actionTypes.CLOSE_PRODUCT_SIDEBAR: {
      return {
        ...state,
        productSidebar: undefined,
      }
    }
    default:
      return state
  }
}

const openProductSidebar = (productId) => ({
  type: actionTypes.OPEN_PRODUCT_SIDEBAR,
  productId,
})

const closeProductSidebar = () => ({
  type: actionTypes.CLOSE_PRODUCT_SIDEBAR,
})

const selectSidebarProductId = (state) => {
  return getProp(state, 'ui.productSidebar.productId')
}

export {
  reducer,
  actionTypes,
  openProductSidebar,
  closeProductSidebar,
  selectSidebarProductId,
}
