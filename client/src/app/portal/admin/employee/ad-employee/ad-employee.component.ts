import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdEmployeeActions from '../ad-employee/store/ad-employee.action';
import { Employee } from '../../../../model/ad-employee.model';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../../state/app.state';


@Component({
  selector: 'app-ad-employee',
  templateUrl: './ad-employee.component.html',
  styleUrl: './ad-employee.component.css'
})
export class AdEmployeeComponent {
  
  _id: string = ''
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  position: string = '';
  area: string = '';
  department: string = '';
  //image: any;

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  selectedEmployee: Employee | null = null;
  
  employees$: Observable<Employee[]>;
  employeeToEdit: Partial<Employee> = {};

@ViewChild('my_modal_1') modal!: ElementRef;
@ViewChild('my_modal_2') modal2!: ElementRef;

constructor(private store: Store<AppState>) {
  this.employees$ = this.store.pipe(select(state => state.employee.employees));
}

ngOnInit(): void {
  this.store.dispatch(AdEmployeeActions.loadEmployee());
}

onSubmit(): void {
  
  const employee  = {

    fname: this.fname,
    lname: this.lname,
    email: this.email,
    password: this.password,
    position: this.position,
    area: this.area,
    department: this.department,
   //image: this.image ? this.image.name : '',
    
  };

  console.log('Employee object before dispatching:', employee);

  this.store.dispatch(AdEmployeeActions.addEmployee(employee));
 
  this.fname = '';
  this.lname = '';
  this.email = '';
  this.password = '';
  this.position = '';
  this.area = '';
  this.department = '';

  //this.image = '';
  
  this.modal.nativeElement.close(); 
  
} 


editEmployees(employee: Partial<Employee>) {
  this.employeeToEdit = { ...employee }; // Copy the user details to the userToEdit object
  this.modal2.nativeElement.showModal();
}


editEmployee(employee: Partial<Employee>) {
  this.store.dispatch(AdEmployeeActions.updateEmployee({ employee }));
    this.modal2.nativeElement.close();
  }


  deleteEmployee(employee: any) {
    if (employee && employee._id) {
      this.store.dispatch(AdEmployeeActions.deleteEmployee({ employeeId: employee._id }));
      console.log(employee._id);
    } else {
      console.error('Category or its ID is undefined');
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
  return this.employees$.pipe(
    map(records => records.filter(record => 
      record.fname.toLowerCase().includes(searchTermLower) || // Check if any of the fields match the search term
      record.lname.toLowerCase().includes(searchTermLower) ||
      record.email.toLowerCase().includes(searchTermLower) ||
      record.password.toLowerCase().includes(searchTermLower) ||
      record.area.toLowerCase().includes(searchTermLower) ||
      record.position.toLowerCase().includes(searchTermLower)||
      record.department.toLowerCase().includes(searchTermLower)
    ))
  );
}


}




