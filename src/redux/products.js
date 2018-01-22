import { call, put, takeEvery } from 'redux-saga/effects'
import getProp from 'lodash/get'
import productsApi from './api/products'

const PRODUCTS_REQUESTED = 'PRODUCTS_REQUESTED'
const PRODUCTS_LOADED = 'PRODUCTS_LOADED'

const actionTypes = {
  PRODUCTS_REQUESTED,
  PRODUCTS_LOADED,
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

    default:
      return state
  }
}

const requestProducts = () => ({
  type: PRODUCTS_REQUESTED,
})

const selectProductById = (state, productId) => getProp(state.products, productId) || {}

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

function* saga() {
  yield takeEvery(PRODUCTS_REQUESTED, fetchProductsFromApi)
}

export {
  actionTypes,
  fetchProductsFromApi,
  reducer,
  requestProducts,
  saga,
  selectProductById,
}
