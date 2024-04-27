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



enum PaymentMethod {
  Online = 'online',
  Cash = 'cash',
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})



export class PaymentComponent implements OnInit, OnDestroy {


  transDetail!: Invoice

  quotation_id: any;

  _id!: string; 
  employee_id: string = ''
  invoice_id: string = '';

  selectedPaymentMethod: string = '';
  amount: number = 0;
  stripePromise: any;

  private routeSub!: Subscription;


  constructor(private http: HttpClient , private route: ActivatedRoute, private transService: FinancialTransactionService, private paymentService:  PaymentService ,  private snackBar: MatSnackBar, private router: Router  ) {
    this.stripePromise = loadStripe(environment.stripeKey);
   
   

   }


  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.quotation_id = params['id'];
      this.fetchTransDetails(this.quotation_id);
    });
  }



async fetchTransDetails(quotation_id: string) {
  try {
    const transData = await firstValueFrom(this.transService.transSingle(quotation_id));

    if (transData) {
      this.transDetail = transData;
      this.amount = this.getAmount(transData);
    }
  } catch (error) {
    console.error('Error fetching transaction details', error);
  }
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
  if (this.selectedPaymentMethod === PaymentMethod.Online) {
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
       
        await this.updatePaymentStatus();
       
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
    await firstValueFrom(
      this.http.put(environment.apiUrl + `/api/portal/accounting/${invoiceId}/pay`, {})
    );
  } catch (error) {
    throw new Error('Error updating payment status');
  }
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
