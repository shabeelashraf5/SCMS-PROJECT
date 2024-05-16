import { Component , OnInit, OnDestroy} from '@angular/core';
import { SupplierService } from './supplier.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { AddPo } from '../../../../model/purchase-addpo.model';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrl: './supplier.component.css'
})
export class SupplierComponent implements OnInit, OnDestroy {

  supplierDetails: AddPo[] =[]
  supplierSubscription!: Subscription


  constructor(private supplierService: SupplierService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }

 

  getClientDetails(){

    this.supplierSubscription = this.supplierService.getSupplier().subscribe({
      next: (response) =>{
        this.supplierDetails = response; 
        console.log(this.supplierDetails);
      },
      error: (error) =>{
        console.error('Error fetching supplier details:', error);
      }
    })

  }



  trackBySupplier(index: number, supplier: AddPo): string {
    return supplier._id 
  }

  ngOnDestroy() {
    
    if(this.supplierSubscription){
      this.supplierSubscription.unsubscribe()
    }
  }

}
