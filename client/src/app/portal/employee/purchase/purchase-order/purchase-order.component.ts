import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseOrderService } from './purchase-order.service';
import { Router } from '@angular/router';
import { Invoice } from '../../../../model/invoice.model';
import { Subscription, firstValueFrom } from 'rxjs';
import { Po } from '../../../../model/purchase-po.model';
import { Quotation } from '../../../../model/sales-quotation.model';
import { AddQuotation } from '../../../../model/sales-addquo';
import { response } from 'express';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent implements OnInit, OnDestroy {


  poDetails: Po[] = []

  _id!: string; 
  employee_id: string = ''
  purchaseOrderSubscription!: Subscription
  filteredEmployees: Po[] = [];
  searchQuery: string = '';

  
  currentPage: number = 1;
  itemsPerPage: number = 10;


  constructor(private purchaseService:PurchaseOrderService, private router: Router) { }

  ngOnInit() {
    this.getPoDetails(); 

  }



getPoDetails() {

  this.purchaseOrderSubscription = this.purchaseService.getPo().subscribe({
    next: (response) =>{
      this.poDetails = response; 
      this.filteredEmployees = response
      console.log(this.poDetails);
    },
    error: (error) =>{
      console.error('Error fetching PO details:', error);
    }
  })
}



  getPurchaseDetail(_id: string) {

    this.purchaseOrderSubscription = this.purchaseService.poSingle(_id).subscribe({
      next: (response) =>{
        this.router.navigate(['/portal/purchase/purchase-order', _id]);
      },error: (error) => {
        console.error('Error fetching quotation detail:', error);
      }
    })
  }



getSpo(rfqId: AddQuotation): string {
  return rfqId.spo || '';
}

getSrfq(quotation: AddQuotation): string {
  return quotation.salesRFQ_id?.srfq || '';
}


getResponsible(detail: Po): string {
  if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
    return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
  }
  return 'Unknown';
}

trackByPurchaseOrder(index: number, purchaseorder: Po): string {
  return purchaseorder._id 
}

ngOnDestroy() {

  if(this.purchaseOrderSubscription){
    this.purchaseOrderSubscription.unsubscribe()
  } 
}

filterEmployees() {
  const query = this.searchQuery.toLowerCase();
  this.filteredEmployees = this.poDetails.filter(emp => 
    emp.po.toLowerCase().includes(query) 
  );
  this.currentPage = 1;
}





}
