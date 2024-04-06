import { Component } from '@angular/core';
import { SupplierService } from './supplier.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent {

  supplierDetails: any;


  constructor(private supplierService: SupplierService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }

  getClientDetails() {
    this.supplierService.getSupplier().subscribe(
      (response) => {
        this.supplierDetails = response; 
        console.log(this.supplierDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
