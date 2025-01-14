import { Component, EventEmitter, Output , OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd  } from '@angular/router';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from '../../../../portal/employee/profile/profile/profile.service';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom, Subscription } from 'rxjs';

import { EmployeeLoginService } from '../../../../portal/employee/employeelogin/employee-login/employee-login.service';
import { io, Socket } from 'socket.io-client';
import { OnlineStatus } from '../../../../enums/online-status.enum';
import { response } from 'express';



@Component({
  selector: 'app-employee-nb',
  templateUrl: './employee-nb.component.html',
  styleUrl: './employee-nb.component.css'
})
export class EmployeeNbComponent implements OnInit, OnDestroy  {

  @Output() sidebarUpdate: EventEmitter<string> = new EventEmitter<string>();

  employeeProfile!: Employee;
  employee: Employee[] =[]
  isImageSelected: boolean = false;
  socket!: Socket;
  emSubscription!: Subscription
  isNavbarOpen: boolean = false
  sidebarItems : string[] = [];
  isSidebarVisible: boolean = true;

  isSidebarOpen: boolean = false

  closeDrawer : boolean = false
  showFooter: boolean = true;
  isSalesDropdownOpen = false;
  isPurchaseDropdownOpen = false;
  isAccountingDropdownOpen = false;

  constructor(private pService: ProfileService, private authService: EmployeeLoginService, private router: Router ) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const hiddenRoutes= [
          '/portal/dashboard',
          '/portal/messenger'
        ];

        this.isSidebarVisible = !hiddenRoutes.includes(event.urlAfterRedirects);
      }
    });
    
  }


  ngOnInit(): void {
    this.loadProfile();
    this.updateSidebarItems();

    this.socket = io( environment.apiUrl + '/user-namespace');
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
      
  }

  loadProfile() {

    this.emSubscription = this.pService.getProfile().subscribe({
      next: (response) => {
        this.employeeProfile = response;
      },error: (error) => {
        console.error('Error fetching employee profile:', error);
      }

    })
  }


  getImageUrl(imageFileName: string): string {
    return environment.apiUrl + `/images/${imageFileName}`; 
  }


  updateSidebar(section: string) {
    this.sidebarUpdate.emit(section);
  }



logout() {
  let employeeId = this.authService.getLoggedInEmployeeId();

  if (employeeId ) {
    this.emSubscription = this.authService.logout(employeeId).subscribe({
      next: (response) => {
        this.socket.disconnect();
        this.router.navigate(['/employee-login']);
      },
      error: (error) => {
      }
    });
  } else {
    console.error('Employee ID is null');
  }
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
          case '/portal/accounting/financial-reports':
       
      this.sidebarItems = ['Invoicing', 'Financial Transaction', 'Sales Reports' ];
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
    case 'Sales Reports':
      return '/portal/accounting/financial-reports';
    default:
      return '/';
  }
}

trackBysideBar(index: number, sidebar: string): string {
  return sidebar;
}


// viewSidebar(): void {
//   this.isNavbarOpen = !this.isNavbarOpen;

// }

// toggleSidebar(): void {
//   this.isSidebarOpen = !this.isSidebarOpen;

// }

toggleNavbar(): void {
  this.isNavbarOpen = !this.isNavbarOpen;
}

toggleSalesDropdown() {
  this.isSalesDropdownOpen = !this.isSalesDropdownOpen;
}

togglePurchaseDropdown() {
  this.isPurchaseDropdownOpen = !this.isPurchaseDropdownOpen;
}

toggleAccountingDropdown() {
  this.isAccountingDropdownOpen = !this.isAccountingDropdownOpen;
}


ngOnDestroy() {

  if(this.emSubscription){
    this.emSubscription.unsubscribe()
  }
  
}
  

}

