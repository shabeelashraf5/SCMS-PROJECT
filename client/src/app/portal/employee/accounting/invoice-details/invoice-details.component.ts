import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../../model/invoice.model';
import { InvoicingService } from '../invoicing/invoicing.service';
import { Shipment } from '../../../../model/shipment.model';
import { InvoiceDetailsService } from './invoice-details.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';




@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})

export class InvoiceDetailsComponent {

  invoiceDetail: any
  shipmentDetail: any
  quotation_id: any;

  _id!: string; 
  employee_id: string = ''
  invoice_id: string = '';


  constructor(private route: ActivatedRoute, private invoiceService: InvoicingService, private invoicedetailsService: InvoiceDetailsService,  private snackBar: MatSnackBar, private router: Router  ) { }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quotation_id = params['id']; 
  
      this.fetchInvoiceDetails(this.quotation_id);
    });
  }
  
  fetchInvoiceDetails(quotation_id: any) {
    this.invoiceService.invSingle(quotation_id).subscribe(
      (poData: any) => {
        if (poData) {
          this.invoiceDetail = poData;
        }
      },
      error => {
        console.error('Error fetching PO details', error);
      }
    );
  }



  createShipment(invoiceId: string) {
    console.log('purchaseId:',invoiceId); 
    const newShip: Shipment = {
      _id: '', 
      employee_id: this.employee_id,
      invoice_id: invoiceId, 
      shipment: '',
      status: 'Not Delivered' 
    
    };
  
    console.log(newShip)
  
    this.invoicedetailsService.addShip(newShip).subscribe(
      (response) => {

        this.openSnackBar('Invoice Confirmed');


        this.router.navigate(['/portal/accounting/invoicing']);
       
        console.log(response);
      },
      (error) => {
        console.error(error);
     
      }
    );
  }

 





  getProduct(products: any[]): any[] {
    if (Array.isArray(products)) {
        return products;
    }
    return [];
} 



getClient(detail: any): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.to; 
  }
  return '';
}

getAttention(detail: any): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.attention; 
  }
  return '';
}

getTotalamount(detail: any): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.totalAmount; 
  }
  return '';
}


openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 4000,
    verticalPosition: 'top', // Set position to top
    horizontalPosition: 'center', // Set position to center horizontally
  });
}

  



}
