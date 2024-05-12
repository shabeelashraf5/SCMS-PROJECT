import { Component, OnInit, OnDestroy } from '@angular/core';
import { SalesOrderService } from './sales-order.service';
import { Po } from '../../../../model/purchase-po.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 
import { Subscription, firstValueFrom } from 'rxjs';
import { AddQuotation } from '../../../../model/sales-addquo';
import { Quotation } from '../../../../model/sales-quotation.model';
import { SubmitStatus } from '../../../../enums/submit-status.enum';
import { response } from 'express';

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.css'
})

export class SalesOrderComponent implements OnInit, OnDestroy {


  spoDetails: AddQuotation[] = [];
  employee_id: string = ''
  quotation_id: string =''
  confirmedQuotations: Set<string> = new Set();
  salesOrderSubscription!: Subscription
  

  constructor(private salesOrderService :  SalesOrderService,  private snackBar: MatSnackBar, private router: Router  ) { }

  ngOnInit() {

    this.loadConfirmedQuotations()
    this.getClientDetails(); 

  }

/*
  async getClientDetails() {
    try {
      const response = await firstValueFrom(this.salesOrderService.getSPO());
      this.spoDetails = response; 
      console.log('SPO Details:', this.spoDetails);
    } catch (error) {
      console.error('Error fetching SPO details:', error);
    }
  } */

  getClientDetails() {

   this.salesOrderSubscription =  this.salesOrderService.getSPO().subscribe({
      next: (response) =>{
        this.spoDetails = response; 
        console.log('SPO Details:', this.spoDetails);
      },
      error: (error) => {
        console.error('Error fetching SPO details:', error);
      }
    })
 
  }


  loadConfirmedQuotations() {
    const storedQuotations = localStorage.getItem('confirmedQuotations');
    if (storedQuotations) {
      const parsedQuotations = JSON.parse(storedQuotations);
      this.confirmedQuotations = new Set(parsedQuotations);
    }
  }



getSrfq(quotation: Quotation): string {
  return quotation.srfq || '';
}


/*
  async createPO(quotationId: string) {
    if (this.confirmedQuotations.has(quotationId)) {
      return; 
    }

    const newPo: Po = {
      _id: '',
      employee_id: this.employee_id,
      quotation_id: quotationId as unknown as AddQuotation,
      po: '',
      status: SubmitStatus.NOTSUBMIT,
      createdAt: new Date(),
    };

    try {
      const response = await firstValueFrom(
        this.salesOrderService.addPo(newPo)
      );
      this.confirmedQuotations.add(quotationId); // Mark as confirmed
      localStorage.setItem('confirmedQuotations', JSON.stringify([...this.confirmedQuotations])
      ); // Update local storage

      this.getClientDetails();
      this.openSnackBar('Sales Order Confirmed');
    } catch (error) {
      console.error('Error creating sales order:', error);
    }
  }

  */

  createPO(quotationId: string) {

    if (this.confirmedQuotations.has(quotationId)) {
      return; 
    }

    const newPo: Po = {
      _id: '',
      employee_id: this.employee_id,
      quotation_id: quotationId as unknown as AddQuotation,
      po: '',
      status: SubmitStatus.NOTSUBMIT,
      createdAt: new Date(),
    };

    this.salesOrderSubscription = this.salesOrderService.addPo(newPo).subscribe({
      next: (response) =>{
        this.confirmedQuotations.add(quotationId); // Mark as confirmed
        localStorage.setItem('confirmedQuotations', JSON.stringify([...this.confirmedQuotations]))
        this.getClientDetails();
        this.openSnackBar('Sales Order Confirmed');

      },error: (error) => {
        console.error('Error creating sales order:', error);
      }
    })
  }


  getResponsible(detail: AddQuotation): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }

  
  trackBySalesOrder(index: number, salesOrder: AddQuotation): string {
    return salesOrder._id; // Return a unique identifier for the product
  }



  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

  ngOnDestroy() {

    if(this.salesOrderSubscription){
      this.salesOrderSubscription.unsubscribe()
    }
    
  }

}
