import { takeEvery, put } from 'redux-saga/effects'
import { actionTypes as productsActionTypes } from './products'

// actions -----
const actionTypes = {
  SHOW_TOAST: 'SHOW_TOAST',
  HIDE_TOAST: 'HIDE_TOAST',
}

// reducer -----
const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SHOW_TOAST: {
      return {
        message: action.message,
      }
    }
    case actionTypes.HIDE_TOAST: {
      return {}
    }
    default:
      return state
  }
}

// action creators -----
const show = (message) => {
  return {
    type: actionTypes.SHOW_TOAST,
    message,
  }
}
const hide = () => ({
  type: actionTypes.HIDE_TOAST,
})

// sagas -----
function* notifyProductRemoved() {
  yield put(show('Product has been removed'))
}

function* saga() {
  yield takeEvery(productsActionTypes.PRODUCT_REMOVAL_SUCCESSFUL, notifyProductRemoved)
}

export {
  show,
  hide,
  reducer,
  saga,
}
