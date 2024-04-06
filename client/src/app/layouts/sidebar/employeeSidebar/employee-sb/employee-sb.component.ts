import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeLoginService } from '../../../../portal/employee/employeelogin/employee-login/employee-login.service';
import io from 'socket.io-client';



@Component({
  selector: 'app-employee-sb',
  templateUrl: './employee-sb.component.html',
  styleUrl: './employee-sb.component.css'
})
export class EmployeeSbComponent implements OnInit {

  sidebarItems : string[] = [];
  socket: any;

  constructor(private authService: EmployeeLoginService, private router: Router ) { }

  ngOnInit(): void {
    this.updateSidebarItems();

    this.socket = io('http://localhost:3000/user-namespace');
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });

  }

  updateSidebarItems() {
    const currentRoute = this.router.url;
    switch(currentRoute) {
      case '/sales':
        case '/sales/customer':
          case '/sales/quotations':
            case '/sales/sales-order':
              case '/sales/sales-analysis':
        this.sidebarItems = ['Customer', 'Quotations', 'Sales Order', 'Sales Analysis'];
        break;
      case '/purchase':
        case '/purchase/supplier':
          case '/purchase/purchase-order':
            case '/purchase/vendor-evaluation':
              case '/purchase/purchase-history':
        this.sidebarItems = ['Supplier', 'Purchase Order', 'Purchase History'];
        break;
      case '/warehouse':
        case '/warehouse/inventory-list':
        this.sidebarItems = ['Inventory List'];
        break;
      case '/shipment':
        case '/shipment/shipment-history':
        this.sidebarItems = ['Shipment History'];
        break;
      case '/accounting':
        case '/accounting/invoicing':
          case '/accounting/financial-transaction':
           // case '/accounting/financial-reports':
         
        this.sidebarItems = ['Invoicing', 'Financial Transaction' ];
        break;
      default:
        this.sidebarItems = [];
    }
  }



  getRoute(item: string): string {
    switch (item) {
      case 'Customer':
        return '/sales/customer';
      case 'Quotations':
        return '/sales/quotations';
      case 'Sales Order':
        return '/sales/sales-order';
      case 'Sales Analysis':
        return '/sales/sales-analysis';
      case 'Supplier':
        return '/purchase/supplier';
      case 'Purchase Order':
        return '/purchase/purchase-order';
      case 'Purchase History':
        return '/purchase/purchase-history';
      case 'Vendor Evaluation':
        return '/purchase/vendor-evaluation';
      case 'Inventory List':
        return '/warehouse/inventory-list';
      case 'Shipment History':
        return '/shipment/shipment-history';
      case 'Invoicing':
        return '/accounting/invoicing';
      case 'Financial Transaction':
        return '/accounting/financial-transaction';
      case 'Financial Reports':
        return '/accounting/financial-reports';
      default:
        return '/';
    }
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
