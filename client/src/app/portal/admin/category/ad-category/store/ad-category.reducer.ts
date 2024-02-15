import { createReducer, on } from '@ngrx/store';
import { initialAdCategoryState, AdCategoryState } from './ad-category.state';
import * as AdCategoryActions from '../store/ad-category.action';
import { Category } from '../../../../../model/ad-category.model';

export const adCategoryReducer = createReducer(

    initialAdCategoryState,


  on(AdCategoryActions.loadCategorySuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    error: null
  })),
  
  
  on(AdCategoryActions.addCategory, (state, { category }) => ({
    ...state,
    categories: [
      ...state.categories,
      { _id: '', category }
    ]
  })) ,
  

  on(AdCategoryActions.updateCategory, (state, { category }) => {
    const updatedCategories = state.categories.map(cat => {
      if (cat._id === category._id) { // Assuming _id is the unique identifier
        return { ...cat, ...category };
      }
      return cat;
    });

    return {
      ...state,
      categories: updatedCategories
    };
  }),


  on(AdCategoryActions.deleteCategorySuccess, (state, { categoryId }) => ({
    ...state,
    categories: state.categories.filter(category => category._id !== categoryId),
    error: null
  })),


  on(AdCategoryActions.loadCategoryFailure, AdCategoryActions.addCategoryFailure, AdCategoryActions.deleteCategoryFailure,  (state, { error }) => ({
    ...state,
    error
  }))

  

  /*
  on(AdCategoryActions.loadCategoriesSuccess, (state, { categories }) => [...categories]),
  on(AdCategoryActions.createCategorySuccess, (state, { category }) => [...state, category]),
  on(AdCategoryActions.deleteCategorySuccess, (state, { categoryId }) => state.filter((category) => category._id !== categoryId))
*/



);

export function reducer(state: AdCategoryState | undefined, action: any) {
  return adCategoryReducer(state, action); 
 
 
 /* export function reducer(state: Category[] | undefined, action: Action) {
    return adCategoryReducer(state, action); */
}