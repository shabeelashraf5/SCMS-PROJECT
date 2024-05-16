import { Component, OnInit, OnDestroy } from '@angular/core';
import { QuotationService } from './quotation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quotation } from '../../../../model/sales-quotation.model';
import { Subscription, firstValueFrom } from 'rxjs';
import { SubmitStatus } from '../../../../enums/submit-status.enum';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})

export class QuotationComponent implements OnInit, OnDestroy {

  rfqDetails: Quotation[] = [];

  _id!: string; 
  employee_id: string = ''
  quotationSubscription!: Subscription



  constructor(private salesService: QuotationService, private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getRFQDetails(); 

  }

 

  getRFQDetails(){

    this.quotationSubscription = this.salesService.getRFQ().subscribe({
      next: (response) =>{
        this.rfqDetails = response; 
        console.log(this.rfqDetails);
      },
      error: (error) =>{
        console.error('Error fetching RFQ details:', error);
      }
    })
  }



createRFQ() {

  const newRFQ: Quotation = {
    _id: '',
    employee_id: this.employee_id,
    srfq: '',
    status: SubmitStatus.NOTSUBMIT,
    createdAt: new Date()
  };

  console.log('Creating new RFQ:', newRFQ);

  this.quotationSubscription = this.salesService.addRFQ(newRFQ).subscribe({
    next: (response) =>{
      console.log('RFQ created successfully');
      this.getRFQDetails();
      this.openSnackBar('RFQ Created');

    },
    error: (error) =>{
      console.error('Error creating RFQ:', error);
    }
  })

}



getQuotationDetail(_id: string) {

  this.quotationSubscription = this.salesService.qsingle(_id).subscribe({
    next: (response) =>{
      this.router.navigate(['/portal/sales/quotations', _id]);
      console.log('Navigated to quotation detail for ID:', _id);
 
    },
    error: (error) => {
      console.error('Error fetching quotation detail:', error);

    }
  })
}


trackByQuotation(index: number, quotation: Quotation): string {
  return quotation._id; 
}

  
  getResponsible(detail: Quotation): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }

  ngOnDestroy() {

    if(this.quotationSubscription){
      this.quotationSubscription.unsubscribe()
    }
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }


}
