import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as AdCategoryActions from '../ad-category/store/ad-category.action';
import { Category } from '../../../../model/ad-category.model';
import { takeUntil } from 'rxjs/operators';
import { Observable, map,  Subject  } from 'rxjs';
import { AdCategoryService } from './ad-category.service';
import { AdCategoryState } from './store/ad-category.state';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-ad-category',
  templateUrl: './ad-category.component.html',
  styleUrl: './ad-category.component.css'
})

export class AdCategoryComponent implements OnInit, OnDestroy   {
  
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
  private destroy$ = new Subject<void>();

  @ViewChild('my_modal_1') modal1!: ElementRef;
  @ViewChild('my_modal_2') modal2!: ElementRef;
  
  categoryToEdit: Partial<Category> = {};

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) {
   // this.categories$ = this.store.pipe(select(state => state.category.categories));
   this.categories$ = this.store.pipe(select(state => state.category.categories), takeUntil(this.destroy$));
    
  }

  ngOnInit(): void {

    
    
    this.store.dispatch(AdCategoryActions.loadCategory());

    this.calculateTotalPages();

    
  }

  
  onSubmit(): void {
   
    const category = this.category.trim(); // Ensure category is trimmed
    console.log('Dispatching addCategory action with category:', category);
    this.store.dispatch(AdCategoryActions.addCategory({ category })); // Pass the trimmed category string
    
    this.category = ''; // Clear the input field
    this.modal1.nativeElement.close(); // Close the modal
  }


  isWhitespaceOnly(text: string | undefined): boolean {
    return !text || !text.trim(); // Checks if the text is empty or only whitespace
  }

checkWhitespace(event: any): void {
  // This function can be used to trim input or alert when only whitespace is detected
  this.category = event.trim(); // Automatically trim the input
}



// Method to open the update modal and set the selected category

editCategories(category: Partial<Category>) {
  this.categoryToEdit = { ...category, category: category.category || '' }; // Copy the user details to the userToEdit object
  this.modal2.nativeElement.showModal();
}


editCategory(category: Partial<Category>) {
  this.store.dispatch(AdCategoryActions.updateCategory({ category }));
  this.modal2.nativeElement.close();
}



    showModal(): void {
    this.modal1.nativeElement.showModal();
  } 



  deleteCategory(category: Category): void {
    if (category._id) {
      this.store.dispatch(AdCategoryActions.deleteCategory({ categoryId: category._id }));
      console.log(`Deleted admin with ID: ${category._id}`);
    } else {
      console.error('Admin or its ID is undefined');
    }
  }


 


  confirmDelete(employee: Category): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this. deleteCategory(employee);
    }
  }


  



  get filteredRecords() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.categories$.pipe(
      map(records => records.filter(record => record.category.toLowerCase().includes(searchTermLower)))
    );
  }


  /*
  calculateTotalPages(): void {
    this.categories$.subscribe(categories => {
      this.totalPages = Math.ceil(categories.length / this.itemsPerPage);
    });
  } */

  calculateTotalPages(): void {
    this.categories$.pipe(takeUntil(this.destroy$)).subscribe(categories => {
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

  trackByCategory(index: number, category: Category): string {
    return category._id;
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit to trigger unsubscription
    this.destroy$.complete(); // Complete the Subject
  }


}