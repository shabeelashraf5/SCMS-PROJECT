import { createReducer, on } from '@ngrx/store';
import { initialInventoryState, InventoryState } from '../state/inventory-list.state';
import * as AdProductActions from '../action/inventory-list.action'


export const inventoryReducer = createReducer(
    initialInventoryState,
    
    on(AdProductActions.loadInventorySuccess, (state, { products }) => ({
      ...state,
      products: products,
      error: null
    })),


    on(AdProductActions.loadInventoryFailure,  (state, { error }) => ({
        ...state,
        error
      }))
    
    
    
    )
    
    export function reducer(state: InventoryState | undefined, action: any) {
        return inventoryReducer(state, action);
      }