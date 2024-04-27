import { Component , OnInit} from '@angular/core';
import { SupplierService } from './supplier.service';
import { firstValueFrom } from 'rxjs';
import { AddPo } from '../../../../model/purchase-addpo.model';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit {

  supplierDetails: AddPo[] =[]


  constructor(private supplierService: SupplierService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }

 

  async getClientDetails() {
    try {
      const response = await firstValueFrom(this.supplierService.getSupplier());
      this.supplierDetails = response; // Store the fetched supplier details
      console.log(this.supplierDetails);
    } catch (error) {
      console.error('Error fetching supplier details:', error);
    }
  }

}
