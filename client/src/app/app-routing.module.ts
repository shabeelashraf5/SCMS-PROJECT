import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './portal/admin/adminlogin/admin-login/admin-login.component';
import { EmployeeLoginComponent } from './portal/employee/employeelogin/employee-login/employee-login.component';
import { EmDashboardComponent } from './portal/employee/dashboard/em-dashboard/em-dashboard.component';
import { AdminPortalComponent } from './portal/admin/admin-portal/admin-portal.component';
import { AdDashboardComponent } from './portal/admin/dashboard/ad-dashboard/ad-dashboard.component';
import { AdEmployeeComponent } from './portal/admin/employee/ad-employee/ad-employee.component';
import { AdProductComponent } from './portal/admin/product/ad-product/ad-product.component';
import { AdCategoryComponent } from './portal/admin/category/ad-category/ad-category.component';
import { AdUserComponent } from './portal/admin/admin-user/ad-user/ad-user.component';



const routes: Routes = [
  { path: '', redirectTo: '/employee-login', pathMatch: 'full' },
  {path: 'employee-login' , component: EmployeeLoginComponent},

  {path: 'admin' , component: AdminLoginComponent},
  {path: 'admin/portal' , component: AdminPortalComponent},
  {path: 'admin/dashboard' , component: AdDashboardComponent},
  {path: 'admin/employee' , component: AdEmployeeComponent},
  {path: 'admin/product' , component: AdProductComponent},
  {path: 'admin/category' , component: AdCategoryComponent},
  {path: 'admin/admin-user' , component: AdUserComponent},

  
  { path: 'dashboard' , component: EmDashboardComponent, },
  { path: 'sales' , component: EmDashboardComponent },
  { path: 'purchase' , component: EmDashboardComponent },
  { path: 'warehouse' , component: EmDashboardComponent },
  { path: 'shipment' , component: EmDashboardComponent },
  { path: 'accounting' , component: EmDashboardComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
