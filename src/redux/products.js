import { call, put, takeEvery } from 'redux-saga/effects'
import getProp from 'lodash/get'
import omit from 'lodash/omit'
import productsApi from './api/products'
import { closeProductSidebar } from './ui'

const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED'
const PRODUCTS_LOADED = 'PRODUCTS_LOADED'
const PRODUCT_REMOVAL_REQUESTED = 'PRODUCT_REMOVAL_REQUESTED'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const PRODUCT_REMOVAL_SUCCESSFUL = 'PRODUCT_REMOVAL_SUCCESSFUL'
const PRODUCT_SAVE_REQUESTED = 'PRODUCT_SAVE_REQUESTED'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
const PRODUCT_SAVE_SUCCESSFUL = 'PRODUCT_SAVE_SUCCESSFUL'

const actionTypes = {
  PRODUCTS_REQUESTED,
  PRODUCTS_LOADED,
  PRODUCT_REMOVAL_REQUESTED,
  REMOVE_PRODUCT,
  PRODUCT_REMOVAL_SUCCESSFUL,
  PRODUCT_SAVE_REQUESTED,
  UPDATE_PRODUCT,
  PRODUCT_SAVE_SUCCESSFUL,
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

    case UPDATE_PRODUCT: {
      return {
        ...state,
        [action.id]: action.payload,
      }
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

const saveProduct = (productId, payload) => ({
  type: actionTypes.PRODUCT_SAVE_REQUESTED,
  productId,
  payload,
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

function* requestProductSave(action) {
  try {
    yield put(closeProductSidebar())
    yield put({
      type: actionTypes.UPDATE_PRODUCT,
      id: action.productId,
      payload: action.payload,
    })
    yield put({
      type: actionTypes.PRODUCT_SAVE_SUCCESSFUL,
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

  yield takeEvery(
    actionTypes.PRODUCT_SAVE_REQUESTED,
    requestProductSave,
  )
}

export {
  actionTypes,
  fetchProductsFromApi,
  requestProductRemoval,
  requestProductSave,
  reducer,
  requestProducts,
  saga,
  selectProducts,
  selectProductById,
  removeProduct,
  saveProduct,
}
