import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from '../quotation/quotation.service';
import { AddQuotationService } from './add-quotation.service';
import { AddQuotation, Product } from '../../../../model/sales-addquo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, firstValueFrom } from 'rxjs';
import { Quotation } from '../../../../model/sales-quotation.model';
import { OrderStatus } from '../../../../enums/order-status.enum';
//import { jsPDF } from "jspdf"
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { environment } from '../../../../../environment/environment';




@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.css',

})

export class AddQuotationComponent implements OnInit, OnDestroy  {
  

  rfqDetail: Quotation | null = null;
  //quotationId!: string;
  salesRFQ_id: string = ''
  clientname: string = ''
  attention: string = ''
  srfq: string = '';
  email: string = ''
  phone: string = ''
  clientrfq: string = ''
  subject: string = ''
  payment: string = ''
  basis: string = ''
  validity: string = ''
  availability: string = ''
  submitted: boolean = false;
  discount: number = 0; 
  clientPo: string = ''
  date: string = ''
  employee_id: string = ''
  addQuoSubscription!: Subscription
 

  items: Product[] = [{ product: '', qty: 1 , uom: '', unit: 0 , uplift: 0 ,  total: 0 }];

  constructor(private route: ActivatedRoute, private addQuotationService: AddQuotationService, private quotationService: QuotationService, private snackBar: MatSnackBar  ) {
    
  }


 ngOnInit() {
  this.displayDatas()
}


displayDatas(){

  this.addQuoSubscription = this.route.params.subscribe({
    next: params => {
      this.salesRFQ_id = params['id'];
  
     this.addQuoSubscription = this.addQuotationService.getQuotationBySalesRFQId(this.salesRFQ_id)
        .subscribe({
          next: data => {
            if (data) {
              this.clientname = data.clientname;
              this.attention = data.attention;
              this.email = data.email;
              this.phone = data.phone;
              this.clientrfq = data.clientrfq;
              this.subject = data.subject;
              this.payment = data.payment;
              this.basis = data.basis;
              this.validity = data.validity;
              this.availability = data.availability;
              this.items = data.products;
              this.discount = +data.discount;
              this.clientPo = data.clientPo;
              this.date = data.date;
  
            this.addQuoSubscription = this.quotationService.qsingle(this.salesRFQ_id)
                .subscribe({
                  next: quotationData => {
                    if (quotationData) {
                      this.rfqDetail = quotationData;
                    }
                  },
                  error: error => {
                    console.error('Error fetching quotation data:', error);
                  }
                });
            }
          },
          error: error => {
            console.error('Error fetching quotation by sales RFQ ID:', error);
          }
        });
    },
    error: error => {
      console.error('Error fetching route params:', error);
    }
  });

}
  

  addItem() {
    this.items.push({ product: '', qty: 1, uom: '', unit: 0,  uplift: 0 , total: 0 });
    
  } 



  updateTotal(item: Product) {
    const totalBeforeUplift = Number(item.qty) * Number(item.unit);
    const totalWithUplift = totalBeforeUplift * (1 + Number(item.uplift) / 100); 
    item.total = parseFloat(totalWithUplift.toFixed(2)); 
}



  calculateTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += Number(item.total);
    }
  
   
    const totalWithDiscount = total * (1 - this.discount / 100);
    
    
    const roundedTotal = parseFloat(totalWithDiscount.toFixed(2));
    
    return roundedTotal;
  }


  calculateTotalprice(): number {
    let total = 0;
    for (const item of this.items) {
      total += Number(item.total);
    }
   
    return parseFloat(total.toFixed(2));
  }




submitQuotation() {
  const totalAmount = this.calculateTotal();
  const totalPrice = this.calculateTotalprice();

  const to = this.clientname.trim();
  const attention = this.attention.trim();
  const email = this.email.trim();
  const phone = this.phone.trim();
  const clientrfq = this.clientrfq.trim();
  const subject = this.subject.trim();
  const basis = this.basis.trim();
  const payment = this.payment.trim();
  const validity = this.validity.trim();
  const availability = this.availability.trim();

  const hasEmptyFields = [to, attention, email, phone, clientrfq, subject, basis, payment, validity, availability].some(
    (field) => field === ''
  );

  if (hasEmptyFields) {
    this.openSnackBar('Please fill in all required fields with valid data');
    return;
  }

  this.addQuoSubscription = this.addQuotationService.getQuotationBySalesRFQId(this.salesRFQ_id)
    .subscribe({
      next: (existingQuotation) => {
        if (existingQuotation) {
          console.log('A quotation already exists for this salesRFQ_id:', existingQuotation);
          this.updateQuotation(existingQuotation)
          this.openSnackBar('Quotation updated');

        } else {
          const formData: AddQuotation = {
            _id: '',
            salesRFQ_id: this.salesRFQ_id as unknown as Quotation,
            employee_id: this.employee_id,
            clientname: this.clientname,
            spo: '',
            attention: attention,
            email: email,
            phone: phone,
            clientrfq: clientrfq,
            products: this.items,
            subject: subject,
            basis: this.basis,
            payment: payment,
            validity: validity,
            availability: availability,
            status: OrderStatus.PENDING,
            totalAmount: totalAmount,
            discount: this.discount,
            clientPo: this.clientPo,
            date: this.date,
            totalprice: totalPrice,
            createdAt: new Date()
          };

          console.log('AddQuotation data:', formData);

          this.addQuoSubscription = this.addQuotationService.addQuotation(formData)
            .subscribe({
              next: () => {
                this.openSnackBar('Quotation submitted');
                console.log('Quotation submitted successfully');
              },
              error: (error) => {
                console.error('Error during quotation submission:', error);
              }
            });
        }
      },
      error: (error) => {
        console.error('Error fetching existing quotation:', error);
      }
    });
}



updateQuotation(existingQuotation: AddQuotation) {
  const totalPrice = this.calculateTotalprice();
  const totalAmount = this.calculateTotal();

  existingQuotation.clientname = this.clientname;
  existingQuotation.attention = this.attention;
  existingQuotation.email = this.email;
  existingQuotation.phone = this.phone;
  existingQuotation.clientrfq = this.clientrfq;
  existingQuotation.subject = this.subject;
  existingQuotation.basis = this.basis;
  existingQuotation.payment = this.payment;
  existingQuotation.validity = this.validity;
  existingQuotation.availability = this.availability;
  existingQuotation.products = this.items;
  existingQuotation.clientPo = this.clientPo;
  existingQuotation.date = this.date;
  existingQuotation.discount = this.discount;
  existingQuotation.totalprice = totalPrice;
  existingQuotation.totalAmount = totalAmount;

  this.addQuoSubscription = this.addQuotationService.updateQuotation(existingQuotation._id, existingQuotation)
    .subscribe({
      next: () => {
        console.log('Quotation updated successfully');
      },
      error: (error) => {
        console.error('Error updating quotation:', error);
      }
    });
}


trackByAddQuotation(index: number, addquotation: Product): string {
  return addquotation.uom
}


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

//   generatePDF() {
//     pdfMake.vfs = pdfFonts.pdfMake.vfs;

//     const headers = ['Product Description', 'QTY', 'UOM', 'Unit Price', 'Total'];
//     const data = this.items.map(item => [item.product, item.qty, item.uom, item.unit, item.total]);
//     const tableBody = [headers, ...data];

//     const documentDefinition: TDocumentDefinitions = {

      
//         content: [
//           {
//             image: environment.logo_base64,
//             width: 50,
//             height: 50
//           },
//             { text: 'Quotation Form', fontSize: 16, alignment: 'center', margin: [0, 0, 0, 10] },
//             { text: `RFQ No: ${this.rfqDetail?.srfq}\nTo: ${this.clientname}\nAttention: ${this.attention}\nEmail: ${this.email}\nPhone: ${this.phone}\nClient RFQ: ${this.clientrfq}`, fontSize: 12 },
//            // { canvas: [{ type: 'rect', x: 15, y: 35, w: 180, h: 35, r: 5, lineColor: '#000000' }] },
//             { text: 'Dear Sir,', fontSize: 12, margin: [0, 20, 0, 0] },
//             { text: `Subject: ${this.subject}`, fontSize: 12 },
//             { text: 'Thank you very much for giving us an opportunity to quote for above referred subject, we are pleased to quote our best offer as per the following:', fontSize: 12, margin: [0, 10, 0, 0] },
//             { table: { widths: ['*', '*', '*', '*', '*'], body: tableBody }, layout: 'lightHorizontalLines', margin: [0, 10, 0, 0] }
//         ]
//     };

//     pdfMake.createPdf(documentDefinition).download('quotation.pdf');
// }

generatePDF() {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const headers = [
    { text: 'Product Description', style: 'tableHeader' },
    { text: 'QTY', style: 'tableHeader' },
    { text: 'UOM', style: 'tableHeader' },
    { text: 'Unit Price', style: 'tableHeader' },
    { text: 'Total', style: 'tableHeader' }
  ];

  const data = this.items.map(item => [
    { text: item.product, style: 'tableCell' },
    { text: item.qty, style: 'tableCell', alignment: 'center' },
    { text: item.uom, style: 'tableCell', alignment: 'center' },
    { text: item.unit, style: 'tableCell', alignment: 'right' },
    { text: item.total, style: 'tableCell', alignment: 'right' }
  ]);

  const tableBody = [headers, ...data];

  const documentDefinition: TDocumentDefinitions = {
    content: [
      {
        image: environment.logo_base64,
        width: 70,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      {
        text: 'Quotation Form',
        style: 'title'
      },
      {
        text: `RFQ No: ${this.rfqDetail?.srfq}\nTo: ${this.clientname}\nAttention: ${this.attention}\nEmail: ${this.email}\nPhone: ${this.phone}\nClient RFQ: ${this.clientrfq}`,
        style: 'clientDetails',
        margin: [0, 10, 0, 20]
      },
      {
        text: 'Dear Sir/Madam,',
        style: 'greeting',
        margin: [0, 0, 0, 10]
      },
      {
        text: `Subject: ${this.subject}`,
        style: 'subject',
        margin: [0, 0, 0, 10]
      },
      {
        text: 'Thank you for giving us an opportunity to quote for the above-referenced subject. We are pleased to offer the following quotation:',
        style: 'bodyText',
        margin: [0, 0, 0, 20]
      },
      {
        table: {
          widths: ['*', 'auto', 'auto', 'auto', 'auto'],
          body: tableBody
        },
        layout: 'lightHorizontalLines',
        margin: [0, 10, 0, 20]
      },
      {
        text: 'Terms and Conditions',
        style: 'sectionHeader',
        margin: [0, 20, 0, 10]
      },
      {
        ul: [
          `${this.basis}`,
          `${this.payment}`,
          `${this.validity}`,
          `${this.availability}`
        ],
        style: 'list'
      },
      {
        text: 'Notes',
        style: 'sectionHeader',
        margin: [0, 20, 0, 10]
      },
      {
        text: 'We look forward to your positive response. Please feel free to contact us for any clarifications.',
        style: 'bodyText'
      }
    ],
    styles: {
      title: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 20]
      },
      clientDetails: {
        fontSize: 12,
        margin: [0, 0, 0, 10]
      },
      greeting: {
        fontSize: 12,
        bold: true
      },
      subject: {
        fontSize: 12,
        bold: true,
        italics: true
      },
      bodyText: {
        fontSize: 12
      },
      tableHeader: {
        bold: true,
        fontSize: 12,
        color: 'white',
        fillColor: '#4CAF50',
        alignment: 'center'
      },
      tableCell: {
        fontSize: 10,
        margin: [5, 5, 5, 5]
      },
      sectionHeader: {
        fontSize: 14,
        bold: true,
        decoration: 'underline'
      },
      list: {
        fontSize: 12,
        margin: [0, 0, 0, 10]
      }
    },
    footer: (currentPage, pageCount) => ({
      text: `Page ${currentPage} of ${pageCount}`,
      alignment: 'center',
      fontSize: 10,
      margin: [0, 10, 0, 0]
    })
  };

  pdfMake.createPdf(documentDefinition).download('quotation.pdf');
}


ngOnDestroy(): void {
  
  if( this.addQuoSubscription){
    this.addQuoSubscription.unsubscribe()
  }
}


}
