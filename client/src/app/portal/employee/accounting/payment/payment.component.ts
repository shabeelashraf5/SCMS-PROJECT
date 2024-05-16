import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialTransactionService } from '../financial-transaction/financial-transaction.service';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { PaymentService } from './payment.service';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription , firstValueFrom } from 'rxjs';
import { Invoice } from '../../../../model/invoice.model';
import { PaymentMethod } from '../../../../enums/payment.enum';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})



export class PaymentComponent implements OnInit, OnDestroy {


  transDetail!: Invoice

  quotationId!: string;

  _id!: string; 
  employee_id: string = ''
  invoice_id: string = '';

  selectedPaymentMethod: string = '';
  amount: number = 0;
  stripePromise: Promise<Stripe | null>;

  private routeSub!: Subscription;


  constructor(private http: HttpClient , private route: ActivatedRoute, private transService: FinancialTransactionService, private paymentService:  PaymentService ,  private snackBar: MatSnackBar, private router: Router  ) {
    this.stripePromise = loadStripe(environment.stripeKey);
   }


   ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.quotationId = params['id']; 
      this.fetchTransDetails(this.quotationId);
    });
  }




fetchTransDetails(quotation_id: string) {

  this.routeSub = this.transService.transSingle(quotation_id).subscribe({
    next: (response) => {
      this.transDetail = response;
      this.amount = this.getAmount(response);
    },error: (error) =>{
      console.error('Error fetching transaction details', error);
    }
  })
}



 
  getAmount(detail: Invoice): number {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.totalAmount; 
    }
    return 0; 
  }

  getPO(detail:  Invoice): string {
    if (detail &&  detail.purchase_id.po_id.po) {
      return detail.purchase_id.po_id.po; 
    }
    return '';
  }


  getSupplier(detail: Invoice): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.to; 
    }
    return '';
  }


  getCurrency(detail: Invoice): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.basis; 
    }
    return '';
  }

  getSRFQ(detail: Invoice): string {
    if (detail &&  detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }


  getSupplierRFQ(detail: Invoice): string {
    if (detail && detail.purchase_id) {
      return detail.purchase_id.supplierrfq; 
    }
    return '';
  }


async payNow() {
  const invoiceId = this.transDetail

  if (this.selectedPaymentMethod === PaymentMethod.Online) {
    try {

      const amountInCents = this.getAmount(this.transDetail) * 100;
      const response = await lastValueFrom(this.paymentService.createPaymentIntent(amountInCents, this.getCurrency(this.transDetail)) );
      this.openSnackBar('Payment process initiated. Please wait...');
      const stripe = await this.stripePromise;
      this.updatePaymentStatus(invoiceId);

      if (!stripe) {
        
        this.openSnackBar('Stripe could not be initialized. Please try again later.');
        return;
      }
      
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.sessionId
      });
      if (error) {
        console.error(error.message);
        this.openSnackBar('An error occurred during payment process.');
      } else {
       
         this.updatePaymentStatus(invoiceId);
       
        this.openSnackBar('Payment Successful');
        console.log('Redirecting to Checkout...');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      this.openSnackBar('An error occurred during payment process.');
    }
  } else {
    try {
      this.updatePaymentStatus(invoiceId);
      this.openSnackBar('Payment done by Cash or CDC');
      this.router.navigate(['/portal/accounting/financial-transaction']);
    } catch (error) {
      console.error('Error updating payment status:', error);
      this.openSnackBar('An error occurred while updating payment status.');
    }
  }
}



updatePaymentStatus(invoiceId: Invoice) {
  
  this.routeSub = this.paymentService.updatePaymentStatus(invoiceId._id).subscribe({
    next: (response) =>{

    },error: (error) => {
      console.error('Error updating payment status', error);
    }

  })

}



openSnackBar(message: string) {
  this.snackBar.open(message, 'Close', {
    duration: 4000,
    verticalPosition: 'top', 
    horizontalPosition: 'center', 
  });
}


ngOnDestroy() {
 
  if (this.routeSub) {
    this.routeSub.unsubscribe();
  }
}

}
