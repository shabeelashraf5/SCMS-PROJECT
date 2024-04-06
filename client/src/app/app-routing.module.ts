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


const routes: Routes = [
  { path: '', redirectTo: '/employee-login', pathMatch: 'full' },
  {path: 'employee-login' , component: EmployeeLoginComponent,  canActivate: [CanActivateEmLogin]},

  {path: 'admin' , component: AdminLoginComponent ,  canActivate: [CanActivateLogin]  },
  {path: 'admin/portal' , component: AdminPortalComponent, canActivate: [CanAdminLogged]   },
  {path: 'admin/dashboard' , component: AdDashboardComponent, canActivate: [CanAdminLogged]   }, 
  {path: 'admin/employee' , component: AdEmployeeComponent,  canActivate: [CanAdminLogged]   },
  {path: 'admin/product' , component: AdProductComponent, canActivate: [CanAdminLogged]    },
  {path: 'admin/category' , component: AdCategoryComponent,  canActivate: [CanAdminLogged]  },
  {path: 'admin/admin-user' , component: AdUserComponent, canActivate: [CanAdminLogged]   },


  
  { path: 'dashboard' , component: EmDashboardComponent,  canActivate: [CanEmployeeLogged] },

  { path: 'sales' , component: EmDashboardComponent, canActivate: [CanEmployeeLogged] },
  { path: 'sales/customer' , component: CustomerComponent, canActivate: [CanEmployeeLogged] },
  { path: 'sales/quotations' , component: QuotationComponent, canActivate: [CanEmployeeLogged] },
  { path: 'sales/quotations/:id' , component: AddQuotationComponent, canActivate: [CanEmployeeLogged] },
  { path: 'sales/sales-order' , component: SalesOrderComponent, canActivate: [CanEmployeeLogged] },
  { path: 'sales/sales-order/:id' , component:  ClientPoComponent , canActivate: [CanEmployeeLogged] },
  { path: 'sales/sales-analysis' , component: SalesAnalysisComponent, canActivate: [CanEmployeeLogged] },
 


  { path: 'purchase' , component: EmDashboardComponent, canActivate: [CanEmployeeLogged] },
  { path: 'purchase/supplier' , component: SupplierComponent, canActivate: [CanEmployeeLogged] },
  { path: 'purchase/purchase-order' , component: PurchaseOrderComponent, canActivate: [CanEmployeeLogged] },
  { path: 'purchase/vendor-evaluation' , component: EvaluationComponent, canActivate: [CanEmployeeLogged] },
  { path: 'purchase/purchase-order/:id' , component: AddPoComponent, canActivate: [CanEmployeeLogged] },
  { path: 'purchase/purchase-history' , component: PurchaseHistoryComponent , canActivate: [CanEmployeeLogged] },

  { path: 'warehouse' , component: EmDashboardComponent, canActivate: [CanEmployeeLogged] },
  { path: 'warehouse/inventory-list' , component: InventoryListComponent, canActivate: [CanEmployeeLogged] },

  { path: 'shipment' , component: EmDashboardComponent, canActivate: [CanEmployeeLogged] },
  { path: 'shipment/shipment-history' , component: ShipmentHistoryComponent, canActivate: [CanEmployeeLogged] },

  { path: 'accounting' , component: EmDashboardComponent, canActivate: [CanEmployeeLogged] },
  { path: 'accounting/invoicing' , component: InvoicingComponent, canActivate: [CanEmployeeLogged] },
  { path: 'accounting/invoicing/:id' , component: InvoiceDetailsComponent, canActivate: [CanEmployeeLogged] },
  { path: 'accounting/financial-transaction' , component: FinancialTransactionComponent, canActivate: [CanEmployeeLogged] },
  { path: 'accounting/financial-reports' , component: FinancialReportComponent, canActivate: [CanEmployeeLogged] },
  { path: 'accounting/financial-transaction/:id' , component: PaymentComponent, canActivate: [CanEmployeeLogged] },
  
  { path: 'success' , component: SuccessComponent,  canActivate:  [CanEmployeeLogged] },

  { path: 'profile' , component: ProfileComponent,  canActivate:  [CanEmployeeLogged] },
  { path: 'reset-password' , component: ResetPasswordComponent,  },
  
  { path: 'video-conference' , component: VideoChatComponent,  canActivate:  [CanEmployeeLogged] },

  { path: 'messenger', component: MessageComponent,  canActivate:  [CanEmployeeLogged] },

  { path: 'chat', component: ChatComponent,  canActivate:  [CanEmployeeLogged] }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
