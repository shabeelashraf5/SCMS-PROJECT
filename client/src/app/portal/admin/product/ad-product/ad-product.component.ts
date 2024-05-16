import { Component, ViewChild, ElementRef, OnInit, OnDestroy,} from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdProductActions from '../ad-product/store/ad-product.action';
import { Product } from '../../../../model/ad-product.model';
import { Observable, map, Subject, takeUntil } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { AdCategoryService } from '../../category/ad-category/ad-category.service'; 
import { Category } from '../../../../model/ad-category.model';
import { ObjectId, Types } from 'mongoose';


@Component({
  selector: 'app-ad-product',
  templateUrl: './ad-product.component.html',
  styleUrl: './ad-product.component.css'
})

export class AdProductComponent implements OnInit, OnDestroy {
  
  _id: string = '';
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
  categories$!: Observable<Category[]>;
  product$: Observable<Product[]>;

  categories: Category[] = [];



  productToEdit: Partial<Product> = {};


  private destroy$ = new Subject<void>();

  @ViewChild('my_modal_1') modal!: ElementRef;
  @ViewChild('my_modal_2') modal2!: ElementRef;

  constructor(private store: Store<AppState>, private adCategoryService: AdCategoryService) {
    this.product$ = this.store.pipe(select(state => state.product.products));
  }

  ngOnInit(): void {
    this.store.dispatch(AdProductActions.loadProduct());


   
    this.categories$ = this.adCategoryService.getCategory();
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(categories => {
      this.categories = categories;
      console.log('Categories:', this.categories);
    }); 

    this.calculateTotalPages();
  }

  onSubmit(): void {
    const product = {
      category_id: this.category_id,
      product: this.product,
      description: this.description,
      uom: this.uom,
      price: this.price,
      availability: this.availability,
    };

    this.store.dispatch(AdProductActions.addProduct(product));

    
    

    this.modal.nativeElement.close();
  }

  isWhitespaceOnly(text: string | number | undefined): boolean {
    if (typeof text !== 'string') {
      
      return false;
    }
    return !text.trim(); 
  }
  
  checkWhitespace(event: any): void {
 
    this.product = event.trim();
    this.description = event.trim();
    this.uom = event.trim();
    this.price = event.trim();
    this.availability = event.trim(); 
     
  }

 

  editProducts(product: Partial<Product>) {
 
    this.productToEdit = {
      ...product,
      product: product.product || '',
      description: product.description || '',
      uom: product.uom || '',
      price: typeof product.price === 'number' ? product.price : undefined,
      availability: product.availability || '',
    };
    this.modal2.nativeElement.showModal(); 
  }

  editProduct(product: Partial<Product>) {
    this.store.dispatch(AdProductActions.updateProduct({ product }));
    this.modal2.nativeElement.close();
  }

  deleteProduct(product: Product): void {
    if (product._id) {
      this.store.dispatch(AdProductActions.deleteProduct({ productId: product._id }));
      console.log(`Deleted product with ID: ${product._id}`);
    } else {
      console.error('Product or its ID is undefined');
    }
  }

  confirmDelete(product: Product): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.deleteProduct(product);
    }
  }

  showModal(): void {
    this.modal.nativeElement.showModal();
  }

  get filteredRecords(): Observable<Product[]> {
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


  getCategory(categoryId: string | Category): string {
    if (typeof categoryId === 'object' && 'category' in categoryId) {
      return categoryId.category;
    }
    return 'Unknown Category'; 
  }

  trackByCategory(index: number, category: Category): string {
    return category._id 
  }

  trackByProduct(index: number, product: Product): string {
    return product._id;
  }

  calculateTotalPages(): void {
    this.product$.pipe(takeUntil(this.destroy$)).subscribe(product => {
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

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }
}