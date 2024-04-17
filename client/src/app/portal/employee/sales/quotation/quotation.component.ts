import { Component, OnInit } from '@angular/core';
import { QuotationService } from './quotation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Quotation } from '../../../../model/sales-quotation.model';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.css'
})

export class QuotationComponent implements OnInit {

  rfqDetails: any;

  _id!: string; 
  employee_id: string = ''



  constructor(private salesService: QuotationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getRFQDetails(); // Call getRFQDetails() when the component initializes
/*
    this.route.params.subscribe(params => {
      const _id = params['id']; // Get the 'id' parameter from the route
      this.getQuotationDetail(_id);
    });*/
  }


  getRFQDetails() {
    this.salesService.getRFQ().subscribe(
      (response) => {
        this.rfqDetails = response; // Store the fetched RFQ details
        console.log(this.rfqDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }


  
  createRFQ() {
    const newRFQ: Quotation = {
      _id: '', 
      employee_id: this.employee_id,
      srfq: '', 
      status: 'not submitted'
    };

    console.log(newRFQ)
  
    this.salesService.addRFQ(newRFQ).subscribe(
      (response) => {
        console.log(response);
      
        this.getRFQDetails();
      },
      (error) => {
        console.error(error);
     
      }
    );
  }



  getQuotationDetail(_id: string) {
    this.salesService.qsingle(_id).subscribe(
      (data) => {
        // Navigate to AddQuotationComponent with the ID parameter
        this.router.navigate(['/portal/sales/quotations', _id]);
      },
      (error) => {
        console.error('Error fetching quotation detail:', error);
      }
    );
  }


  
  getResponsible(detail: any): string {
    if (detail && detail.employee_id) {
      return detail.employee_id.fname + ' ' + detail.employee_id.lname ; 
    }
    return '';
  }


}
