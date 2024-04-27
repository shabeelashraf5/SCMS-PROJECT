import { Component } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';
import { AddPo } from '../../../../model/purchase-addpo.model';
import { Invoice } from '../../../../model/invoice.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
import { firstValueFrom } from 'rxjs';
import { AddQuotation } from '../../../../model/sales-addquo';
import { Po } from '../../../../model/purchase-po.model';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {

  purchaseDetails: AddPo[] = []

  _id!: string; 
  employee_id: string = ''
 
  
  constructor(private purchaseHistoryService :  PurchaseHistoryService, private snackBar: MatSnackBar, private router: Router  ) { }

  ngOnInit() {

    this.getClientDetails(); 

  }


async getClientDetails() {
  try {
    const response = await firstValueFrom(this.purchaseHistoryService.getpurchase());
    this.purchaseDetails = response;
    console.log(this.purchaseDetails);
  } catch (error) {
    console.error('Error fetching client purchase details:', error);
  }
}


  async createInv(purchaseId: string) {
    console.log('purchaseId:', purchaseId);

    const newInv: Invoice = {
      _id: '',
      employee_id: this.employee_id,
      purchase_id: purchaseId as unknown as AddPo,
      invoice: '',
      delivery: '',
      transaction: '',
      payment: 'to be Paid',
      status: 'not confirmed'
    };

    console.log(newInv);

    try {
      const response = await firstValueFrom(this.purchaseHistoryService.addInv(newInv));
      console.log(response);

      await this.getClientDetails(); // Await this function to ensure completion before proceeding
      this.openSnackBar('Purchase Confirmed');
    } catch (error) {
      console.error('Error creating invoice:', error);
    }
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }


}
