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




const routes: Routes = [
  { path: '', redirectTo: '/employee-login', pathMatch: 'full' },
 
  {path: 'employee-login' , loadChildren: () => import('./portal/employee/employeelogin/employee-login/employee-login.module').then( m => m.EmployeeLoginModule)},

  {path: 'admin' , loadChildren: () => import('./portal/admin/adminlogin/admin-login/admin-login.module').then( m => m.AdminLoginModule) },
  {path: 'admin/portal' , loadChildren: () => import('./portal/admin/admin-portal/admin-portal.module').then( m => m.AdminPortalModule)   },
  {path: 'admin/dashboard' , loadChildren: () => import('./portal/admin/dashboard/ad-dashboard/ad-dashboard.module').then( m => m.AdDashboardModule)}, 
  {path: 'admin/employee' , loadChildren: () => import('./portal/admin/employee/ad-employee/ad-employee.module').then( m => m.AdEmployeeModule)   },
  {path: 'admin/product' , loadChildren: () => import('./portal/admin/product/ad-product/ad-product.module').then( m => m.AdProductModule)    },
  {path: 'admin/category' , loadChildren: () => import('./portal/admin/category/ad-category/ad-category.module').then( m => m.AdCategoryModule) },
  {path: 'admin/admin-user' , loadChildren: () => import('./portal/admin/admin-user/ad-user/ad-user.module').then( m => m.AdUserModule)  },


  { path: 'portal/dashboard' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },

  { path: 'portal/sales' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'portal/sales/customer' , loadChildren: () => import('./portal/employee/sales/customer/customer.module').then( m => m.CustomerModule) },
  { path: 'portal/sales/quotations' , loadChildren: () => import('./portal/employee/sales/quotation/quotation.module').then( m => m.QuotationModule) },
  { path: 'portal/sales/quotations/:id' , loadChildren: () => import('./portal/employee/sales/add-quotation/add-quotation.module').then( m => m.AddQuotationModule) },
  { path: 'portal/sales/sales-order' , loadChildren: () => import('./portal/employee/sales/sales-order/sales-order.module').then( m => m.SalesOrderModule)  },
  { path: 'portal/sales/sales-order/:id' , loadChildren: () => import('./portal/employee/sales/client-po/client-po.module').then( m => m.ClientPoModule) },
  { path: 'portal/sales/sales-analysis' , loadChildren: () => import('./portal/employee/sales/sales-analysis/sales-analysis.module').then( m => m.SalesAnalysisModule) },
 

  { path: 'portal/purchase' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },

  { path: 'portal/purchase/supplier' , loadChildren: () => import('./portal/employee/purchase/supplier/supplier.module').then( m => m.SupplierModule) },
  { path: 'portal/purchase/purchase-order' , loadChildren: () => import('./portal/employee/purchase/purchase-order/purchase-order.module').then( m => m.PurchaseOrderModule) },
  //{ path: 'portal/purchase/vendor-evaluation' , component: EvaluationComponent, canActivate: [CanEmployeeLogged] },
  { path: 'portal/purchase/purchase-order/:id' , loadChildren: () => import('./portal/employee/purchase/add-po/add-po.module').then( m => m.AddPoModule)  },
  { path: 'portal/purchase/purchase-history' , loadChildren: () => import('./portal/employee/purchase/purchase-history/purchase-history.module').then( m => m.PurchaseHistoryModule) },


  { path: 'portal/warehouse' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'portal/warehouse/inventory-list' , loadChildren: () => import('./portal/employee/warehouse/inventory-list/inventory-list.module').then( m => m.InventoryListModule) },

  
  { path: 'portal/shipment' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'portal/shipment/shipment-history' , loadChildren: () => import('./portal/employee/shipment/shipment-history/shipment-history.module').then( m => m.ShipmentHistoryModule) },


  { path: 'portal/accounting' , loadChildren: () => import('./portal/employee/dashboard/em-dashboard/em-dashboard.module').then(m => m.EmDashboardModule) },
  { path: 'portal/accounting/invoicing' , loadChildren: () => import('./portal/employee/accounting/invoicing/invoicing.module').then( m => m.InvoicingModule)},
  { path: 'portal/accounting/invoicing/:id' , loadChildren: () => import('./portal/employee/accounting/invoice-details/invoice-details.module').then( m => m.InvoiceDetailsModule) },
  { path: 'portal/accounting/financial-transaction' , loadChildren: () => import('./portal/employee/accounting/financial-transaction/financial-transaction.module').then( m => m.FinancialTransactionModule)  },
  { path: 'portal/accounting/financial-reports' , component: FinancialReportComponent, canActivate: [CanEmployeeLogged] },
  { path: 'portal/accounting/financial-transaction/:id' , loadChildren: () => import('./portal/employee/accounting/payment/payment.module').then( m => m.PaymentModule) },
  
  //{ path: 'success' , component: SuccessComponent,  canActivate:  [CanEmployeeLogged] },

  { path: 'portal/profile' , loadChildren: () => import('./portal/employee/profile/profile/em-profile.module').then( m => m.EmProfileModule) },
 
  { path: 'reset-password' , loadChildren: () => import('./portal/employee/reset-password/reset-password.module').then( m => m.ResetPasswordModule) },
  
  { path: 'portal/video-conference' , loadChildren: () => import('./layouts/video-chat/video-chat.module').then( m => m.VideoChatModule)  },

  { path: 'portal/messenger', loadChildren: () => import('./layouts/message/message.module').then( m => m.MessageModule) },

  { path: 'portal/success' , component: SuccessPaymentComponent, canActivate: [CanEmployeeLogged] },

  { path: '**', component: NotFoundComponent, canActivate: [CanEmployeeLogged] },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
