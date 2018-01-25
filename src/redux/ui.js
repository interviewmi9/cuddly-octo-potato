import getProp from 'lodash/get'

const actionTypes = {
  OPEN_PRODUCT_SIDEBAR: 'OPEN_PRODUCT_SIDEBAR',
  OPEN_NEW_PRODUCT_SIDEBAR: 'OPEN_NEW_PRODUCT_SIDEBAR',
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
    case actionTypes.OPEN_NEW_PRODUCT_SIDEBAR: {
      return {
        ...state,
        productSidebar: {
          isNew: true,
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
  type: productId ? actionTypes.OPEN_PRODUCT_SIDEBAR : actionTypes.OPEN_NEW_PRODUCT_SIDEBAR,
  productId,
})

const closeProductSidebar = () => ({
  type: actionTypes.CLOSE_PRODUCT_SIDEBAR,
})

const selectSidebarProductId = (state) => {
  return getProp(state, 'ui.productSidebar.productId')
}

const selectSidebarIsNewProduct = (state) => {
  return getProp(state, 'ui.productSidebar.isNew')
}

export {
  reducer,
  actionTypes,
  openProductSidebar,
  closeProductSidebar,
  selectSidebarProductId,
  selectSidebarIsNewProduct,
}
