import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as AdUserActions from '../ad-user/store/ad-user.action';
import { Admin } from '../../../../model/ad-user.model'
import { Observable,map } from 'rxjs';

@Component({
  selector: 'app-ad-user',
  templateUrl: './ad-user.component.html',
  styleUrl: './ad-user.component.css'
})
export class AdUserComponent implements OnInit  {
  _id: string = ''
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  selectedAdmin: Admin | null = null;
   
   admins$: Observable<Admin[]>; 

   adminToEdit: Partial<Admin> = {};


  @ViewChild('my_modal_1') modal!: ElementRef;
  @ViewChild('my_modal_2') modal2!: ElementRef;
  

  constructor(private store: Store<AppState>) {
    this.admins$ = this.store.pipe(select(state => state.admin.admins));
    
  }

  ngOnInit(): void {
   
    this.store.dispatch(AdUserActions.loadAdmin());
  }

  onSubmit(): void {

    const admin = { fname: this.fname, lname: this.lname, email: this.email, password: this.password };
    console.log('Dispatching addAdmin action with admin:', admin);
    
    this.store.dispatch(AdUserActions.addAdmin(admin));
    
    // Clearing input fields
    this.fname = '';
    this.lname = '';
    this.email = '';
    this.password = '';
    this.modal.nativeElement.close();
  }


  editAdmins(admin: Partial<Admin>) {
    this.adminToEdit = { ...admin }; // Copy the user details to the userToEdit object
    this.modal2.nativeElement.showModal();
  }


  editAdmin(admin: Partial<Admin>) {
  this.store.dispatch(AdUserActions.updateAdmin({ admin }));
    this.modal2.nativeElement.close();
  }

  deleteAdmin(admin: any) {
    if (admin && admin._id) {
      this.store.dispatch(AdUserActions.deleteAdmin({ adminId: admin._id }));
      console.log(admin._id);
    } else {
      console.error('Category or its ID is undefined');
    }
  }
  

  showModal(): void {
    this.modal.nativeElement.showModal();
  }

  get filteredRecords() {
    const searchTermLower = this.searchTerm.toLowerCase();
    return this.admins$.pipe(
      map(records => records.filter(record => 
        record.fname.toLowerCase().includes(searchTermLower) || // Check if any of the fields match the search term
        record.lname.toLowerCase().includes(searchTermLower) ||
        record.email.toLowerCase().includes(searchTermLower) ||
        record.password.toLowerCase().includes(searchTermLower)
      ))
    );
  }


  
}
