import { Component } from '@angular/core';
import { AddPo, Product } from '../../../../model/purchase-addpo.model';
import { ActivatedRoute } from '@angular/router';
import { PurchaseOrderService } from '../purchase-order/purchase-order.service';
import { AddPoService } from './add-po.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrderService } from '../../sales/sales-order/sales-order.service';
import { firstValueFrom } from 'rxjs';
import { Po } from '../../../../model/purchase-po.model';

@Component({
  selector: 'app-add-po',
  templateUrl: './add-po.component.html',
  styleUrl: './add-po.component.css'
})
export class AddPoComponent {

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
  quoDetails: any
  employee_id: string = ''
  

  

  
  items: Product[] = [{ product: '', qty: 1 , uom: '', unit: 0 ,  total: 0 }];

  constructor(private route: ActivatedRoute, private addPoService: AddPoService, private poService: PurchaseOrderService, private snackBar: MatSnackBar,
    private salesOrderService :  SalesOrderService  ) { 

  }



async ngOnInit() {
  try {
    const params = await firstValueFrom(this.route.params);
    this.po_id = params['id'];

    if (this.po_id) {
      const data = await firstValueFrom(this.addPoService.getPoBypurchaePOId(this.po_id));

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

        const poData = await firstValueFrom(this.poService.poSingle(this.po_id));

        if (poData) {
          this.poDetail = poData;
        }
      }
    }
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

  


  addItem() {
    this.items.push({ product: '', qty: 1, uom: '', unit: 0, total: 0 });
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

  

async submitPo() {
  try {
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
        to: this.to,
        attention: this.attention,
        email: this.email,
        phone: this.phone,
        supplierrfq: this.supplierrfq,
        products: this.items,
        subject: this.subject,
        basis: this.basis,
        payment: this.payment,
        validity: this.validity,
        availability: this.availability,
        totalAmount: this.calculateTotal(),
        status: 'not confirmed',
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
}

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
}

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

  
  /*
  getClient(detail: any): string {
    if (detail && detail.quotation_id ) {
      return detail.quotation_id.to; 
    }
    return '';
  }

  getTotal(detail: any): string {
    if (detail && detail.quotation_id ) {
      return detail.quotation_id.totalAmount; 
    }
    return '';
  }*/



}
