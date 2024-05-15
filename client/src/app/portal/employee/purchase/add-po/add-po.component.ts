import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddPo, Product } from '../../../../model/purchase-addpo.model';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
import { AddPoService } from './add-po.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../sales/sales-order/sales-order.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Po } from '../../../../model/purchase-po.model';
import { OrderStatus } from '../../../../enums/order-status.enum';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrl: './add-po.component.css'
})
export class AddPoComponent implements OnInit, OnDestroy {

  poDetail: Po | null = null;
  po_id: string = ''
  to: string = ''
  attention: string = ''
  email: string = ''
  phone: string = ''
  supplierrfq: string = ''
  subject: string = ''
  payment: string = ''
  basis: string = ''
  validity: string = ''
  availability: string = ''
  submitted: boolean = false;
  employee_id: string = ''
  addPoSubscription!: Subscription
  

  
  items: Product[] = [{  product: '', qty: 1 , uom: '', unit: 0 ,  total: 0 }];

  constructor(private route: ActivatedRoute, private addPoService: AddPoService, private poService: PurchaseOrderService, private snackBar: MatSnackBar,
    private salesOrderService :  SalesOrderService  ) { 

  }



 ngOnInit() {

  this.displayData()
  
}

displayData(){

  this.addPoSubscription = this.route.params.subscribe({
    next: params => {
      this.po_id = params['id'];
  
      if (this.po_id) {
        this.addPoSubscription = this.addPoService.getPoBypurchaePOId(this.po_id).subscribe({
          next: data => {
            if (data) {
              this.to = data.to;
              this.attention = data.attention;
              this.email = data.email;
              this.phone = data.phone;
              this.supplierrfq = data.supplierrfq;
              this.subject = data.subject;
              this.payment = data.payment;
              this.basis = data.basis;
              this.validity = data.validity;
              this.availability = data.availability;
              this.items = data.products;
  
              this.addPoSubscription = this.poService.poSingle(this.po_id).subscribe({
                next: poData => {
                  if (poData) {
                    this.poDetail = poData;
                  }
                },
                error: error => {
                  console.error('Error fetching PO data:', error);
                }
              });
            }
          },
          error: error => {
            console.error('Error fetching PO by ID:', error);
          }
        });
      }
    },
    error: error => {
      console.error('Error fetching route params:', error);
    }
  });
  
}


  addItem() {
    this.items.push({  product: '', qty: 1, uom: '', unit: 0, total: 0 })
  }


  calculateTotal(): number {
    let total = 0;
    for (const item of this.items) {
      total += Number(item.total); // Ensure item.total is treated as a number
    }
    return parseFloat(total.toFixed(2)); // Ensure total has two decimal places
  }


  updateTotal(item: Product) {
    const total = Number(item.qty) * Number(item.unit);
    item.total = parseFloat(total.toFixed(2)); 
  }

  
/*
async submitPo() {
  try {
    const to = this.to.trim();
    const attention = this.attention.trim();
    const email = this.email.trim();
    const phone = this.phone.trim();
    const supplierrfq = this.supplierrfq.trim();
    const subject = this.subject.trim();
    const basis = this.basis.trim();
    const payment = this.payment.trim();
    const validity = this.validity.trim();
    const availability = this.availability.trim();

    const hasEmptyFields = [to, attention, email, phone, supplierrfq, subject, basis, payment, validity, availability].some(
      (field) => field === ''
    );

    if (hasEmptyFields) {
      this.openSnackBar('Please fill in all required fields with valid data');
      return; 
    }

    const existingQuotation = await firstValueFrom(this.addPoService.getPoBypurchaePOId(this.po_id));

    if (existingQuotation) {
      console.log('A quotation already exists for this po_id:', existingQuotation);
      await this.updatePo(existingQuotation);
      this.openSnackBar('Purchase Order Updated');
    } else {
      const formData: AddPo = {
        _id: '',
        po_id: this.po_id as unknown as Po,
        employee_id: this.employee_id,
        to: to,
        attention: attention,
        email: email,
        phone: phone,
        supplierrfq: supplierrfq,
        products: this.items,
        subject: subject,
        basis: basis,
        payment: payment,
        validity: validity,
        availability: availability,
        totalAmount: this.calculateTotal(),
        status: OrderStatus.PENDING,
        createdAt: new Date()
      };

      console.log('AddPo data:', formData);

      const response = await firstValueFrom(this.addPoService.addPo(formData));
      console.log('Quotation submitted successfully', response);
      this.openSnackBar('Purchase Order submitted');
    }
  } catch (error) {
    console.error('Error submitting quotation', error);
  }
} */

submitPo() {
  const to = this.to.trim();
  const attention = this.attention.trim();
  const email = this.email.trim();
  const phone = this.phone.trim();
  const supplierrfq = this.supplierrfq.trim();
  const subject = this.subject.trim();
  const basis = this.basis.trim();
  const payment = this.payment.trim();
  const validity = this.validity.trim();
  const availability = this.availability.trim();

  const hasEmptyFields = [to, attention, email, phone, supplierrfq, subject, basis, payment, validity, availability].some(
    (field) => field === ''
  );

  if (hasEmptyFields) {
    this.openSnackBar('Please fill in all required fields with valid data');
    return;
  }

  this.addPoSubscription = this.addPoService.getPoBypurchaePOId(this.po_id).subscribe({
    next: (existingQuotation) => {
      if (existingQuotation) {
        console.log('A quotation already exists for this po_id:', existingQuotation);
        this.updatePo(existingQuotation)
          
            console.log('Purchase Order Updated');
            this.openSnackBar('Purchase Order Updated');

      } else {
        const formData: AddPo = {
          _id: '',
          po_id: this.po_id as unknown as Po,
          employee_id: this.employee_id,
          to: to,
          attention: attention,
          email: email,
          phone: phone,
          supplierrfq: supplierrfq,
          products: this.items,
          subject: subject,
          basis: basis,
          payment: payment,
          validity: validity,
          availability: availability,
          totalAmount: this.calculateTotal(),
          status: OrderStatus.PENDING,
          createdAt: new Date()
        };

        console.log('AddPo data:', formData);

        this.addPoSubscription = this.addPoService.addPo(formData).subscribe({
          next: () => {
            console.log('Purchase Order submitted successfully');
            this.openSnackBar('Purchase Order submitted');
          },
          error: (error) => {
            console.error('Error submitting Purchase Order:', error);
          }
        });
      }
    },
    error: (error) => {
      console.error('Error fetching existing Purchase Order:', error);
    }
  });
}


/*
async updatePo(existingQuotation: AddPo) {
  try {
    const totalAmount = this.calculateTotal();

    existingQuotation.to = this.to;
    existingQuotation.attention = this.attention;
    existingQuotation.email = this.email;
    existingQuotation.phone = this.phone;
    existingQuotation.supplierrfq = this.supplierrfq;
    existingQuotation.subject = this.subject;
    existingQuotation.basis = this.basis;
    existingQuotation.payment = this.payment;
    existingQuotation.validity = this.validity;
    existingQuotation.availability = this.availability;
    existingQuotation.products = this.items;
    existingQuotation.totalAmount = totalAmount;

    const response = await firstValueFrom(this.addPoService.updatePo(existingQuotation._id, existingQuotation));
    console.log('Quotation updated successfully', response);
  } catch (error) {
    console.error('Error updating quotation', error);
  }
} */

updatePo(existingQuotation: AddPo) {
  const totalAmount = this.calculateTotal();

  existingQuotation.to = this.to;
  existingQuotation.attention = this.attention;
  existingQuotation.email = this.email;
  existingQuotation.phone = this.phone;
  existingQuotation.supplierrfq = this.supplierrfq;
  existingQuotation.subject = this.subject;
  existingQuotation.basis = this.basis;
  existingQuotation.payment = this.payment;
  existingQuotation.validity = this.validity;
  existingQuotation.availability = this.availability;
  existingQuotation.products = this.items;
  existingQuotation.totalAmount = totalAmount;

  this.addPoSubscription = this.addPoService.updatePo(existingQuotation._id, existingQuotation)
    .subscribe({
      next: () => {
        console.log('Quotation updated successfully');
      },
      error: (error) => {
        console.error('Error updating quotation:', error);
      }
    });
}


trackByAddPo(index: number, addpo: Product): string {
  return addpo.uom
}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const headers = ['Product Description', 'QTY', 'UOM', 'Unit Price', 'Total'];
    const data = this.items.map(item => [item.product, item.qty, item.uom, item.unit, item.total]);
    const tableBody = [headers, ...data];

    const documentDefinition: TDocumentDefinitions = {

      
        content: [
          {
            image: environment.logo_base64,
            width: 50,
            height: 50
          },
            { text: 'Purchase Order', fontSize: 12, alignment: 'center', margin: [0, 0, 0, 10] },
            { text: `PO No: ${this.poDetail?.po}\nTo: ${this.to}\nAttention: ${this.attention}\nEmail: ${this.email}\nPhone: ${this.phone}\nClient RFQ: ${this.supplierrfq}`, fontSize: 12 },
           // { canvas: [{ type: 'rect', x: 15, y: 35, w: 180, h: 35, r: 5, lineColor: '#000000' }] },
            { text: 'Dear Sir,', fontSize: 12, margin: [0, 20, 0, 0] },
            { text: `Subject: ${this.subject}`, fontSize: 12 },
            { text: 'Thank you very much for giving us an opportunity to quote for above referred subject, we are pleased to quote our best offer as per the following:', fontSize: 12, margin: [0, 10, 0, 0] },
            { table: { widths: ['*', '*', '*', '*', '*'], body: tableBody }, layout: 'lightHorizontalLines', margin: [0, 10, 0, 0] }
        ]
    };

    pdfMake.createPdf(documentDefinition).download('purchase-order.pdf');
}

ngOnDestroy() {
  if(this.addPoSubscription){
    this.addPoSubscription.unsubscribe()
  } 
}
  


}
