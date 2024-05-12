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


  constructor(private purchaseService:PurchaseOrderService, private router: Router) { }

  ngOnInit() {
    this.getPoDetails(); 

  }

/*
async getPoDetails() {
  try {
    const response = await firstValueFrom(this.purchaseService.getPo());
    this.poDetails = response; // Store the fetched PO details
    console.log(this.poDetails);
  } catch (error) {
    console.error('Error fetching PO details:', error);
  }
} */

getPoDetails() {

  this.purchaseOrderSubscription = this.purchaseService.getPo().subscribe({
    next: (response) =>{
      this.poDetails = response; 
      console.log(this.poDetails);
    },
    error: (error) =>{
      console.error('Error fetching PO details:', error);
    }
  })
}

/*
  async getPurchaseDetail(_id: string) {
    try {
      const data = await firstValueFrom(this.purchaseService.poSingle(_id));
      // Navigate to AddQuotationComponent with the ID parameter
      this.router.navigate(['/portal/purchase/purchase-order', _id]);
    } catch (error) {
      console.error('Error fetching quotation detail:', error);
    }
  } */

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

}
