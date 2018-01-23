import { call, put, takeEvery } from 'redux-saga/effects'
import getProp from 'lodash/get'
import omit from 'lodash/omit'
import productsApi from './api/products'

const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED'
const PRODUCTS_LOADED = 'PRODUCTS_LOADED'
const PRODUCT_REMOVAL_REQUESTED = 'PRODUCT_REMOVAL_REQUESTED'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const PRODUCT_REMOVAL_SUCCESSFUL = 'PRODUCT_REMOVAL_SUCCESSFUL'

const actionTypes = {
  PRODUCTS_REQUESTED,
  PRODUCTS_LOADED,
  PRODUCT_REMOVAL_REQUESTED,
  REMOVE_PRODUCT,
  PRODUCT_REMOVAL_SUCCESSFUL,
}

const keyBy = (arr, prop) =>
  arr.reduce(
    (hash, val) => ({
      ...hash,
      [prop(val)]: val,
    }),
    {},
  )

const reducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCTS_LOADED: {
      return {
        ...state,
        ...keyBy(action.products, g => `${g.id}`),
      }
    }

    case REMOVE_PRODUCT: {
      return omit(state, action.id)
    }

    default:
      return state
  }
}

const requestProducts = () => ({
  type: PRODUCTS_REQUESTED,
})

const selectProducts = state => Object.values(getProp(state, 'products') || {})

const selectProductById = (state, productId) =>
  getProp(state.products, productId) || {}

const removeProduct = productId => ({
  type: actionTypes.PRODUCT_REMOVAL_REQUESTED,
  productId,
})

function* fetchProductsFromApi() {
  try {
    const products = yield call(productsApi.fetchProducts)
    yield put({
      type: PRODUCTS_LOADED,
      products,
    })
  } catch (e) {
    console.error(e)
  }
}

function* requestProductRemoval(action) {
  try {
    yield put({
      type: actionTypes.REMOVE_PRODUCT,
      id: action.productId,
    })
    yield put({
      type: actionTypes.PRODUCT_REMOVAL_SUCCESSFUL,
      productId: action.productId,
    })
  } catch (e) {
    console.error(e)
  }
}

function* saga() {
  yield takeEvery(PRODUCTS_REQUESTED, fetchProductsFromApi)

  yield takeEvery(
    actionTypes.PRODUCT_REMOVAL_REQUESTED,
    requestProductRemoval,
  )
}

export {
  actionTypes,
  fetchProductsFromApi,
  requestProductRemoval,
  reducer,
  requestProducts,
  saga,
  selectProducts,
  selectProductById,
  removeProduct,
}
