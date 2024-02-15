import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as AdCategoryActions from '../ad-category/store/ad-category.action';
import { Category } from '../../../../model/ad-category.model';
import { Observable, map } from 'rxjs';
import { AdCategoryService } from './ad-category.service';
import { AdCategoryState } from './store/ad-category.state';


@Component({
  selector: 'app-ad-category',
  templateUrl: './ad-category.component.html',
  styleUrl: './ad-category.component.css'
})
export class AdCategoryComponent implements OnInit  {
  

  userRecords: Category[] = [];
  _id: string = ''
  category: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  

  selectedCategory: Category | null = null;
  

  
  categories$: Observable<Category[]>; 
  

  @ViewChild('my_modal_1') modal1!: ElementRef;
  @ViewChild('my_modal_2') modal2!: ElementRef;
  
  categoryToEdit: Partial<Category> = {};

  constructor(private store: Store<AppState>) {
    this.categories$ = this.store.pipe(select(state => state.category.categories));
    
  }

  ngOnInit(): void {
    
    this.store.dispatch(AdCategoryActions.loadCategory());
  }

  onSubmit(): void {
    const category = this.category; // Assuming this.category is a string
    console.log('Dispatching addCategory action with category:', category);
    this.store.dispatch(AdCategoryActions.addCategory({ category })); // Pass only the category string
    
    this.category = '';
    this.modal1.nativeElement.close();
}

// Method to open the update modal and set the selected category

editCategories(category: Partial<Category>) {
  this.categoryToEdit = { ...category }; // Copy the user details to the userToEdit object
  this.modal2.nativeElement.showModal();
}


editCategory(category: Partial<Category>) {
  this.store.dispatch(AdCategoryActions.updateCategory({ category }));
  this.modal2.nativeElement.close();
}



    showModal(): void {
    this.modal1.nativeElement.showModal();
  } 


  
  deleteCategory(category: any) {
    if (category && category._id) {
      this.store.dispatch(AdCategoryActions.deleteCategory({ categoryId: category._id }));
      console.log(category._id);
    } else {
      console.error('Category or its ID is undefined');
    }
  }



  get filteredRecords() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.categories$.pipe(
      map(records => records.filter(record => record.category.toLowerCase().includes(searchTermLower)))
    );
  }

/*
  get pages() {
    const pageCount = Math.ceil(this.filteredRecords.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  } */
      

}