import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeLoginService } from '../../../../portal/employee/employeelogin/employee-login/employee-login.service';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../../environment/environment';


@Component({
  selector: 'app-employee-sb',
  templateUrl: './employee-sb.component.html',
  styleUrl: './employee-sb.component.css'
})
export class EmployeeSbComponent implements OnInit {

  sidebarItems : string[] = [];
  socket!: Socket;

  constructor(private authService: EmployeeLoginService, private router: Router ) { }

  ngOnInit(): void {
    this.updateSidebarItems();

    this.socket = io( environment.apiUrl + '/user-namespace');
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

  }

  updateSidebarItems() {
    const currentRoute = this.router.url;
    switch(currentRoute) {
      case '/portal/sales':
        case '/portal/sales/customer':
          case '/portal/sales/quotations':
            case '/portal/sales/sales-order':
              case '/portal/sales/sales-analysis':
        this.sidebarItems = ['Customer', 'Quotations', 'Sales Order', 'Sales Analysis'];
        break;
      case '/portal/purchase':
        case '/portal/purchase/supplier':
          case '/portal/purchase/purchase-order':
            case '/portal/purchase/vendor-evaluation':
              case '/portal/purchase/purchase-history':
        this.sidebarItems = ['Supplier', 'Purchase Order', 'Purchase History'];
        break;
      case '/portal/warehouse':
        case '/portal/warehouse/inventory-list':
        this.sidebarItems = ['Inventory List'];
        break;
      case '/portal/shipment':
        case '/portal/shipment/shipment-history':
        this.sidebarItems = ['Shipment History'];
        break;
      case '/portal/accounting':
        case '/portal/accounting/invoicing':
          case '/portal/accounting/financial-transaction':
           // case '/portal/accounting/financial-reports':
         
        this.sidebarItems = ['Invoicing', 'Financial Transaction' ];
        break;
      default:
        this.sidebarItems = [];
    }
  }



  getRoute(item: string): string {
    switch (item) {
      case 'Customer':
        return '/portal/sales/customer';
      case 'Quotations':
        return '/portal/sales/quotations';
      case 'Sales Order':
        return '/portal/sales/sales-order';
      case 'Sales Analysis':
        return '/portal/sales/sales-analysis';
      case 'Supplier':
        return '/portal/purchase/supplier';
      case 'Purchase Order':
        return '/portal/purchase/purchase-order';
      case 'Purchase History':
        return '/portal/purchase/purchase-history';
      case 'Vendor Evaluation':
        return '/portal/purchase/vendor-evaluation';
      case 'Inventory List':
        return '/portal/warehouse/inventory-list';
      case 'Shipment History':
        return '/portal/shipment/shipment-history';
      case 'Invoicing':
        return '/portal/accounting/invoicing';
      case 'Financial Transaction':
        return '/portal/accounting/financial-transaction';
      case 'Financial Reports':
        return '/portal/accounting/financial-reports';
      default:
        return '/';
    }
  }

  trackBysideBar(index: number, sidebar: string): string {
    return sidebar;
  }


  logout(): void {
    
    let employeeId =  this.authService.getLoggedInEmployeeId()
    
    if (employeeId) {
      this.authService.logout(employeeId);
    } else {
      console.error('EmployeeId is null or undefined');
    }

    this.socket.disconnect();
    this.router.navigate(['/employee-login']);

  
}



}
