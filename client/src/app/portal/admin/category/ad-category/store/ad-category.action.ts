import { createAction, props } from '@ngrx/store';

import { Category } from '../../../../../model/ad-category.model';

export const loadCategory = createAction('[Category] Load Category');
export const loadCategorySuccess = createAction('[Category] Load Category Success', props<{ categories: Category[] }>());
export const loadCategoryFailure = createAction('[Category] Load Category Failure', props<{ error: string }>());

export const addCategory = createAction('[Ad Category] Create Category', props<{ category: string }>());
export const addCategorySuccess = createAction('[Ad Category] Create Category Success', props<{ category: Category }>());
export const addCategoryFailure = createAction('[Ad Category] Create Category Failure', props<{ error: any }>());

export const updateCategory = createAction('[Ad Category] Update Category', props<{ category: Partial<Category> }>());
export const updateCategorySuccess = createAction('[Ad Category] Update Category Success', props<{ category: Category }>());
export const updateCategoryFailure = createAction('[Ad Category] Update Category Failure', props<{ error: string }>() );

export const deleteCategory = createAction('[Category] Delete Category', props<{ categoryId: string }>());
export const deleteCategorySuccess = createAction('[Category] Delete Category Success', props<{ categoryId: string }>());
export const deleteCategoryFailure = createAction('[Category] Delete Category Failure', props<{ error: string }>());   


