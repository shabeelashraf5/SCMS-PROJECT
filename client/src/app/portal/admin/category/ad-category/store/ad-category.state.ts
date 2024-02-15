import { Category } from "../../../../../model/ad-category.model";

/*
export interface AdCategoryState {
    categories: Category[];
    error: string | null;
  }
  
  export const initialAdCategoryState: AdCategoryState = {
    categories: [],
    error: null
  };

  */
  export interface AdCategoryState {
    categories: Category[];
  }
  
  export const initialAdCategoryState: AdCategoryState = {
    categories: [],
  };