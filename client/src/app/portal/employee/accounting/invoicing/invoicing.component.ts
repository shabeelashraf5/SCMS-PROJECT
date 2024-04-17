import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InvoicingService } from './invoicing.service';

@Component({
  selector: 'app-invoicing',
  templateUrl: './invoicing.component.html',
  styleUrl: './invoicing.component.css'
})
export class InvoicingComponent {

  invDetails: any;

  _id!: string; 
  employee_id: string = ''
  purchase_id: string =''
  errorMessage: string = '';



  constructor(private invoiceService: InvoicingService, private router: Router) { }

  ngOnInit() {
    this.getInvDetails(); 

  }


  getInvoiceDetail(_id: string) {
    this.invoiceService.invSingle(_id).subscribe(
      (data) => {
        // Navigate to AddQuotationComponent with the ID parameter
        this.router.navigate(['/portal/accounting/invoicing', _id]);
      },
      (error) => {
        console.error('Error fetching quotation detail:', error);
      }
    );
  }


  getInvDetails() {
    this.invoiceService.getInv().subscribe(
      (response) => {
        this.invDetails = response; // Store the fetched RFQ details
        console.log(this.invDetails);
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

  getSRFQ(detail: any): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id && detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }

  getTotal(detail: any): string {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.totalAmount; 
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
