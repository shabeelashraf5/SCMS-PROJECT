import { Product } from "../../../../../model/ad-product.model";


export interface AdProductState {
    products: Product[];
    
  }
  
  export const initialAdProductState: AdProductState = {
    products: [],
   
  };