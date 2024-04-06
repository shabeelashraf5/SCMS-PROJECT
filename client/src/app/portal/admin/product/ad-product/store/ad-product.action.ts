import { createAction, props } from '@ngrx/store';
import { Product } from '../../../../../model/ad-product.model';


export const loadProduct = createAction('[Product] Load Product');
export const loadProductSuccess = createAction('[Product] Load Product Success', props<{ products: Product[] }>());
export const loadProductFailure = createAction('[Product] Load Product Failure', props<{ error: string }>());


export const addProduct = createAction('[Ad Product ] Create Product', props<{ category_id: string, product: string, description: string, uom: string, price: number, availability: string }>());
export const addProductSuccess = createAction('[Ad Product] Create Product Success', props<{ product: Product }>());
export const addProductFailure = createAction('[Ad Product] Create Product Failure', props<{ error: any }>());  


export const updateProduct = createAction('[Ad Product] Update Product', props<{ product: Partial<Product> }>());
export const updateProductSuccess = createAction('[Ad Product] Update Product Success', props<{ product: Product }>());
export const updateProductFailure = createAction('[Ad Product] Update Product Failure', props<{ error: string }>() );


export const deleteProduct = createAction('[Employee] Delete Employee', props<{ productId: string }>());
export const deleteProductSuccess = createAction('[Employee] Delete Employee Success', props<{ productId: string }>());
export const deleteProductFailure = createAction('[Employee] Delete Employee Failure', props<{ error: string }>());