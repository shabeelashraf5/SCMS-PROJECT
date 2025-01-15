import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AdProductEffects } from './portal/admin/product/ad-product/store/ad-product.effects';
import { EmDashboardEffects } from './portal/employee/dashboard/em-dashboard/store/em-dashboard.effects';
import { ProfileComponent } from './portal/employee/profile/profile/profile.component';
import { InventoryListComponent } from './portal/employee/warehouse/inventory-list/inventory-list.component';
import { AuthInterceptor } from './auth/admin/auth-admin.interceptor';
import { EmAuthInterceptor } from './auth/employee/auth-employee.interceptor';
import { ResetPasswordComponent } from './portal/employee/reset-password/reset-password.component';

import { ProfileEffects } from './portal/employee/profile/profile/store/profile.effects';
import { CustomerComponent } from './portal/employee/sales/customer/customer.component';
import { QuotationComponent } from './portal/employee/sales/quotation/quotation.component';
import { SalesOrderComponent } from './portal/employee/sales/sales-order/sales-order.component';
import { AddQuotationComponent } from './portal/employee/sales/add-quotation/add-quotation.component';

import { PurchaseOrderComponent } from './portal/employee/purchase/purchase-order/purchase-order.component';
import { EvaluationComponent } from './portal/employee/purchase/evaluation/evaluation.component';
import { SupplierComponent } from './portal/employee/purchase/supplier/supplier.component';
import { AddPoComponent } from './portal/employee/purchase/add-po/add-po.component';
import { InventoryEffects } from './store/effects/inventory-list.effects';
import { PurchaseHistoryComponent } from './portal/employee/purchase/purchase-history/purchase-history.component';
import { InvoicingComponent } from './portal/employee/accounting/invoicing/invoicing.component';
import { FinancialTransactionComponent } from './portal/employee/accounting/financial-transaction/financial-transaction.component';
import { FinancialReportComponent } from './portal/employee/accounting/financial-report/financial-report.component';
import { InvoiceDetailsComponent } from './portal/employee/accounting/invoice-details/invoice-details.component';
import { ShipmentHistoryComponent } from './portal/employee/shipment/shipment-history/shipment-history.component';
import { PaymentComponent } from './portal/employee/accounting/payment/payment.component';
import { SuccessComponent } from './portal/employee/success/success.component';
import { SalesAnalysisComponent } from './portal/employee/sales/sales-analysis/sales-analysis.component';
import { PlotlyViaCDNModule } from 'angular-plotly.js';
import { ClientPoComponent } from './portal/employee/sales/client-po/client-po.component';
import { VideoChatComponent } from './layouts/video-chat/video-chat.component';
import { ChatComponent } from './layouts/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { MessageComponent } from './layouts/message/message.component';
import { AdmDashboardComponent } from './portal/admin/adm-dashboard/adm-dashboard.component';

import { AdminLoginService } from './portal/admin/adminlogin/admin-login/admin-login.service';
import { EmployeeLoginService } from './portal/employee/employeelogin/employee-login/employee-login.service';
import { SuccessPaymentComponent } from './portal/employee/accounting/success-payment/success-payment.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { ExcelComponent } from './layouts/excel/excel.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminRouterComponent } from './portal/admin/admin-router.component';






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
    ProfileComponent,
    InventoryListComponent,
    ResetPasswordComponent,
    CustomerComponent,
    QuotationComponent,
    SalesOrderComponent,
    AddQuotationComponent,

    PurchaseOrderComponent,
    EvaluationComponent,
    SupplierComponent,
    AddPoComponent,
    PurchaseHistoryComponent,
    InvoicingComponent,
    FinancialTransactionComponent,
    FinancialReportComponent,
    InvoiceDetailsComponent,
    ShipmentHistoryComponent,
    PaymentComponent,
    SuccessComponent,
    SalesAnalysisComponent,
    ClientPoComponent,
    VideoChatComponent,
    ChatComponent,
    MessageComponent,
    AdmDashboardComponent,
    SuccessPaymentComponent,
    NotFoundComponent,
    ExcelComponent,
    AdminRouterComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    PlotlyViaCDNModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([AdUserEffects, AdminLoginEffects, AdEmployeeEffects, EmployeeLoginEffects,
    AdCategoryEffects, AdProductEffects, EmDashboardEffects,  ProfileEffects, InventoryEffects]),
 
   
    // SocketIoModule.forRoot(config)
    
  ],
  providers: [
    provideAnimationsAsync() , {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ,  
    { provide: HTTP_INTERCEPTORS, useClass: EmAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
