import { Component } from '@angular/core';
import { PurchaseHistoryService } from './purchase-history.service';
import { AddPo } from '../../../../model/purchase-addpo.model';
import { Invoice } from '../../../../model/invoice.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent {

  purchaseDetails: any;

  
  _id!: string; 
  employee_id: string = ''
 
  
  constructor(private purchaseHistoryService :  PurchaseHistoryService, private snackBar: MatSnackBar, private router: Router  ) { }

  ngOnInit() {

    this.getClientDetails(); 

  }

  getClientDetails() {
    this.purchaseHistoryService.getpurchase().subscribe(
      (response) => {
        this.purchaseDetails = response; 
        console.log(this.purchaseDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  getPo(poId: any): string {
    if (typeof poId === 'object') {
      return poId.po  ;
    }
    return '';
  }


  getSrfq(quotationId: any): string {
    if (quotationId && quotationId.salesRFQ_id && quotationId.salesRFQ_id.srfq) {
      return quotationId.salesRFQ_id.srfq;
    }
    return '';
  }


  createInv(purchaseId: string) {
    console.log('purchaseId:', purchaseId); 
    const newInv: Invoice = {
      _id: '', 
      employee_id: this.employee_id,
      purchase_id: purchaseId, 
      invoice: '',
      delivery:'',
      transaction: '',
      payment:'to be Paid',
      status: 'not confirmed' 
    
    };
  
    console.log(newInv)
  
    this.purchaseHistoryService.addInv(newInv).subscribe(
      (response) => {
        this.getClientDetails() 
        console.log(response);
        this.openSnackBar('Purchase Confirmed');
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
