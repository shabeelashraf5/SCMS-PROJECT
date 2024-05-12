import { Component, OnInit, OnDestroy } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';
import { AddPo } from '../../../../model/purchase-addpo.model';
import { Invoice } from '../../../../model/invoice.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
import { Subscription, firstValueFrom } from 'rxjs';
import { AddQuotation } from '../../../../model/sales-addquo';
import { Po } from '../../../../model/purchase-po.model';
import { OrderStatus } from '../../../../enums/order-status.enum';
import { PayStatus } from '../../../../enums/pay-status.enum';
import { response } from 'express';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {

  purchaseDetails: AddPo[] = []

  _id!: string; 
  employee_id: string = ''
  confirmedPurchase: Set<string> = new Set();
  purchaseHistorySubscription!: Subscription
 
  
  constructor(private purchaseHistoryService :  PurchaseHistoryService, private snackBar: MatSnackBar, private router: Router  ) { }

  ngOnInit() {

    this.loadConfirmedPurchase()
    this.getClientDetails(); 

  }

/*
async getClientDetails() {
  try {
    const response = await firstValueFrom(this.purchaseHistoryService.getpurchase());
    this.purchaseDetails = response;
    console.log(this.purchaseDetails);
  } catch (error) {
    console.error('Error fetching client purchase details:', error);
  }
} */

getClientDetails(){

  this.purchaseHistorySubscription = this.purchaseHistoryService.getpurchase().subscribe({
    next: (response) =>{
      this.purchaseDetails = response;
       console.log(this.purchaseDetails);
    },
    error: (error) =>{
      console.error('Error fetching client purchase details:', error);
    }
  })


}

loadConfirmedPurchase() {
  const storedPurchase = localStorage.getItem('confirmedQuotations');
  if (storedPurchase) {
    const parsedPurchase = JSON.parse(storedPurchase);
    this.confirmedPurchase = new Set(parsedPurchase);
  }
}

/*
  async createInv(purchaseId: string) {

    if (this.confirmedPurchase.has(purchaseId)) {
      return; 
    }
  
    console.log('purchaseId:', purchaseId);

    const newInv: Invoice = {
      _id: '',
      employee_id: this.employee_id,
      purchase_id: purchaseId as unknown as AddPo,
      invoice: '',
      delivery: '',
      transaction: '',
      payment: PayStatus.NOTPAID,
      status: OrderStatus.PENDING
    };

    console.log(newInv);

    try {
      const response = await firstValueFrom(this.purchaseHistoryService.addInv(newInv));
      console.log(response);

      await this.getClientDetails(); // Await this function to ensure completion before proceeding
      this.confirmedPurchase.add(purchaseId);  // Mark this quotation as confirmed
      localStorage.setItem('confirmedQuotations', JSON.stringify([...this.confirmedPurchase]));
      this.openSnackBar('Purchase Confirmed');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
  }
*/

createInv(purchaseId: string) {

  if (this.confirmedPurchase.has(purchaseId)) {
    return; 
  }

  console.log('purchaseId:', purchaseId);

  const newInv: Invoice = {
    _id: '',
    employee_id: this.employee_id,
    purchase_id: purchaseId as unknown as AddPo,
    invoice: '',
    delivery: '',
    transaction: '',
    payment: PayStatus.NOTPAID,
    status: OrderStatus.PENDING
  };

  console.log(newInv);

  this.purchaseHistorySubscription = this.purchaseHistoryService.addInv(newInv).subscribe({
    next: (response) => {
      this.getClientDetails(); 
      this.confirmedPurchase.add(purchaseId); 
      localStorage.setItem('confirmedQuotations', JSON.stringify([...this.confirmedPurchase]));
      this.openSnackBar('Purchase Confirmed');

    },error: (error) => {
      console.error('Error creating invoice:', error);
    }
  })

}


  getPo(po: Po): string {
    return po.po || '';
  }

  getSrfq(quotation: AddQuotation): string {
    return quotation.salesRFQ_id?.srfq || '';
  }


  getResponsible(detail: AddPo): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  
  }

  trackByPurchaseHistory(index: number, purchasehistory: AddPo): string {
    return purchasehistory._id 
  }
  

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

  ngOnDestroy() {
    if(this.purchaseHistorySubscription){
      this.purchaseHistorySubscription.unsubscribe()
    }
  }


}
