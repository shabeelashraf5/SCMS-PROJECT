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
import { CanAdminLogged } from './auth/admin/admin-logged.guard';
import { ProfileComponent } from './portal/employee/profile/profile/profile.component';
import { InventoryListComponent } from './portal/employee/warehouse/inventory-list/inventory-list.component';
import { CanActivateLogin} from './auth/admin/admin-nologged.guard';
import { CanActivateEmLogin } from './auth/employee/employee-nologged.guard';
import { CanEmployeeLogged } from './auth/employee/employee-logged.guard';
import { ResetPasswordComponent } from './portal/employee/reset-password/reset-password.component'; 
import { CustomerComponent } from './portal/employee/sales/customer/customer.component';
import { QuotationComponent } from './portal/employee/sales/quotation/quotation.component';
import { SalesOrderComponent } from './portal/employee/sales/sales-order/sales-order.component';
import { AddQuotationComponent } from './portal/employee/sales/add-quotation/add-quotation.component';
import { SupplierComponent } from './portal/employee/purchase/supplier/supplier.component';
import { EvaluationComponent } from './portal/employee/purchase/evaluation/evaluation.component';
import { PurchaseOrderComponent } from './portal/employee/purchase/purchase-order/purchase-order.component';
import { AddPoComponent } from './portal/employee/purchase/add-po/add-po.component';
import { PurchaseHistoryComponent } from './portal/employee/purchase/purchase-history/purchase-history.component';
import { InvoicingComponent } from './portal/employee/accounting/invoicing/invoicing.component';
import { FinancialTransactionComponent } from './portal/employee/accounting/financial-transaction/financial-transaction.component';
import { FinancialReportComponent } from './portal/employee/accounting/financial-report/financial-report.component';
import { InvoiceDetailsComponent } from './portal/employee/accounting/invoice-details/invoice-details.component';
import { ShipmentHistoryComponent } from './portal/employee/shipment/shipment-history/shipment-history.component';
import { PaymentComponent } from './portal/employee/accounting/payment/payment.component';
import { SuccessComponent } from './portal/employee/success/success.component';
import { SalesAnalysisComponent } from './portal/employee/sales/sales-analysis/sales-analysis.component';
import { ClientPoComponent } from './portal/employee/sales/client-po/client-po.component';
import { VideoChatComponent } from './layouts/video-chat/video-chat.component';
import { ChatComponent } from './layouts/chat/chat.component';
import { MessageComponent } from './layouts/message/message.component';
import { SuccessPaymentComponent } from './portal/employee/accounting/success-payment/success-payment.component';
import { NotFoundComponent } from './layouts/not-found/not-found.component';
import { ExcelComponent } from './layouts/excel/excel.component';
import { AdminRouterComponent } from './portal/admin/admin-router.component';
import { dashboardResolverResolver } from './service/dashboard/dashboard-resolver.resolver';
import { profileResolver } from './service/profile/profile.resolver';


const routes: Routes = [
  { path: '', redirectTo: '/employee-login', pathMatch: 'full' },
 
  {path: 'employee-login' , loadChildren: () => import('./portal/employee/employeelogin/employee-login/employee-login.module').then( m => m.EmployeeLoginModule)},


  {path: 'admin-login' , loadChildren: () => import('./portal/admin/adminlogin/admin-login/admin-login.module').then( m => m.AdminLoginModule) },

  {
    path: 'admin',
    component: AdminRouterComponent, 
    children: [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {path: 'portal' , loadChildren: () => import('./portal/admin/admin-portal/admin-portal.module').then( m => m.AdminPortalModule)   },
  {path: 'dashboard' , loadChildren: () => import('./portal/admin/dashboard/ad-dashboard/ad-dashboard.module').then( m => m.AdDashboardModule) }, 
  {path: 'employee' , loadChildren: () => import('./portal/admin/employee/ad-employee/ad-employee.module').then( m => m.AdEmployeeModule)   },
  {path: 'product' , loadChildren: () => import('./portal/admin/product/ad-product/ad-product.module').then( m => m.AdProductModule)    },
  {path: 'category' , loadChildren: () => import('./portal/admin/category/ad-category/ad-category.module').then( m => m.AdCategoryModule) },
  {path: 'admin-user' , loadChildren: () => import('./portal/admin/admin-user/ad-user/ad-user.module').then( m => m.AdUserModule)  },
  { path: 'article', loadChildren: () => import('./portal/admin/article/article.module').then(m => m.ArticleModule) },
  
    ]
  },

  {
    path: 'portal',
    children: [

  { path: 'dashboard' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule),  resolve: {profileData: profileResolver}},

  {
    path: 'sales',
    children: [

  // { path: 'sales' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'customer' , loadChildren: () => import('./portal/employee/sales/customer/customer.module').then( m => m.CustomerModule) },
  { path: 'quotations' , loadChildren: () => import('./portal/employee/sales/quotation/quotation.module').then( m => m.QuotationModule) },
  { path: 'quotations/:id' , loadChildren: () => import('./portal/employee/sales/add-quotation/add-quotation.module').then( m => m.AddQuotationModule) },
  { path: 'sales-order' , loadChildren: () => import('./portal/employee/sales/sales-order/sales-order.module').then( m => m.SalesOrderModule)  },
  { path: 'sales-order/:id' , loadChildren: () => import('./portal/employee/sales/client-po/client-po.module').then( m => m.ClientPoModule) },
  { path: 'sales-analysis' , loadChildren: () => import('./portal/employee/sales/sales-analysis/sales-analysis.module').then( m => m.SalesAnalysisModule) },
 
    ]
  },

  // { path: 'purchase' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  
  {
    path: 'purchase',
    children: [

  { path: 'supplier' , loadChildren: () => import('./portal/employee/purchase/supplier/supplier.module').then( m => m.SupplierModule) },
  { path: 'purchase-order' , loadChildren: () => import('./portal/employee/purchase/purchase-order/purchase-order.module').then( m => m.PurchaseOrderModule) },

  { path: 'purchase-order/:id' , loadChildren: () => import('./portal/employee/purchase/add-po/add-po.module').then( m => m.AddPoModule)  },
  { path: 'purchase-history' , loadChildren: () => import('./portal/employee/purchase/purchase-history/purchase-history.module').then( m => m.PurchaseHistoryModule) },

    ]
  },

  {
    path: 'warehouse',
    children: [
  // { path: 'warehouse' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'inventory-list' , loadChildren: () => import('./portal/employee/warehouse/inventory-list/inventory-list.module').then( m => m.InventoryListModule) },

    ]
  },

  {
    path: 'shipment',
    children: [
  
  // { path: 'shipment' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'shipment-history' , loadChildren: () => import('./portal/employee/shipment/shipment-history/shipment-history.module').then( m => m.ShipmentHistoryModule) },
    ]

  },

  {
    path: 'accounting',
    children: [

  // { path: 'accounting' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'invoicing' , loadChildren: () => import('./portal/employee/accounting/invoicing/invoicing.module').then( m => m.InvoicingModule)},
  { path: 'invoicing/:id' , loadChildren: () => import('./portal/employee/accounting/invoice-details/invoice-details.module').then( m => m.InvoiceDetailsModule) },
  { path: 'financial-transaction' , loadChildren: () => import('./portal/employee/accounting/financial-transaction/financial-transaction.module').then( m => m.FinancialTransactionModule)  },
  { path: 'financial-reports' , component: FinancialReportComponent, canActivate: [CanEmployeeLogged] },
  { path: 'financial-transaction/:id' , loadChildren: () => import('./portal/employee/accounting/payment/payment.module').then( m => m.PaymentModule) },
  
    ]

  },
  //{ path: 'success' , component: SuccessComponent,  canActivate:  [CanEmployeeLogged] },

  { path: 'profile' , loadChildren: () => import('./portal/employee/profile/profile/em-profile.module').then( m => m.EmProfileModule) },
 
  
  { path: 'video-conference' , loadChildren: () => import('./layouts/video-chat/video-chat.module').then( m => m.VideoChatModule)  },

  { path: 'messenger', loadChildren: () => import('./layouts/message/message.module').then( m => m.MessageModule) },

  { path: 'success' , component: SuccessPaymentComponent, canActivate: [CanEmployeeLogged] },
 
    ]

  },
  { path: 'reset-password' , loadChildren: () => import('./portal/employee/reset-password/reset-password.module').then( m => m.ResetPasswordModule) },
  { path: '**', component: NotFoundComponent, canActivate: [CanEmployeeLogged] },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
