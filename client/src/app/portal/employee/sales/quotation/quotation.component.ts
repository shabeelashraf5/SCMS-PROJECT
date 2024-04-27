import { Component, OnInit } from '@angular/core';
import { QuotationService } from './quotation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quotation } from '../../../../model/sales-quotation.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})

export class QuotationComponent implements OnInit {

  rfqDetails: Quotation[] = [];

  _id!: string; 
  employee_id: string = ''



  constructor(private salesService: QuotationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getRFQDetails(); 

  }

 

  async getRFQDetails() {
    try {
      const response = await firstValueFrom(this.salesService.getRFQ());
      this.rfqDetails = response; // Store the fetched RFQ details
      console.log(this.rfqDetails);
    } catch (error) {
      console.error('Error fetching RFQ details:', error);
    }
  }




async createRFQ() {
  const newRFQ: Quotation = {
    _id: '',
    employee_id: this.employee_id,
    srfq: '',
    status: 'not submitted',
    createdAt: new Date()
  };

  console.log('Creating new RFQ:', newRFQ);

  try {
    await firstValueFrom(this.salesService.addRFQ(newRFQ));
    console.log('RFQ created successfully');

    // After creating the RFQ, refresh the RFQ details
    await this.getRFQDetails(); // This could also be asynchronous
  } catch (error) {
    console.error('Error creating RFQ:', error);
    // You can also add further error handling here, like showing a snackbar or alert
  }
}




async getQuotationDetail(_id: string) {
  try {
    await firstValueFrom(this.salesService.qsingle(_id));
    this.router.navigate(['/portal/sales/quotations', _id]);
    console.log('Navigated to quotation detail for ID:', _id);
  } catch (error) {
    console.error('Error fetching quotation detail:', error);
  }
}

  
  getResponsible(detail: Quotation): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }


}
