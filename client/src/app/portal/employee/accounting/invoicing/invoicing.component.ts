import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicingService } from './invoicing.service';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../../../../model/invoice.model';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrl: './invoicing.component.css'
})
export class InvoicingComponent implements OnInit  {

  invDetails: Invoice[] = []

  _id!: string; 
  employee_id: string = ''
  purchase_id: string =''
  errorMessage: string = '';



  constructor(private invoiceService: InvoicingService, private router: Router) { }

  ngOnInit() {
    this.getInvDetails(); 

  }



async getInvoiceDetail(_id: string) {
  try {
    await firstValueFrom(this.invoiceService.invSingle(_id));
    this.router.navigate(['/portal/accounting/invoicing', _id]);
  } catch (error) {
    console.error('Error fetching quotation detail:', error);
  }
}


async getInvDetails() {
  try {
    const response = await firstValueFrom(
      this.invoiceService.getInv()
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


/*
  getAmount(amtId: any): string {
    if (typeof amtId === 'object') {
      return amtId.totalAmount  ;
    }
    return '';
  } */

  getPO(detail: Invoice): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.po) {
      return detail.purchase_id.po_id.po; 
    }
    return '';
  }

  getSRFQ(detail: Invoice): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id && detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }

  getTotal(detail: Invoice): number {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.totalAmount; 
    }
    return 0;
  }


  getResponsible(detail: Invoice): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }
  
  

}
