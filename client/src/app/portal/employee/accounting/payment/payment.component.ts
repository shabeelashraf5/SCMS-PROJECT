import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialTransactionService } from '../financial-transaction/financial-transaction.service';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { PaymentService } from './payment.service';
import { environment } from '../../../../../environment/environment';
import { StripeService } from '../../../../service/stripe.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


declare var stripe: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})


export class PaymentComponent implements OnInit {

  

  transDetail: any
  shipmentDetail: any
  quotation_id: any;

  _id!: string; 
  employee_id: string = ''
  invoice_id: string = '';

  selectedPaymentMethod: string = '';
  amount: number = 0;
  currency: string = 'USD';
  stripePromise: any;

 

  constructor(private http: HttpClient , private route: ActivatedRoute, private transService: FinancialTransactionService, private paymentService:  PaymentService , private stripeService: StripeService, private snackBar: MatSnackBar, private router: Router  ) {
    this.stripePromise = loadStripe(environment.stripeKey);
   
   

   }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quotation_id = params['id']; 
  
      this.fetchTransDetails(this.quotation_id);
    });



  }


  fetchTransDetails(quotation_id: any) {
    this.transService.transSingle(quotation_id).subscribe(
      (transData: any) => {
        if (transData) {
          this.transDetail = transData;
          this.amount = this.getAmount(transData);
        }
      },
      error => {
        console.error('Error fetching PO details', error);
      }
    );
  }


 


 
  getAmount(detail: any): number {
    if (detail && detail.purchase_id) {
      return parseFloat(detail.purchase_id.totalAmount); // Convert string to number
    }
    return 0; // Or any default value if the amount is not available
  }

  getPO(detail: any): string {
    if (detail &&  detail.purchase_id.po_id.po) {
      return detail.purchase_id.po_id.po; 
    }
    return '';
  }


  getSupplier(detail: any): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.to; 
    }
    return '';
  }


  getCurrency(detail: any): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.basis; 
    }
    return '';
  }

  getSRFQ(detail: any): string {
    if (detail &&  detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }


  getSupplierRFQ(detail: any): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.supplierrfq; 
    }
    return '';
  }


/*
  async payNow() {
    if (this.selectedPaymentMethod === 'online') {
        try {
            const response = await this.paymentService.createPaymentIntent(this.amount, this.currency).toPromise();
            await this.updatePaymentStatus();
            this.openSnackBar('Payment done Successfully');
            console.log("Session ID:", response.sessionId); 
            const stripe = await this.stripePromise;
            const { error } = await stripe.redirectToCheckout({
                sessionId: response.sessionId
            });
            if (error) {
                console.error(error.message);
                
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
          
        }
    } else {

      try {
        await this.updatePaymentStatus();
        this.openSnackBar('Payment done by Cash or CDC');
        this.router.navigate(['/accounting/financial-transaction']);
      } catch (error) {
        console.error('Error updating payment status:', error);
      } 
    }
} */

/*
async payNow() {
  if (this.selectedPaymentMethod === 'online') {
    try {
      const response = await this.paymentService.createPaymentIntent(this.amount, this.currency).toPromise();
      this.openSnackBar('Payment process initiated. Please wait...');
      const stripe = await this.stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId
      });
      if (error) {
        console.error(error.message);
        this.openSnackBar('An error occurred during payment process.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      this.openSnackBar('An error occurred during payment process.');
    }
  } else {
    try {
      await this.updatePaymentStatus();
      this.openSnackBar('Payment done by Cash or CDC');
      this.router.navigate(['/accounting/financial-transaction']);
    } catch (error) {
      console.error('Error updating payment status:', error);
      this.openSnackBar('An error occurred while updating payment status.');
    }
  }
}*/


async payNow() {
  if (this.selectedPaymentMethod === 'online') {
    try {
      const amountInCents = this.getAmount(this.transDetail) * 100;
      const response = await this.paymentService.createPaymentIntent(amountInCents, this.getCurrency(this.transDetail)).toPromise();
      this.openSnackBar('Payment process initiated. Please wait...');
      const stripe = await this.stripePromise;
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId
      });
      if (error) {
        console.error(error.message);
        this.openSnackBar('An error occurred during payment process.');
      } else {
        // Payment successful, update payment status
        await this.updatePaymentStatus();
        // Show Payment Successful Snackbar
        this.openSnackBar('Payment Successful');
        console.log('Redirecting to Checkout...');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      this.openSnackBar('An error occurred during payment process.');
    }
  } else {
    try {
      await this.updatePaymentStatus();
      this.openSnackBar('Payment done by Cash or CDC');
      this.router.navigate(['/portal/accounting/financial-transaction']);
    } catch (error) {
      console.error('Error updating payment status:', error);
      this.openSnackBar('An error occurred while updating payment status.');
    }
  }
}




async updatePaymentStatus() {
  try {
    const invoiceId = this.transDetail._id;
    await this.http.put(`http://localhost:3000/api/portal/accounting/${invoiceId}/pay`, {}).toPromise();
  } catch (error) {
    throw new Error('Error updating payment status');
  }
}


openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 4000,
    verticalPosition: 'top', // Set position to top
    horizontalPosition: 'center', // Set position to center horizontally
  });
}



}
