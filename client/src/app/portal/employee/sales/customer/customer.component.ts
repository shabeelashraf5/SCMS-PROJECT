import { Component, OnInit } from '@angular/core';
import { AddQuotation } from '../../../../model/sales-addquo';
import { CustomerService } from './customer.service';
import { Subscription, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {


  clientDetails: AddQuotation[] = [];
  customerSubscription!: Subscription


  constructor(private clientService: CustomerService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }


/*
  async getClientDetails() {
    try {
      const response = await firstValueFrom(this.clientService.getClient());
      this.clientDetails = response;
      console.log(this.clientDetails);
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  } */

  getClientDetails() {

    this.customerSubscription = this.clientService.getClient().subscribe({
      next: (response) =>{
        this.clientDetails = response;
        console.log(this.clientDetails);

      },error: (error) => {
        console.error('Error fetching client details:', error);
      }
    })

  }



  trackByCustomer(index: number, customer: AddQuotation): string {
    return customer._id; // Return a unique identifier for the product
  }
  

}
