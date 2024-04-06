import { Component } from '@angular/core';
import { SalesOrderService } from './sales-order.service';
import { Po } from '../../../../model/purchase-po.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sales-order',
  templateUrl: './sales-order.component.html',
  styleUrl: './sales-order.component.css'
})
export class SalesOrderComponent {


  spoDetails: any;
  employee_id: string = ''
  quotation_id: string =''
  

  constructor(private salesOrderService :  SalesOrderService,  private snackBar: MatSnackBar, private router: Router  ) { }

  ngOnInit() {

    this.getClientDetails(); 

  }

  getClientDetails() {
    this.salesOrderService.getSPO().subscribe(
      (response) => {
        this.spoDetails = response; 
        console.log(this.spoDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getSrfq(rfqId: any): string {
    if (typeof rfqId === 'object') {
      return rfqId.srfq  ;
    }
    return '';
  }


  createPO(quotationId: string) {
    const newPo: Po = {
      _id: '', 
      employee_id: this.employee_id,
      quotation_id: quotationId, // Set quotation_id here
      po: '', 
      status: 'not submitted',
      
      
    };

    console.log(newPo)

  
    this.salesOrderService.addPo(newPo).subscribe(
      (response) => {
        
        this.getClientDetails(); 
        this.openSnackBar('Sales Order Confirmed');
        console.log(response);
      },
      (error) => {
        console.error(error);
     
      }
    );
  }

  
  getResponsible(detail: any): string {
    if (detail && detail.employee_id) {
      return detail.employee_id.fname + ' ' + detail.employee_id.lname ; 
    }
    return '';
  }



  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

}
