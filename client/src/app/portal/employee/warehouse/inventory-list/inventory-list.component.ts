import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdProductActions from '../../../../store/action/inventory-list.action'
import { Product } from '../../../../model/ad-product.model';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { AdCategoryService } from '../../../admin/category/ad-category/ad-category.service';
import { Category } from '../../../../model/ad-category.model';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrl: './inventory-list.component.css'
})
export class InventoryListComponent {
 
  product$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  categories: Category[] = [];

  constructor(private store: Store<AppState> , private adCategoryService: AdCategoryService) {
    this.product$ = this.store.pipe(select(state => state.product.products));
  
    this.categories$ = this.adCategoryService.getCategory()
    this.categories$.subscribe(categories => {
      this.categories = categories;
      console.log('Categories:', this.categories); // Log categories array
    }); 
    
  }


  ngOnInit(): void {
    this.store.dispatch(AdProductActions.loadInventory());
  
    this.adCategoryService.getCategory().subscribe(categories => {
      this.categories = categories;
      console.log('Categories:', this.categories);
    });
  
  }



  getCategory(categoryId: any): string {
    if (typeof categoryId === 'object') {
      return categoryId.category;
    }
    return '';
  }

}
