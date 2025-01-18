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
  isPrintDropdownOpen: boolean = false

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

getEmail(detail: Invoice): string {
  if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id ) {
    return detail.purchase_id.po_id.quotation_id.email; 
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

getResponsible(detail: Invoice): string {
  if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
    return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
  }
  return 'Unknown';
}

getResponsibleEmail(detail: Invoice): string {
  if (typeof detail.employee_id === 'object' && 'email' in detail.employee_id) {
    return `${detail.employee_id.email}`;
  }
  return 'Unknown';
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

togglePrintDropdown() {
  this.isPrintDropdownOpen = !this.isPrintDropdownOpen;
}


invoicePDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const products = this.getProduct(this.invoiceDetail.purchase_id.po_id.quotation_id.products);

  const productRows = products.map((product, index) => [
    { text: index + 1, alignment: 'center' },
    { text: product.product, alignment: 'left' },
    { text: product.qty, alignment: 'center' },
    { text: product.uom, alignment: 'center' },
    { text: product.unit, alignment: 'center' },
    { text: product.total, alignment: 'center' },
  ]);

  const productTable = {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto', 'auto', 'auto'],
      body: [
        [
          { text: 'No.', bold: true, alignment: 'center' },
          { text: 'Product', bold: true, alignment: 'left' },
          { text: 'Quantity', bold: true, alignment: 'center' },
          { text: 'UOM', bold: true, alignment: 'center' },
          { text: 'Unit', bold: true, alignment: 'center' },
          { text: 'Total', bold: true, alignment: 'center' },
        ],
        ...productRows,
      ]
    },
    layout: 'lightHorizontalLines',
  };

  const documentDefinition: TDocumentDefinitions = {
    content: [
      {
        columns: [
          {
            image: environment.logo_base64,
            width: 50,
          },
          {
            text: 'INVOICE',
            alignment: 'right',
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        ],
      },
      {
        text: `Invoice No: ${this.invoiceDetail.invoice}`,
        fontSize: 12,
        margin: [0, 10, 0, 5],
      },
      {
        text: `Date: ${new Date().toLocaleDateString()}`,
        fontSize: 12,
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Pay To:', bold: true, margin: [0, 0, 0, 5] },
              { text: 'INBI Technology Co.', fontSize: 12 },
              { text: this.getResponsible(this.invoiceDetail), fontSize: 12 },
              { text: this.getResponsibleEmail(this.invoiceDetail), fontSize: 12, italics: true },
            ],
          },
          {
            width: '50%',
            stack: [
              { text: 'Invoice To:', bold: true, margin: [0, 0, 0, 5] },
              { text: this.getClient(this.invoiceDetail), fontSize: 12 },
              { text: this.getAttention(this.invoiceDetail), fontSize: 12 },
              { text: this.getEmail(this.invoiceDetail), fontSize: 12, italics: true },
            ],
          },
        ],
      },
      { text: 'Invoice Details', style: 'header', margin: [0, 20, 0, 10] },
      productTable,
      {
        text: `Total Amount: ${this.getTotalamount(this.invoiceDetail)}`,
        fontSize: 12,
        bold: true,
        alignment: 'right',
        margin: [0, 20, 0, 0],
      },
      { text: 'Order Summary', style: 'header', margin: [0, 20, 0, 10] },
      {
        table: {
          widths: ['*', 'auto'],
          body: [
            ['Original Price:', { text: this.getTotalamount(this.invoiceDetail), alignment: 'right' }],
            ['Discount:', { text: '0.00', alignment: 'right' }],
            ['Tax/VAT:', { text: '0.00', alignment: 'right' }],
            ['Total:', { text: this.getTotalamount(this.invoiceDetail), bold: true, alignment: 'right' }],
          ],
        },
        layout: 'noBorders',
      },
      {
        text: 'Terms and Conditions',
        style: 'header',
        margin: [0, 20, 0, 10],
      },
      {
        ul: [
          'Payment is due within 15 days.',
          'Late payments may incur additional charges.',
          'Make all payable to: INBI Technology Co.',
        ],
      },
      { text: 'Thank you for your business!', margin: [0, 20, 0, 0], alignment: 'center', italics: true },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        decoration: 'underline',
      },
    },
  };

  pdfMake.createPdf(documentDefinition).download('invoice-note.pdf');
}



// deliveryPDF() {
//   pdfMake.vfs = pdfFonts.pdfMake.vfs;

//   const products = this.getProduct(this.invoiceDetail.purchase_id.po_id.quotation_id.products);

//   const productRows = products.map((product, index) => [
//     index + 1,
//     product.product,
//     product.qty,
//     product.uom,
  
//   ]);

//   const productTable = {
//     table: {
//       headerRows: 1,
//       widths: ['auto', '*', 'auto', 'auto' ],
//       body: [
//         ['No.', 'Product', 'Quantity', 'UOM' ],
//         ...productRows
//       ]
//     }
//   };

//   const documentDefinition: TDocumentDefinitions = {

    
//       content: [
//         {
//           image: environment.logo_base64,
//           width: 50,
//           height: 50
//         },
//         { text: 'Delivery Note', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
//         { text: `Delivery no:${this.invoiceDetail.delivery}\nDeliver To: ${this.getClient(this.invoiceDetail)}\nAttention: ${this.getAttention(this.invoiceDetail)} `, fontSize: 12 },
//         { text: 'Dear Sir,', fontSize: 12, margin: [0, 20, 0, 0] },
//         { text: 'Thank you very much for giving us an opportunity', fontSize: 12, margin: [0, 10, 0, 0] },
//       productTable,
//         { text: 'Make all payable to: 05shebz Limited LLC', fontSize: 12, margin: [0, 20, 0, 0] },
//         { text: 'Thank you for your business!', fontSize: 10, margin: [0, 20, 0, 0] },
//       ]
//   };

//   pdfMake.createPdf(documentDefinition).download('delivery-note.pdf');
// }


deliveryPDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const products = this.getProduct(this.invoiceDetail.purchase_id.po_id.quotation_id.products);

  const productRows = products.map((product, index) => [
    { text: index + 1, alignment: 'center' },
    { text: product.product, alignment: 'left' },
    { text: product.qty, alignment: 'center' },
    { text: product.uom, alignment: 'center' },
  ]);

  const productTable = {
    table: {
      headerRows: 1,
      widths: ['auto', '*', 'auto', 'auto'],
      body: [
        [
          { text: 'No.', bold: true, alignment: 'center' },
          { text: 'Product', bold: true, alignment: 'left' },
          { text: 'Quantity', bold: true, alignment: 'center' },
          { text: 'UOM', bold: true, alignment: 'center' },
        ],
        ...productRows,
      ],
    },
    layout: 'lightHorizontalLines',
  };

  const documentDefinition: TDocumentDefinitions = {
    content: [
      {
        columns: [
          {
            image: environment.logo_base64,
            width: 50,
          },
          {
            text: 'DELIVERY NOTE',
            alignment: 'right',
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 10],
          },
        ],
      },
      {
        text: `Delivery No: ${this.invoiceDetail.delivery}`,
        fontSize: 12,
        margin: [0, 10, 0, 5],
      },
      {
        text: `Date: ${new Date().toLocaleDateString()}`,
        fontSize: 12,
        margin: [0, 0, 0, 20],
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              { text: 'Pay To:', bold: true, margin: [0, 0, 0, 5] },
              { text: 'INBI Technology Co.', fontSize: 12 },
              { text: this.getResponsible(this.invoiceDetail), fontSize: 12 },
              { text: this.getResponsibleEmail(this.invoiceDetail), fontSize: 12, italics: true },
            ],
          },
          {
            width: '50%',
            stack: [
              { text: 'Delivery To:', bold: true, margin: [0, 0, 0, 5] },
              { text: this.getClient(this.invoiceDetail), fontSize: 12 },
              { text: this.getAttention(this.invoiceDetail), fontSize: 12 },
              { text: this.getEmail(this.invoiceDetail), fontSize: 12, italics: true },
            ],
          },
        ],
      },
      { text: 'Delivery Details', style: 'header', margin: [0, 20, 0, 10] },
      productTable,
      {
        columns: [
          { text: 'Delivered By:', fontSize: 12, margin: [0, 20, 0, 0] },
          { text: 'Received By:', fontSize: 12, margin: [0, 20, 0, 0], alignment: 'right' },
        ],
      },
      
      {
        qr: this.invoiceDetail.delivery,
        fit: 75,
        alignment: 'right',
        margin: [0, 10, 0, 20],
      },
      {
        text: 'Thank you for your business!',
        margin: [0, 20, 0, 0],
        alignment: 'center',
        italics: true,
      },
      {
        text: 'Terms and Conditions',
        style: 'header',
        margin: [0, 20, 0, 10],
      },
      {
        text: 'All goods remain the property of INBI Technology Co. until paid in full. Please inspect the delivery and report any discrepancies within 7 days.',
        fontSize: 10,
        italics: true,
        margin: [0, 0, 0, 10],
      },
    ],
    styles: {
      header: {
        fontSize: 14,
        bold: true,
        decoration: 'underline',
      },
    },
    footer: (currentPage, pageCount) => ({
      text: `Page ${currentPage} of ${pageCount}`,
      alignment: 'center',
      fontSize: 10,
      margin: [0, 10, 0, 0],
    }),
  };

  pdfMake.createPdf(documentDefinition).download('delivery-note.pdf');
}



}
