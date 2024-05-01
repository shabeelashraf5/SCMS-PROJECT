import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../../../model/invoice.model';
import { InvoicingService } from '../invoicing/invoicing.service';
import { Shipment } from '../../../../model/shipment.model';
import { InvoiceDetailsService } from './invoice-details.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {  Subscription , firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AddQuotation, Product } from '../../../../model/sales-addquo';
import { DeliveryStatus } from '../../../../enums/delivery-status.enum';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrl: './invoice-details.component.css'
})

export class InvoiceDetailsComponent implements OnInit, OnDestroy {

  invoiceDetail!: Invoice
  quotation_id!: string;

  _id!: string; 
  employee_id: string = ''
  invoice_id: string = '';
  confirmedInvoice: Set<string> = new Set();

  private routeSubscription!: Subscription;

  constructor(private route: ActivatedRoute, private invoiceService: InvoicingService, private invoicedetailsService: InvoiceDetailsService,  private snackBar: MatSnackBar, private router: Router  ) { }


  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.quotation_id = params['id'];
      this.fetchInvoiceDetails(this.quotation_id);
    });

    this.loadConfirmedInvoice()
  }

  loadConfirmedInvoice() {
    const storedInvoice = localStorage.getItem('confirmedInvoice');
    if (storedInvoice) {
      const parsedInvoice = JSON.parse(storedInvoice);
      this.confirmedInvoice = new Set(parsedInvoice);
    }
  }
  
  

  async fetchInvoiceDetails(quotation_id: string) {
    try {
      const poData = await firstValueFrom(this.invoiceService.invSingle(quotation_id));
      if (poData) {
        this.invoiceDetail = poData;
      }
    } catch (error) {
      console.error('Error fetching PO details', error);
    }
  }



  async createShipment(invoiceId: string) {

    if (this.confirmedInvoice.has(invoiceId)) {
      return; 
    }
    console.log('purchaseId:', invoiceId);

    const newShip: Shipment = {
      _id: '',
      employee_id: this.employee_id,
      invoice_id: invoiceId as unknown as Invoice,
      shipment: '',
      status: DeliveryStatus.PENDING
    };

    console.log(newShip);

    try {
      const response = await firstValueFrom(this.invoicedetailsService.addShip(newShip));
      this.openSnackBar('Invoice Confirmed');
      this.confirmedInvoice.add(invoiceId);  // Mark this quotation as confirmed
      localStorage.setItem('confirmedInvoice', JSON.stringify([...this.confirmedInvoice]));
      this.router.navigate(['/portal/accounting/invoicing']);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }


  getProduct(products:  Product[] | undefined):  Product[] {
    return Array.isArray(products) ? products : [];
  }



getClient(detail: Invoice): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.to; 
  }
  return '';
}

getAttention(detail: Invoice): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.attention; 
  }
  return '';
}

getTotalamount(detail: Invoice): number {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.totalAmount; 
  }
  return 0;
}

trackByProductId(index: number, product: Product): string {
  return product.product; // Use unique identifier
}


openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 4000,
    verticalPosition: 'top', // Set position to top
    horizontalPosition: 'center', // Set position to center horizontally
  });
}

ngOnDestroy() {
  if (this.routeSubscription) {
    this.routeSubscription.unsubscribe();
  }
}



}
