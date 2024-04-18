import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuotationService } from '../quotation/quotation.service';
import { AddQuotationService } from './add-quotation.service';
import { AddQuotation, Product } from '../../../../model/sales-addquo';
import { MatSnackBar } from '@angular/material/snack-bar';
//import jsPDF from 'jspdf';
//import 'jspdf-autotable';


@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrl: './add-quotation.component.css',

})

export class AddQuotationComponent implements OnInit  {
  

  rfqDetail: any
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


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.salesRFQ_id = params['id']; 

      this.addQuotationService.getQuotationBySalesRFQId(this.salesRFQ_id)
        .subscribe((data: AddQuotation) => {
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
            this.discount = +data.discount
            this.clientPo = data.clientPo;
            this.date = data.date



           this.quotationService.qsingle(this.salesRFQ_id).subscribe((quotationData: any) => {
            if (quotationData) {
              this.rfqDetail = quotationData;
            }
          }, error => {
            console.error('Error fetching RFQ number', error);
          });
        }
        
        }, error => {
          console.error('Error fetching submitted data', error);
        });
    });
  }

  

  addItem() {
    this.items.push({ product: '', qty: 1, uom: '', unit: 0,  uplift: 0 , total: 0 });
    
  } 


/*
  rows: Product[] =  [{ product: '', qty: 1 , uom: '', unit: 0 ,  total: 0 }]
  
  // Method to add new row
  insertRow() {
    this.rows.push({ product: '',  qty: 1 , uom: '' ,  unit: 0 ,  total: 0  });
  }  

  // Method to delete row
  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }
*/

/*
  updateTotal(item: Product) {
    const total = Number(item.qty) * Number(item.unit);
    item.total = parseFloat(total.toFixed(2)); 
  }
  */

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
    const totalPrice = this. calculateTotalprice()
    
    this.addQuotationService.getQuotationBySalesRFQId(this.salesRFQ_id)
      .subscribe(existingQuotation => {
        if (existingQuotation) {
          
          
          console.log('A quotation already exists for this salesRFQ_id:', existingQuotation);
          this.updateQuotation(existingQuotation); 
          this.openSnackBar('Quotation updated');
        } else {
      
          const formData: AddQuotation = {
            _id: '',
            salesRFQ_id: this.salesRFQ_id,
            employee_id: this.employee_id,
            to: this.to,
            spo: '',
            attention: this.attention,
            email: this.email,
            phone: this.phone,
            clientrfq: this.clientrfq,
            products: this.items,
            subject: this.subject,
            basis: this.basis,
            payment: this.payment,
            validity: this.validity,
            availability: this.availability,
            status: 'not confirmed',
            totalAmount: totalAmount,
            discount: this.discount,
            clientPo: this.clientPo,
            date: this.date,
            totalprice: totalPrice
           
            
          };

          console.log('AddQuotation data:', formData);
         

          // Submit the quotation
          this.addQuotationService.addQuotation(formData)
            .subscribe(response => {
              console.log('Quotation submitted successfully', response);
              this.openSnackBar('Quotation submitted');
              

          
            }, error => {
              console.error('Error submitting quotation', error);
            });
        }
      }, error => {
        console.error('Error checking existing quotation', error);
      });
  }


  updateQuotation(existingQuotation: AddQuotation) {

    const totalPrice = this. calculateTotalprice()
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
    existingQuotation.date = this.date
    existingQuotation.discount = this.discount
    existingQuotation.totalprice = totalPrice
    existingQuotation.totalAmount = totalAmount 
  
  
    this.addQuotationService.updateQuotation(existingQuotation._id , existingQuotation)
      .subscribe(response => {
        console.log('Quotation updated successfully', response);
      }, error => {
        console.error('Error updating quotation', error);
      });
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
