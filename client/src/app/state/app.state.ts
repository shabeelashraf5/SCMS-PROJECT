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

export interface AppState {
    admin: AdUserState;
    adminLogin: AdminLoginState

    employee: AdEmployeeState
    employeeLogin : EmployeeLoginState

    category: AdCategoryState
    
  }


  export const appReducer = {

   admin: adUserReducer,
   adminLogin: adminLoginReducer,
   category: adCategoryReducer,

   employee: adEmployeeReducer,
   employeeLogin: employeeLoginReducer

   
}
