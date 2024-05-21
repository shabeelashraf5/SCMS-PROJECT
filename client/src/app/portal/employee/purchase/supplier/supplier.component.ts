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
  filteredEmployees: AddPo[] = [];
  searchQuery: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 10;


  constructor(private supplierService: SupplierService ) { }


  ngOnInit() {

    this.getClientDetails(); 

  }

 

  getClientDetails(){

    this.supplierSubscription = this.supplierService.getSupplier().subscribe({
      next: (response) =>{
        this.supplierDetails = response; 
        this.filteredEmployees = response
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

  filterEmployees() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.supplierDetails.filter(emp => 
      emp.to.toLowerCase().includes(query) || 
      emp.email.toLowerCase().includes(query) 
    );
    this.currentPage = 1;
  }

}
