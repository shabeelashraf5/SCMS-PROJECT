import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as AdCategoryActions from '../ad-category/store/ad-category.action';
import { Category } from '../../../../model/ad-category.model';
import { Observable, map } from 'rxjs';
import { AdCategoryService } from './ad-category.service';
import { AdCategoryState } from './store/ad-category.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-ad-category',
  templateUrl: './ad-category.component.html',
  styleUrl: './ad-category.component.css'
})
export class AdCategoryComponent implements OnInit  {
  
  categoryForm!: FormGroup;

  userRecords: Category[] = [];
  _id: string = ''
  category: string = '';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  

  selectedCategory: Category | null = null;
  

  
  categories$: Observable<Category[]>; 
  

  @ViewChild('my_modal_1') modal1!: ElementRef;
  @ViewChild('my_modal_2') modal2!: ElementRef;
  
  categoryToEdit: Partial<Category> = {};

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
    this.categories$ = this.store.pipe(select(state => state.category.categories));
    
  }

  ngOnInit(): void {

    
    
    this.store.dispatch(AdCategoryActions.loadCategory());

    this.calculateTotalPages();

    
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


  confirmDelete(employee: any) {
    if (confirm('Are you sure you want to delete?')) {
        this.deleteCategory(employee);
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

  calculateTotalPages(): void {
    this.categories$.subscribe(categories => {
      this.totalPages = Math.ceil(categories.length / this.itemsPerPage);
    });
  }

  getCurrentPageRecords(): Observable<Category[]> {
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