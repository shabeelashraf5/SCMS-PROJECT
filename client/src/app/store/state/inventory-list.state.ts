import { Products } from "../../model/ad-product.model";


export interface InventoryState {
    products: Products[];
    
  }
  
  export const initialInventoryState: InventoryState = {
    products: [],
   
  };