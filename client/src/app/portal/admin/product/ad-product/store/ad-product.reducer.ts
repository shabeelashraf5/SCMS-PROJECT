import { Action , createReducer, on } from '@ngrx/store';
import { initialAdProductState, AdProductState } from './ad-product.state';
import * as AdProductActions from './ad-product.action'


export const adProductReducer = createReducer(
    initialAdProductState,
    
    on(AdProductActions.loadProductSuccess, (state, { products }) => ({
      ...state,
      products: products,
      error: null
    })),

    
    on(AdProductActions.addProduct, (state, { category_id, product , description , uom, price, availability }) => ({
      ...state,
      categories: [
        ...state.products,
        { _id: '', category_id,  product , description , uom, price, availability  }
      ]
    })) ,


    on(AdProductActions.updateProduct, (state, { product }) => {
      const updatedProduct = state.products.map(prod => {
        if (prod._id === product._id) { 
          return { ...prod, ...product };
        }
        return prod;
      });
  
      return {
        ...state,
        products: updatedProduct
      };
    }),


    on(AdProductActions.deleteProductSuccess, (state, { productId }) => ({
      ...state,
      products: state.products.filter(product => product._id !== productId),
      error: null
    })),

    
  on(AdProductActions.loadProductFailure, AdProductActions.addProductFailure, AdProductActions.updateProductFailure, AdProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error
  }))



)

export function reducer(state: AdProductState | undefined, action: Action) {
    return adProductReducer(state, action);
  }