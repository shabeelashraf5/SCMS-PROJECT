import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddQuotation } from '../../../../model/sales-addquo';
import { CustomerService } from './customer.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, OnDestroy  {


  clientDetails: AddQuotation[] = [];
  customerSubscription!: Subscription
  uniqueClientNames: Set<string> = new Set();



  constructor(private clientService: CustomerService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }


  getClientDetails() {

    this.customerSubscription = this.clientService.getClient().subscribe({
      next: (response) =>{
        this.clientDetails = response;
        this.extractUniqueClientNames();
        console.log(this.clientDetails);

      },error: (error) => {
        console.error('Error fetching client details:', error);
      }
    })

  }

  
  extractUniqueClientNames() {
    this.clientDetails.forEach((quotation: AddQuotation) => {
      this.uniqueClientNames.add(quotation.clientname);
    });
  }


  trackByCustomer(index: number, customer: AddQuotation): string {
    return customer._id; 
  }
  
  ngOnDestroy() {

    if(this.customerSubscription){
      this.customerSubscription.unsubscribe()
    }
    
  }

}
