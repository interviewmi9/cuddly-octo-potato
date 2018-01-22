import { takeEvery } from 'redux-saga'
import createStore from './createStore'

describe('createStore', () => {
  describe('accepts additional reducers', () => {
    it('should call additional reducers when action is dispatched', () => {
      const extraReducer = jest.fn().mockImplementation((state = {}) => state)
      const store = createStore({ extraReducer })
      store.dispatch({
        type: 'TEST',
      })
      expect(extraReducer).toHaveBeenCalled()
    })
  })

  describe('accepts additional sagas', () => {
    it('should call additional sagas', () => {
      const sideEffect = jest.fn()

      function* testSaga() {
        yield takeEvery('TEST', sideEffect)
      }

      const store = createStore({}, [testSaga])

      store.dispatch({
        type: 'TEST',
      })

      expect(sideEffect).toHaveBeenCalled()
    })
  })

  describe('accepts additional middlewares', () => {
    it('should call additional middlewares', () => {
      const extraMiddleware = jest
        .fn()
        .mockImplementation(() => next => action => next(action))
      const store = createStore({}, [], [extraMiddleware])

      store.dispatch({
        type: 'TEST',
      })

      expect(extraMiddleware).toHaveBeenCalled()
    })
  })

  describe('accepts initial state', () => {
    it('should populate initial state', () => {
      const initialState = {
        products: {
          test: 'test',
        },
      }

      const store = createStore({}, [], [], initialState)
      expect(store.getState().products).toEqual({
        test: 'test',
      })
    })
  })
})
