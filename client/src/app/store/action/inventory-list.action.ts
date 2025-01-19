import { createAction, props } from '@ngrx/store';
import { Products } from '../../model/ad-product.model';


export const loadInventory = createAction('[Product] Load Product');
export const loadInventorySuccess = createAction('[Product] Load Product Success', props<{ products: Products[] }>());
export const loadInventoryFailure = createAction('[Product] Load Product Failure', props<{ error: string }>());