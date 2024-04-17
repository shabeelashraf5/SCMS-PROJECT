import { Component } from '@angular/core';
import { FinancialTransactionService } from './financial-transaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financial-transaction',
  templateUrl: './financial-transaction.component.html',
  styleUrl: './financial-transaction.component.css'
})
export class FinancialTransactionComponent {

  invDetails: any;

  _id!: string; 
  employee_id: string = ''
  purchase_id: string =''
  errorMessage: string = '';



  constructor(private transactionService: FinancialTransactionService, private router: Router) { }

  ngOnInit() {
    this. getTransactionDetails(); 

  }


  getTransDetail(_id: string) {
    this.transactionService.transSingle(_id).subscribe(
      (data) => {
        // Navigate to AddQuotationComponent with the ID parameter
        this.router.navigate(['/portal/accounting/financial-transaction', _id]);
      },
      (error) => {
        console.error('Error fetching quotation detail:', error);
      }
    );
  } 


  getTransactionDetails() {
    this.transactionService.getTrans().subscribe(
      (response) => {
        this.invDetails = response; // Store the fetched RFQ details
        console.log(this. invDetails);
      },
      (error) => {
        console.error(error);
        if (error.status === 403) {
          this.errorMessage = 'You are not authorized to access this page.';
        } else {
          this.errorMessage = 'An error occurred while fetching data.';
        }
      }
    );
  }



  getAmount(amtId: any): string {
    if (typeof amtId === 'object') {
      return amtId.totalAmount  ;
    }
    return '';
  }

  getPO(detail: any): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.po) {
      return detail.purchase_id.po_id.po; 
    }
    return '';
  }


  getSupplier(detail: any): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.to; 
    }
    return '';
  }

  getSRFQ(detail: any): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id && detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }
  

  getResponsible(detail: any): string {
    if (detail && detail.employee_id) {
      return detail.employee_id.fname + ' ' + detail.employee_id.lname ; 
    }
    return '';
  }


}
