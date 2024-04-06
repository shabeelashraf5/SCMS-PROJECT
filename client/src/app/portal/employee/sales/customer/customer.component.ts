import { Component, OnInit } from '@angular/core';
import { AddQuotation } from '../../../../model/sales-addquo';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {


  clientDetails: any;


  constructor(private clientService: CustomerService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }

  getClientDetails() {
    this.clientService.getClient().subscribe(
      (response) => {
        this.clientDetails = response; 
        console.log(this.clientDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
