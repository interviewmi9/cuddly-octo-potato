import {
  createStore as createReduxStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import { saga as productsSaga, reducer as products } from './products'

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
      ...extraReducers,
    }),
    initialState,
    composedMiddlewares,
  )

  extraSagas.forEach(saga => sagaMiddleware.run(saga))

  return store
}

function applyReduxSagas() {
  const sagas = [productsSaga]

  sagas.forEach(saga => sagaMiddleware.run(saga))
}

function createStore(...args) {
  const store = createBasicStore(...args)
  applyReduxSagas()
  return store
}

export default createStore
