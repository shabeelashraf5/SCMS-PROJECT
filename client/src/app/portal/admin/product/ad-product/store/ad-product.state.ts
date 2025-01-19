import { Products } from "../../../../../model/ad-product.model";


export interface AdProductState {
    products: Products[];
    
  }
  
  export const initialAdProductState: AdProductState = {
    products: [],
   
  };