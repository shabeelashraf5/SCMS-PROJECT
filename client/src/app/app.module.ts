import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AdminNBComponent } from './layouts/navbar/adminNavb/admin-nb/admin-nb.component';
import { EmployeeNbComponent } from './layouts/navbar/employeeNavb/employee-nb/employee-nb.component';
import { AdminSbComponent } from './layouts/sidebar/adminSidebar/admin-sb/admin-sb.component';
import { EmployeeSbComponent } from './layouts/sidebar/employeeSidebar/employee-sb/employee-sb.component';
import { AdminLoginComponent } from './portal/admin/adminlogin/admin-login/admin-login.component';
import { EmployeeLoginComponent } from './portal/employee/employeelogin/employee-login/employee-login.component';
import { ToggleComponent } from './layouts/toggle/toggle/toggle.component';
import { FooterComponent } from './layouts/footer/footer/footer.component';
import { EmDashboardComponent } from './portal/employee/dashboard/em-dashboard/em-dashboard.component';
import { AdminPortalComponent } from './portal/admin/admin-portal/admin-portal.component';
import { AdEmployeeComponent } from './portal/admin/employee/ad-employee/ad-employee.component';
import { AdProductComponent } from './portal/admin/product/ad-product/ad-product.component';
import { AdCategoryComponent } from './portal/admin/category/ad-category/ad-category.component';
import { AdDashboardComponent } from './portal/admin/dashboard/ad-dashboard/ad-dashboard.component';
import { AdUserComponent } from './portal/admin/admin-user/ad-user/ad-user.component';
import { appReducer } from './state/app.state';
import { AdUserEffects } from './portal/admin/admin-user/ad-user/store/ad-user.effects';
import { AdminLoginEffects} from './portal/admin/adminlogin/admin-login/store/admin-login.effects';
import { AdEmployeeEffects } from './portal/admin/employee/ad-employee/store/ad-employee.effects';


import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeLoginEffects } from './portal/employee/employeelogin/employee-login/store/employee-login.effects';
import { AdCategoryEffects } from './portal/admin/category/ad-category/store/ad-category.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



@NgModule({
  declarations: [
    AppComponent,
    AdminNBComponent,
    EmployeeNbComponent,
    AdminSbComponent,
    EmployeeSbComponent,
    AdminLoginComponent,
    EmployeeLoginComponent,
    ToggleComponent,
    FooterComponent,
    EmDashboardComponent,
    AdminPortalComponent,
    AdEmployeeComponent,
    AdProductComponent,
    AdCategoryComponent,
    AdDashboardComponent,
    AdUserComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AdUserEffects, AdminLoginEffects, AdEmployeeEffects, EmployeeLoginEffects,
    AdCategoryEffects]),
    
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
