import { call, put, takeEvery } from 'redux-saga/effects'
import createStore from './createStore'
import {
  actionTypes,
  fetchProductsFromApi,
  requestProductRemoval,
  requestProductSave,
  requestProducts,
  saga,
  selectProducts,
  selectProductById,
  removeProduct,
  saveProduct,
} from './products'
import { actionTypes as uiActionTypes } from './ui'
import productsApi from './api/products'

describe('products', () => {
  const sampleProducts = [
    {
      colorIds: [1],
      id: 1,
      title: 'quidem molestiae enim',
    },
    {
      colorIds: [2, 3],
      id: 2,
      title: 'sunt qui excepturi placeat culpa',
    },
    {
      colorIds: [1, 3],
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

      it('should wait for product removal request', () => {
        expect(gen.next().value).toEqual(
          takeEvery(actionTypes.PRODUCT_REMOVAL_REQUESTED, requestProductRemoval),
        )
      })

      it('should wait for product save request', () => {
        expect(gen.next().value).toEqual(
          takeEvery(actionTypes.PRODUCT_SAVE_REQUESTED, requestProductSave),
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

    describe('when product is deleted', () => {
      const deleteProductAction = removeProduct(1)
      const gen = requestProductRemoval(deleteProductAction)

      it('should dispatch REMOVE_PRODUCT action', () => {
        expect(gen.next().value).toEqual(
          put({
            type: actionTypes.REMOVE_PRODUCT,
            id: 1,
          }),
        )
      })

      it('should dispatch PRODUCT_REMOVAL_SUCCESSFUL action', () => {
        expect(gen.next().value).toEqual(
          put({
            type: actionTypes.PRODUCT_REMOVAL_SUCCESSFUL,
            productId: 1,
          }),
        )
      })

      it("shouldn't do anything else", () => {
        expect(gen.next().done).toBeTruthy()
      })
    })

    describe('when product is saved', () => {
      const saveProductAction = saveProduct(1, {})
      const gen = requestProductSave(saveProductAction)

      it('should dispatch a CLOSE_PRODUCT_SIDEBAR action', () => {
        expect(gen.next().value).toEqual(
          put({
            type: uiActionTypes.CLOSE_PRODUCT_SIDEBAR,
          }),
        )
      })

      it('should dispatch an UPDATE_PRODUCT action', () => {
        expect(gen.next().value).toEqual(
          put({
            type: actionTypes.UPDATE_PRODUCT,
            id: 1,
            payload: {},
          }),
        )
      })

      it('should dispatch PRODUCT_SAVE_SUCCESSFUL action', () => {
        expect(gen.next().value).toEqual(
          put({
            type: actionTypes.PRODUCT_SAVE_SUCCESSFUL,
            productId: 1,
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

    describe('selectProducts', () => {
      it('should return full list of products', () => {
        expect(
          selectProducts(store.getState()),
        ).toEqual([sampleProducts[0], sampleProducts[1], sampleProducts[2]])
      })
      it('should return an empty array when products store is empty', () => {
        expect(selectProducts({})).toEqual([])
      })
    })

    describe('selectProductById', () => {
      it('should return a correct product by its id', () => {
        expect(
          selectProductById(store.getState(), sampleProducts[0].id),
        ).toEqual(sampleProducts[0])
      })
      it('should return an empty object when id is not found', () => {
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

    describe('removeProduct', () => {
      it('should create an action to request remove a product', () => {
        expect(removeProduct(1)).toEqual({
          type: actionTypes.PRODUCT_REMOVAL_REQUESTED,
          productId: 1,
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

    it('should handle REMOVE_PRODUCT action with product id provided', () => {
      store.dispatch({
        type: actionTypes.PRODUCTS_LOADED,
        products: sampleProducts,
      })

      store.dispatch({
        type: actionTypes.REMOVE_PRODUCT,
        id: 2,
      })

      expect(store.getState().products).toEqual({
        1: sampleProducts[0],
        3: sampleProducts[2],
      })
    })
  })
})
