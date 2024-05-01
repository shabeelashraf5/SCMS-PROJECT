import { Component, ViewChild, ElementRef, OnInit, OnDestroy  } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdProductActions from '../../../../store/action/inventory-list.action'
import { Product } from '../../../../model/ad-product.model';
import { Observable, map, Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppState } from '../../../../state/app.state';
import { AdCategoryService } from '../../../admin/category/ad-category/ad-category.service';
import { Category } from '../../../../model/ad-category.model';



@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})

export class InventoryListComponent implements OnInit, OnDestroy {
 
  product$: Observable<Product[]>;

  categories: Category[] = [];
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState> , private adCategoryService: AdCategoryService) {

 
    this.product$ = this.store.pipe(select(state => state.product.products), takeUntil(this.destroy$));

   
  }


  ngOnInit(): void {
    this.store.dispatch(AdProductActions.loadInventory());
  
    this.adCategoryService.getCategory().pipe(takeUntil(this.destroy$)).subscribe(categories => {
      this.categories = categories;
      console.log('Categories:', this.categories);
    });
  
  }


  getCategory(categoryId: string | Category): string {
    if (typeof categoryId === 'object' && 'category' in categoryId) {
      return categoryId.category;
    }
    return 'Unknown Category'; // Provide a default value or fallback if it's not valid
  }

  trackByProductId(index: number, product: Product): string {
    return product._id; // Return a unique identifier for the product
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to trigger unsubscription
    this.destroy$.complete(); // Complete the subject to ensure it's cleaned up
  }

}
