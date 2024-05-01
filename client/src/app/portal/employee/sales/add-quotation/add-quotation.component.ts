import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from '../quotation/quotation.service';
import { AddQuotationService } from './add-quotation.service';
import { AddQuotation, Product } from '../../../../model/sales-addquo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Quotation } from '../../../../model/sales-quotation.model';
import { OrderStatus } from '../../../../enums/order-status.enum';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';


@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.css',

})

export class AddQuotationComponent implements OnInit  {
  

  rfqDetail: Quotation | null = null;
  //quotationId!: string;
  salesRFQ_id: string = ''
  to: string = ''
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
  
 

  items: Product[] = [{ product: '', qty: 1 , uom: '', unit: 0 , uplift: 0 ,  total: 0 }];

  constructor(private route: ActivatedRoute, private addQuotationService: AddQuotationService, private quotationService: QuotationService, private snackBar: MatSnackBar  ) {}


async ngOnInit() {
  try {
    const params = await firstValueFrom(this.route.params);
    this.salesRFQ_id = params['id'];

    const data = await firstValueFrom(
      this.addQuotationService.getQuotationBySalesRFQId(this.salesRFQ_id)
    );

    if (data) {
      this.to = data.to;
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

      const quotationData = await firstValueFrom(
        this.quotationService.qsingle(this.salesRFQ_id)
      );

      if (quotationData) {
        this.rfqDetail = quotationData;
      }
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
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



async submitQuotation() {
  const totalAmount = this.calculateTotal();
  const totalPrice = this.calculateTotalprice();

  try {

    const to = this.to.trim();
    const attention = this.attention.trim();
    const email = this.email.trim();
    const phone= this.phone.trim();
    const clientrfq = this.clientrfq.trim();
    const subject = this.subject.trim();
    const basis = this.basis.trim();
    const payment = this.payment.trim();
    const validity = this.validity.trim();
    const availability = this.availability.trim();

    const hasEmptyFields = [to, attention, email, phone, clientrfq, subject, basis, payment, validity, availability].some(
      (field) => field === ''
    );

    const existingQuotation = await firstValueFrom(
      this.addQuotationService.getQuotationBySalesRFQId(this.salesRFQ_id)
    );

    if (hasEmptyFields) {
      this.openSnackBar('Please fill in all required fields with valid data');
      return; 
    }

    if (existingQuotation) {
      console.log('A quotation already exists for this salesRFQ_id:', existingQuotation);
      await this.updateQuotation(existingQuotation);
      this.openSnackBar('Quotation updated');
    } else {
      const formData: AddQuotation = {
        _id: '',
        salesRFQ_id: this.salesRFQ_id as unknown as Quotation ,
        employee_id: this.employee_id,
        to: to,
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

      await firstValueFrom(this.addQuotationService.addQuotation(formData));
      this.openSnackBar('Quotation submitted');
      console.log('Quotation submitted successfully');
    }
  } catch (error) {
    console.error('Error during quotation submission:', error);
  }
}

async updateQuotation(existingQuotation: AddQuotation) {
  const totalPrice = this.calculateTotalprice();
  const totalAmount = this.calculateTotal();

  existingQuotation.to = this.to;
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

  try {
    await firstValueFrom(this.addQuotationService.updateQuotation(existingQuotation._id, existingQuotation));
    console.log('Quotation updated successfully');
  } catch (error) {
    console.error('Error updating quotation:', error);
  }
}

trackByAddQuotation(index: number, addquotation: Product): string {
  return addquotation.product // Return a unique identifier for the product
}


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

/*
  generatePDF() {
    const doc = new jsPDF();

  

    const logoImg = new Image();
    logoImg.src = 'assets/055.jpg'; // Replace 'path/to/your/logo.png' with the actual path to your logo image
    doc.addImage(logoImg, 'PNG', 2, 2, 40, 40);// Adjust the position and size as needed

  
  doc.setFontSize(12);
  doc.text('Quotation Form', 75, 30); // Adjust the position as needed
  doc.text(`To: ${this.to}`, 18, 42);
  doc.text(`Attention: ${this.attention}`, 18, 48); // Adjust the position as needed
  doc.text(`Email: ${this.email}`, 18, 54); // Adjust the position as needed
  doc.text(`Phone: ${this.phone}`, 18, 60); // Adjust the position as needed
  doc.text(`Client RFQ: ${this.clientrfq}`, 18, 68); // Adjust the position as needed

  // Add a box around the title and "To" field
  doc.rect(15, 35, 180, 35);

  doc.setFontSize(12);
  doc.text('Dear Sir,', 20, 80); 

  doc.setFontSize(12);
  doc.text(`Subject: ${this.subject}`, 20, 90); 


  doc.setFontSize(12);
  doc.text(`Thank you very much for giving us an opportunity to quote for above referred subject,
we are pleased to quote our best offer as per the following:`, 20, 100); 

  const startY = 115;
  const headers = ['Product Description', 'QTY', 'UOM', 'Unit Price', 'Total'];
  const data = this.items.map(item => [item.product, item.qty, item.uom, item.unit, item.total]);
  
  // Add the table
  const table = doc.autoTable({
    startY: startY,
    head: [headers],
    body: data,
    theme: 'grid',
    margin: { top: 10 },
    styles: {
      fontSize: 10
    }
  });
  
  // Calculate the table height based on the number of rows
  const textHeight = doc.getTextDimensions("Sample Text").h;
  
  // Calculate the number of rows in the table
  const numRows = data.length + 1; // Add 1 for the header row
  
  // Calculate the table height
  const tableHeight = textHeight * numRows;

  // Add a box around the table


    doc.save('quotation.pdf');
  }

  
  */

}
