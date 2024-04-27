import { Component, OnInit } from '@angular/core';
import { PurchaseOrderService } from './purchase-order.service';
import { Router } from '@angular/router';
import { Invoice } from '../../../../model/invoice.model';
import { firstValueFrom } from 'rxjs';
import { Po } from '../../../../model/purchase-po.model';
import { Quotation } from '../../../../model/sales-quotation.model';
import { AddQuotation } from '../../../../model/sales-addquo';


@Component({
  selector: 'app-purchase-order',
  templateUrl: './purchase-order.component.html',
  styleUrl: './purchase-order.component.css'
})
export class PurchaseOrderComponent implements OnInit {


  poDetails: Po[] = []

  _id!: string; 
  employee_id: string = ''


  constructor(private purchaseService:PurchaseOrderService, private router: Router) { }

  ngOnInit() {
    this.getPoDetails(); 

  }


async getPoDetails() {
  try {
    const response = await firstValueFrom(this.purchaseService.getPo());
    this.poDetails = response; // Store the fetched PO details
    console.log(this.poDetails);
  } catch (error) {
    console.error('Error fetching PO details:', error);
  }
}

 

  async getPurchaseDetail(_id: string) {
    try {
      const data = await firstValueFrom(this.purchaseService.poSingle(_id));
      // Navigate to AddQuotationComponent with the ID parameter
      this.router.navigate(['/portal/purchase/purchase-order', _id]);
    } catch (error) {
      console.error('Error fetching quotation detail:', error);
    }
  }


/*
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
*/

getSpo(rfqId: AddQuotation): string {
  return rfqId.spo || '';
}

getSrfq(quotation: AddQuotation): string {
  return quotation.salesRFQ_id?.srfq || '';
}


getResponsible(detail: Po): string {
  if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
    return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
  }
  return 'Unknown';
}


}
