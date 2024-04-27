import { Component } from '@angular/core';
import { SalesOrderService } from './sales-order.service';
import { Po } from '../../../../model/purchase-po.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
import { firstValueFrom } from 'rxjs';
import { AddQuotation } from '../../../../model/sales-addquo';
import { Quotation } from '../../../../model/sales-quotation.model';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.css'
})
export class SalesOrderComponent {


  spoDetails: AddQuotation[] = [];
  employee_id: string = ''
  quotation_id: string =''
  

  constructor(private salesOrderService :  SalesOrderService,  private snackBar: MatSnackBar, private router: Router  ) { }

  ngOnInit() {

    this.getClientDetails(); 

  }



  async getClientDetails() {
    try {
      const response = await firstValueFrom(this.salesOrderService.getSPO());
      this.spoDetails = response; // Store the fetched SPO details
      console.log('SPO Details:', this.spoDetails);
    } catch (error) {
      console.error('Error fetching SPO details:', error);
    }
  }

/*
  getSrfq(rfqId: any): string {
    if (typeof rfqId === 'object') {
      return rfqId.srfq  ;
    }
    return '';
  }
*/

getSrfq(quotation: Quotation): string {
  return quotation.srfq || '';
}


  async createPO(quotationId: string) {
    const newPo: Po = {
      _id: '', 
      employee_id: this.employee_id,
      quotation_id: quotationId as unknown as AddQuotation ,
      po: '', 
      status: 'not submitted',
      createdAt: new Date()
    };

    console.log('New PO:', newPo);

    try {
      const response = await firstValueFrom(this.salesOrderService.addPo(newPo));
      console.log('Sales order created:', response);

      this.getClientDetails(); // Refresh client details after creating a PO
      this.openSnackBar('Sales Order Confirmed'); // Notify the user
    } catch (error) {
      console.error('Error creating sales order:', error);
    }
  }

  
  getResponsible(detail: AddQuotation): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }



  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

}
