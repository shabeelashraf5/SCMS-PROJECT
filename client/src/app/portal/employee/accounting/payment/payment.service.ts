import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = environment.apiUrl + '/api/portal/accounting';

  constructor(private http: HttpClient) { }

  createPaymentIntent(amount: number , currency: string   ) {
    return this.http.post<any>(`${this.apiUrl}/financial-transaction/payment`, { amount, currency });
  } 

  createCheckoutSession(priceId: Number) {
    return this.http.post<any>(`${this.apiUrl}/financial-transaction/payment/create-checkout-session`, { priceId });
  }

  updatePaymentStatus(invoiceId: string) {
    return this.http.put<any>(`${this.apiUrl}/${invoiceId}/pay`, {});
  }

 
}
