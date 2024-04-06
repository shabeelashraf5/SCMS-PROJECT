import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdProductActions from '../ad-product/store/ad-product.action';
import { Product } from '../../../../model/ad-product.model';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { AdCategoryService } from '../../category/ad-category/ad-category.service'; 
import { Category } from '../../../../model/ad-category.model';
import { ObjectId, Types } from 'mongoose';


@Component({
  selector: 'app-ad-product',
  templateUrl: './ad-product.component.html',
  styleUrl: './ad-product.component.css'
})
export class AdProductComponent {

  _id: string = ''
  category_id: string = '';
  product: string = '';
  description: string = '';
  uom: string = '';
  price: number = 0;
  availability: string = '';

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;

  selectedProduct: Product | null = null;
  categories$: Observable<Category[]>;
  product$: Observable<Product[]>;

  categories: Category[] = [];

categoryMap: { [key: string]: string } = {};;

  productToEdit: Partial<Product> = {};

@ViewChild('my_modal_1') modal!: ElementRef;
@ViewChild('my_modal_2') modal2!: ElementRef;

constructor(private store: Store<AppState> , private adCategoryService: AdCategoryService) {
  this.product$ = this.store.pipe(select(state => state.product.products));

  this.categories$ = this.adCategoryService.getCategory()
  this.categories$.subscribe(categories => {
    this.categories = categories;
    console.log('Categories:', this.categories); // Log categories array
  }); 
  
}

ngOnInit(): void {
  this.store.dispatch(AdProductActions.loadProduct());

  this.adCategoryService.getCategory().subscribe(categories => {
    this.categories = categories;
    console.log('Categories:', this.categories);
  });

  this.calculateTotalPages();

}

onSubmit(): void {
  
  const product  = {

    category_id: this.category_id,
    product: this.product,
    description: this.description,
    uom: this.uom,
    price: this.price,
    availability: this.availability,
 
    
  };

  console.log('Employee object before dispatching:', product);

  this.store.dispatch(AdProductActions.addProduct(product));
 
  this.category_id = '';
  this.product = '';
  this.description = '';
  this.uom = '';
  this.price = 0;
  this.availability = '';
  
  this.modal.nativeElement.close(); 
  
} 


editProducts(product: Partial<Product>) {
  this.productToEdit = { ...product }; // Copy the user details to the userToEdit object
  this.modal2.nativeElement.showModal();
}


editProduct(product: Partial<Product>) {
  this.store.dispatch(AdProductActions.updateProduct({ product }));
    this.modal2.nativeElement.close();
  }


  deleteProduct(product: any) {
    if (product && product._id) {
      this.store.dispatch(AdProductActions.deleteProduct({ productId: product._id }));
      console.log(product._id);
    } else {
      console.error('Product or its ID is undefined');
    }
  } 

  confirmDelete(employee: any) {
    if (confirm('Are you sure you want to delete?')) {
        this.deleteProduct(employee);
    }
  }

/*
onFileSelected(event: any): void {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.image = file; // Assign the selected file to the image property
  }
}
*/

showModal(): void {
  this.modal.nativeElement.showModal();
}

get filteredRecords() {
  const searchTermLower = this.searchTerm.toLowerCase();
  return this.product$.pipe(
    map(records => records.filter(record => 
      record.product.toLowerCase().includes(searchTermLower) ||
      record.description.toLowerCase().includes(searchTermLower) ||
      record.uom.toLowerCase().includes(searchTermLower) ||
      record.availability.toLowerCase().includes(searchTermLower)
    ))
  );
}



getCategory(categoryId: any): string {
  if (typeof categoryId === 'object') {
    return categoryId.category;
  }
  return '';
}


calculateTotalPages(): void {
  this.product$.subscribe(product => {
    this.totalPages = Math.ceil(product.length / this.itemsPerPage);
  });
}

getCurrentPageRecords(): Observable<Product[]> {
  return this.filteredRecords.pipe(
    map(records => {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return records.slice(startIndex, startIndex + this.itemsPerPage);
    })
  );
}


previousPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
  }
}

// Method to navigate to the next page
nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
  }
}





}
