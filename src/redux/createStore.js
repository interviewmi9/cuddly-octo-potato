import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import { saga as productsSaga, reducer as products } from './products'
import { saga as toastSaga, reducer as toast } from './toast'
import { reducer as ui } from './ui'

const sagaMiddleware = createSagaMiddleware()

function createBasicStore(
  extraReducers = {},
  extraSagas = [],
  middlewares = [],
  initialState = {},
) {
  const composedMiddlewares = composeWithDevTools(
    applyMiddleware(sagaMiddleware, ...middlewares),
  )

  const store = createReduxStore(
    combineReducers({
      products,
      toast,
      ui,
      ...extraReducers,
    }),
    initialState,
    composedMiddlewares,
  )

  extraSagas.forEach(saga => sagaMiddleware.run(saga))

  return store
}

function applyReduxSagas() {
  const sagas = [productsSaga, toastSaga]

  sagas.forEach(saga => sagaMiddleware.run(saga))
}

function createStore(...args) {
  const store = createBasicStore(...args)
  applyReduxSagas()
  return store
}

export default createStore
