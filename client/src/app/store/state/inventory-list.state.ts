import { Product } from "../../model/ad-product.model";


export interface InventoryState {
    products: Product[];
    
  }
  
  export const initialInventoryState: InventoryState = {
    products: [],
   
  };