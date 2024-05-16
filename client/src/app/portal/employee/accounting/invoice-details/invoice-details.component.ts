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
import { response } from 'express';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { environment } from '../../../../../environment/environment';

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
  invoice: string =''

  routeSubscription!: Subscription;

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
  
  


fetchInvoiceDetails(quotation_id: string){
  this.routeSubscription = this.invoiceService.invSingle(quotation_id).subscribe({
    next: (response) =>{
      this.invoiceDetail = response;
    },error: (error) => {
      console.error('Error fetching PO details', error);
    }
  })
}



  createShipment(invoiceId: string) {

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

    this.routeSubscription = this.invoicedetailsService.addShip(newShip).subscribe({
      next: (response) => {
        this.openSnackBar('Invoice Confirmed');
        this.confirmedInvoice.add(invoiceId);  
        localStorage.setItem('confirmedInvoice', JSON.stringify([...this.confirmedInvoice]));
        this.router.navigate(['/portal/accounting/invoicing']);
        console.log(response);
      },error: (error) => {
        console.error(error);
      }
    })
  }


  getProduct(products:  Product[] | undefined):  Product[] {
    return Array.isArray(products) ? products : [];
  }



getClient(detail: Invoice): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.clientname; 
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
  return product.product; 
}


openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 4000,
    verticalPosition: 'top', 
    horizontalPosition: 'center', 
  });
}

ngOnDestroy() {
  if (this.routeSubscription) {
    this.routeSubscription.unsubscribe();
  }
}


invoicePDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const products = this.getProduct(this.invoiceDetail.purchase_id.po_id.quotation_id.products);

  const productRows = products.map((product, index) => [
    index + 1,
    product.product,
    product.qty,
    product.uom,
    product.unit,
    product.total
  ]);

  const productTable = {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
      body: [
        ['No.', 'Product', 'Quantity', 'UOM', 'Unit', 'Total'],
        ...productRows
      ]
    }
  };

  const documentDefinition: TDocumentDefinitions = {

    
      content: [
        {
          image: environment.logo_base64,
          width: 50,
          height: 50
        },
        { text: 'Invoice Note', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
        { text: `Invoice no:${this.invoiceDetail.invoice}\n Bill To: ${this.getClient(this.invoiceDetail)}\nAttention: ${this.getAttention(this.invoiceDetail)} `, fontSize: 12 },
        { text: 'Dear Sir,', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: 'Thank you very much for giving us an opportunity', fontSize: 12, margin: [0, 10, 0, 0] },
      productTable,
        { text: `Total Amount: ${this.getTotalamount(this.invoiceDetail)}`, fontSize: 12, alignment: 'right' },
        { text: 'Make all payable to: 05shebz Limited LLC', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: 'Thank you for your business!', fontSize: 10, margin: [0, 20, 0, 0] },
      ]
  };

  pdfMake.createPdf(documentDefinition).download('invoice-note.pdf');
}


deliveryPDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const products = this.getProduct(this.invoiceDetail.purchase_id.po_id.quotation_id.products);

  const productRows = products.map((product, index) => [
    index + 1,
    product.product,
    product.qty,
    product.uom,
  
  ]);

  const productTable = {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto' ],
      body: [
        ['No.', 'Product', 'Quantity', 'UOM' ],
        ...productRows
      ]
    }
  };

  const documentDefinition: TDocumentDefinitions = {

    
      content: [
        {
          image: environment.logo_base64,
          width: 50,
          height: 50
        },
        { text: 'Delivery Note', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
        { text: `Delivery no:${this.invoiceDetail.delivery}\nDeliver To: ${this.getClient(this.invoiceDetail)}\nAttention: ${this.getAttention(this.invoiceDetail)} `, fontSize: 12 },
        { text: 'Dear Sir,', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: 'Thank you very much for giving us an opportunity', fontSize: 12, margin: [0, 10, 0, 0] },
      productTable,
        { text: 'Make all payable to: 05shebz Limited LLC', fontSize: 12, margin: [0, 20, 0, 0] },
        { text: 'Thank you for your business!', fontSize: 10, margin: [0, 20, 0, 0] },
      ]
  };

  pdfMake.createPdf(documentDefinition).download('delivery-note.pdf');
}



}
