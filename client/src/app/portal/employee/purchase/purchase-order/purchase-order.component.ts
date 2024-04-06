import { Component } from '@angular/core';
import { PurchaseOrderService } from './purchase-order.service';
import { Router } from '@angular/router';
import { Invoice } from '../../../../model/invoice.model';

@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent {




  poDetails: any;

  _id!: string; 
  employee_id: string = ''



  constructor(private purchaseService:PurchaseOrderService, private router: Router) { }

  ngOnInit() {
    this.getPoDetails(); // Call getRFQDetails() when the component initializes
/*
    this.route.params.subscribe(params => {
      const _id = params['id']; // Get the 'id' parameter from the route
      this.getQuotationDetail(_id);
    });*/
  }


  getPoDetails() {
    this.purchaseService.getPo().subscribe(
      (response) => {
        this.poDetails = response; // Store the fetched RFQ details
        console.log(this.poDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  
  getPurchaseDetail(_id: string) {
    this.purchaseService.poSingle(_id).subscribe(
      (data) => {
        // Navigate to AddQuotationComponent with the ID parameter
        this.router.navigate(['/purchase/purchase-order', _id]);
      },
      (error) => {
        console.error('Error fetching quotation detail:', error);
      }
    );
  }



  getSpo(rfqId: any): string {
    if (typeof rfqId === 'object') {
      return rfqId.spo  ;
    }
    return '';
  }



  getSrfq(quotationId: any): string {
  if (quotationId && quotationId.salesRFQ_id && quotationId.salesRFQ_id.srfq) {
    return quotationId.salesRFQ_id.srfq;
  }
  return '';
}


getResponsible(detail: any): string {
  if (detail && detail.employee_id) {
    return detail.employee_id.fname + ' ' + detail.employee_id.lname ; 
  }
  return '';
}



}
