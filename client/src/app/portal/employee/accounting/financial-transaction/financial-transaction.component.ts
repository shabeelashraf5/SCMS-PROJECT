import { Component } from '@angular/core';
import { FinancialTransactionService } from './financial-transaction.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../../../../model/invoice.model';
import { AddQuotation } from '../../../../model/sales-addquo';

@Component({
  selector: 'app-financial-transaction',
  templateUrl: './financial-transaction.component.html',
  styleUrl: './financial-transaction.component.css'
})
export class FinancialTransactionComponent {

  invDetails: Invoice[] = [];

  _id!: string; 
  employee_id: string = ''
  purchase_id: string =''
  errorMessage: string = '';


  constructor(private transactionService: FinancialTransactionService, private router: Router) { }

  ngOnInit() {
    this. getTransactionDetails(); 

  }

  async getTransDetail(_id: string) {
    try {
      await firstValueFrom( this.transactionService.transSingle(_id));
      this.router.navigate(['/portal/accounting/financial-transaction', _id]);
    } catch (error) {
      console.error('Error fetching transaction detail:', error);
    }
  }

  

async  getTransactionDetails() {
  try {
    const response = await firstValueFrom(
      this.transactionService.getTrans()
    );
    this.invDetails = response; // Store the fetched RFQ details
    console.log(this.invDetails);
  } catch (error) {
    console.error(error);

    if (error instanceof HttpErrorResponse && error.status === 403) {
      this.errorMessage = 'You are not authorized to access this page.';
    } else {
      this.errorMessage = 'An error occurred while fetching data.';
    }
  }
}


  getAmount(detail: Invoice): number {
    if (detail && detail.purchase_id  ) {
      return detail.purchase_id.totalAmount; 
    }
    return 0;
  }

  
  getPO(detail: Invoice): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.po) {
      return detail.purchase_id.po_id.po; 
    }
    return '';
  }


  getSupplier(detail: Invoice): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.to; 
    }
    return '';
  }

  getSRFQ(detail: Invoice): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id && detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }
  

  getResponsible(detail: Invoice): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }

  trackByFT(index: number, financialtrans: Invoice): string {
    return financialtrans._id 
  }


}
