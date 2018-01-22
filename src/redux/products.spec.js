import { call, put, takeEvery } from 'redux-saga/effects'
import createStore from './createStore'
import {
  actionTypes,
  fetchProductsFromApi,
  requestProducts,
  saga,
  selectProductById,
} from './products'
import productsApi from './api/products'

describe('products', () => {
  const sampleProducts = [
    {
      colorId: 1,
      id: 1,
      title: 'quidem molestiae enim',
    },
    {
      colorId: 2,
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
    },
    {
      colorId: 1,
      id: 3,
      title: 'omnis laborum odio',
    },
  ]

  describe('sagas', () => {
    describe('high level sagas', () => {
      const gen = saga()
      it('should wait for products to be requested', () => {
        expect(gen.next().value).toEqual(
          takeEvery(actionTypes.PRODUCTS_REQUESTED, fetchProductsFromApi),
        )
      })

      it("shouldn't do anything else", () => {
        expect(gen.next().done).toBeTruthy()
      })
    })

    describe('when products are requested', () => {
      const requestProductsAction = requestProducts()
      const gen = fetchProductsFromApi(requestProductsAction)

      it('should spawn a fetch', () => {
        expect(gen.next().value).toEqual(call(productsApi.fetchProducts))
      })

      it('should dispatch PRODUCTS_LOADED action', () => {
        expect(gen.next(sampleProducts).value).toEqual(
          put({
            type: actionTypes.PRODUCTS_LOADED,
            products: sampleProducts,
          }),
        )
      })

      it("shouldn't do anything else", () => {
        expect(gen.next().done).toBeTruthy()
      })
    })
  })

  describe('selectors', () => {
    const store = createStore()

    store.dispatch({
      type: actionTypes.PRODUCTS_LOADED,
      products: sampleProducts,
    })

    describe('selectProductById', () => {
      it('should return a correct product by its id', () => {
        expect(
          selectProductById(store.getState(), sampleProducts[0].id),
        ).toEqual(sampleProducts[0])
      })
      it('should return empty object when id is not found', () => {
        expect(selectProductById(store.getState(), 'non-existing-id')).toEqual(
          {},
        )
      })
    })
  })

  describe('action creators', () => {
    describe('requestProducts', () => {
      it('should create an action to request products', () => {
        expect(requestProducts()).toEqual({
          type: actionTypes.PRODUCTS_REQUESTED,
        })
      })
    })
  })

  describe('reducer', () => {
    let store
    beforeEach(() => {
      store = createStore()
    })

    it('should handle PRODUCTS_LOADED action with products list provided', () => {
      store.dispatch({
        type: actionTypes.PRODUCTS_LOADED,
        products: sampleProducts,
      })

      expect(store.getState().products).toEqual({
        1: sampleProducts[0],
        2: sampleProducts[1],
        3: sampleProducts[2],
      })
    })
  })
})
