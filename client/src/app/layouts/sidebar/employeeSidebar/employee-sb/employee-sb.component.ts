import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-sb',
  templateUrl: './employee-sb.component.html',
  styleUrl: './employee-sb.component.css'
})
export class EmployeeSbComponent implements OnInit {

  sidebarItems : string[] = [];

  constructor(private router: Router ) { }

  ngOnInit(): void {
    this.updateSidebarItems();
  }

  updateSidebarItems() {
    const currentRoute = this.router.url;
    switch(currentRoute) {
      case '/sales':
        this.sidebarItems = ['Customer', 'Quotations', 'Sales Order', 'Sales Analysis'];
        break;
      case '/purchase':
        this.sidebarItems = ['Supplier', 'Purchase Order', 'Vendor Evaluation'];
        break;
      case '/warehouse':
        this.sidebarItems = ['Inventory List'];
        break;
      case '/shipment':
        this.sidebarItems = ['Shipment History'];
        break;
      case '/accounting':
        this.sidebarItems = ['Invoicing', 'Financial Transaction', 'Financial Reports'];
        break;
      default:
        this.sidebarItems = [];
    }
  }



}
