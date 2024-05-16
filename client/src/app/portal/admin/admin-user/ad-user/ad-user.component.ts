import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as AdUserActions from '../ad-user/store/ad-user.action';
import { Admin } from '../../../../model/ad-user.model'
import { Observable,map, Subject  } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ad-user',
  templateUrl: './ad-user.component.html',
  styleUrl: './ad-user.component.css'
})
export class AdUserComponent implements OnInit, OnDestroy  {
  _id: string = ''
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
 

  selectedAdmin: Admin | null = null;
   
   admins$: Observable<Admin[]>; 

   adminToEdit: Partial<Admin> = {};
   private destroy$ = new Subject<void>();


  @ViewChild('my_modal_1') modal!: ElementRef;
  @ViewChild('my_modal_2') modal2!: ElementRef;
  

  constructor(private store: Store<AppState>,  private formBuilder: FormBuilder, private snackBar: MatSnackBar) {
    
     this.admins$ = this.store.pipe(select(state => state.admin.admins), takeUntil(this.destroy$));
    
    
  }

  ngOnInit(): void {
   
    this.store.dispatch(AdUserActions.loadAdmin());

    this.calculateTotalPages();
    this.errorValidation()
  }

  errorValidation() {
     this.store.pipe(
      select(state => state.admin.error),
      takeUntil(this.destroy$)
    )
    .subscribe(error => {
      if (error) {
        this.openSnackBar(error);
      }
    });
  }



  onSubmit(): void {

    const admin = { fname: this.fname, lname: this.lname, email: this.email, password: this.password };
    console.log('Dispatching addAdmin action with admin:', admin);
    
    this.store.dispatch(AdUserActions.addAdmin(admin));
    
   
    this.fname = '';
    this.lname = '';
    this.email = '';
    this.password = '';
    this.modal.nativeElement.close();
  }

  isWhitespaceOnly(text: string | undefined): boolean {
    return !text || !text.trim(); 
  }
  
  checkWhitespace(event: any): void {
    
    this.fname = event.trim();
    this.lname = event.trim();
    this.email = event.trim();
    this.password = event.trim(); 
  }
  


  editAdmins(admin: Partial<Admin>) {
    this.adminToEdit = { ...admin, 
      fname: admin.fname || '',
      lname: admin.lname || '',
      email: admin.email || '',
      password: admin.password || ''
    };
    this.modal2.nativeElement.showModal(); 
  }


  editAdmin(admin: Partial<Admin>) {
  this.store.dispatch(AdUserActions.updateAdmin({ admin }));
    this.modal2.nativeElement.close();
  }

 

  deleteAdmin(admin: Admin): void {
    if (admin._id) {
      this.store.dispatch(AdUserActions.deleteAdmin({ adminId: admin._id }));
      console.log(`Deleted admin with ID: ${admin._id}`);
    } else {
      console.error('Admin or its ID is undefined');
    }
  }


  confirmDelete(admin: Admin): void {
    if (confirm('Are you sure you want to delete this admin?')) {
      this.deleteAdmin(admin);
    }
  }

  
  
  showModal(): void {
    this.modal.nativeElement.showModal();
  }

  get filteredRecords() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.admins$.pipe(
      map(records => records.filter(record => 
        record.fname.toLowerCase().includes(searchTermLower) || 
        record.lname.toLowerCase().includes(searchTermLower) ||
        record.email.toLowerCase().includes(searchTermLower) ||
        record.password.toLowerCase().includes(searchTermLower)
      ))
    );
  }

 

  calculateTotalPages(): void {
    this.admins$.pipe(takeUntil(this.destroy$)).subscribe(admins => {
      this.totalPages = Math.ceil(admins.length / this.itemsPerPage);
    });
  }


  getCurrentPageRecords(): Observable<Admin[]> {
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

  trackByAdmin(index: number, admin: Admin): string {
    return admin._id;
  }


  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete(); 
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top', 
    });
  }

  
}
