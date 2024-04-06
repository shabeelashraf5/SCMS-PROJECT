import { AdUserState } from "../portal/admin/admin-user/ad-user/store/ad-user.state";
import { adUserReducer } from "../portal/admin/admin-user/ad-user/store/ad-user.reducer";
import { AdminLoginState } from "../portal/admin/adminlogin/admin-login/store/admin-login.state";
import { adminLoginReducer } from "../portal/admin/adminlogin/admin-login/store/admin-login.reducer";
import { AdEmployeeState } from "../portal/admin/employee/ad-employee/store/ad-employee.state";
import { adEmployeeReducer } from "../portal/admin/employee/ad-employee/store/ad-employee.reducer";
import { EmployeeLoginState } from "../portal/employee/employeelogin/employee-login/store/employee-login.state";
import { employeeLoginReducer } from "../portal/employee/employeelogin/employee-login/store/employee-login.reducer";
import { AdCategoryState } from "../portal/admin/category/ad-category/store/ad-category.state";
import { adCategoryReducer } from "../portal/admin/category/ad-category/store/ad-category.reducer";
import { AdProductState } from "../portal/admin/product/ad-product/store/ad-product.state";
import { adProductReducer } from "../portal/admin/product/ad-product/store/ad-product.reducer";
import { EmMessagingState } from "../portal/employee/dashboard/em-dashboard/store/em-dashboard.state";
import { emDashboardReducer } from "../portal/employee/dashboard/em-dashboard/store/em-dashboard.reducer";

import { ProfileState } from "../portal/employee/profile/profile/store/profile.state";
import { emProfileReducer } from "../portal/employee/profile/profile/store/profile.reducer";
import { InventoryState } from "../store/state/inventory-list.state";
import { inventoryReducer } from "../store/reducer/inventory-list.reducer";

export interface AppState {
    admin: AdUserState;
    adminLogin: AdminLoginState

    employee: AdEmployeeState
    employeeLogin : EmployeeLoginState
    message: EmMessagingState

    category: AdCategoryState
    product: AdProductState

    profile: ProfileState

    inventory: InventoryState

    
  }


  export const appReducer = {

   admin: adUserReducer,
   adminLogin: adminLoginReducer,
   category: adCategoryReducer,
   product: adProductReducer,

   employee: adEmployeeReducer,
   employeeLogin: employeeLoginReducer,
   message: emDashboardReducer,

   profile: emProfileReducer,

   inventory: inventoryReducer


   
}
