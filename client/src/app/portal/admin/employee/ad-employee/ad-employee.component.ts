import { Component, ViewChild, ElementRef, OnInit, OnDestroy, } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdEmployeeActions from '../ad-employee/store/ad-employee.action';
import { Employee } from '../../../../model/ad-employee.model';
import { Observable, map, Subject, of } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../../../../../environment/environment';


@Component({
  selector: 'app-ad-employee',
  templateUrl: './ad-employee.component.html',
  styleUrl: './ad-employee.component.css'
})

export class AdEmployeeComponent implements OnInit, OnDestroy {
  
  _id: string = ''
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  position: string = '';
  area: string = '';
  department: string = '';
  image: string = '';

  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 1;
  isImageSelected: boolean = false;

  selectedEmployee: Employee | null = null;

  
  
  employees$: Observable<Employee[]>;
  employeeToEdit: Partial<Employee> = {};
  private destroy$ = new Subject<void>();

  selectedFile: File | null = null;

@ViewChild('my_modal_1') modal!: ElementRef;
@ViewChild('my_modal_2') modal2!: ElementRef;
@ViewChild('imageInput') imageInput!: ElementRef;

constructor(private store: Store<AppState>) {
  this.employees$ = this.store.pipe(select(state => state.employee.employees));
}

/*
ngOnInit(): void {
  this.store.dispatch(AdEmployeeActions.loadEmployee());

  this.calculateTotalPages();
}
*/

ngOnInit(): void {
  // Use takeUntil to ensure proper unsubscription
  this.employees$.pipe(takeUntil(this.destroy$)).subscribe(employees => {
    console.log('Employees:', employees);
  });

  this.store.dispatch(AdEmployeeActions.loadEmployee());
  this.calculateTotalPages();
}


onSubmit(): void {
  
 const formData = new FormData();
  formData.append('fname', this.fname); 
  formData.append('lname', this.lname);
  formData.append('email', this.email);
  formData.append('password', this.password);
  formData.append('position', this.position);
  formData.append('area', this.area);
  formData.append('department', this. department);
  if (this.selectedFile) {
    formData.append('image', this.selectedFile);
  }

  console.log('FormData object before dispatching:', formData);

  this.store.dispatch(AdEmployeeActions.addEmployee({formData}));
 
  this.fname = '';
  this.lname = '';
  this.email = '';
  this.password = '';
  this.position = '';
  this.area = '';
  this.department = '';

  this.image = '';
  
  this.modal.nativeElement.close(); 
  
} 

isWhitespaceOnly(text: string | undefined): boolean {
  return !text || !text.trim(); // Checks if the text is empty or only whitespace
}

checkWhitespace(event: any): void {
  // This function can be used to trim input or alert when only whitespace is detected
  this.fname = event.trim();
  this.lname = event.trim();
  this.email = event.trim();
  this.password = event.trim();
  this.position = event.trim(); 
  this.area = event.trim(); 
  this.department = event.trim();  // Automatically trim the input
}


editEmployees(employee: Partial<Employee>) {
  this.employeeToEdit = {
    ...employee,
    fname: employee.fname || '', // Ensure default empty string
    lname: employee.lname || '',
    email: employee.email || '',
    password: employee.password || '',
    position: employee.position || '',
    department: employee.department || '',
    area: employee.area || '',
  };
  this.modal2.nativeElement.showModal(); // Open the modal
}


editEmployee(employee: Partial<Employee>) {
  // Assuming `_id` is a property of `employee`
  const _id = employee._id;

  // Ensure _id is defined before dispatching the action
  if (_id !== undefined) {
    // Create a new FormData object
    const formData = new FormData();

    // Check and append each property if it's defined
    if (employee.fname) formData.append('fname', employee.fname);
    if (employee.lname) formData.append('lname', employee.lname);
    if (employee.email) formData.append('email', employee.email);
    if (employee.password) formData.append('password', employee.password);
    if (employee.position) formData.append('position', employee.position);
    if (employee.area) formData.append('area', employee.area);
    if (employee.department) formData.append('department', employee.department);

    // Check if a new image is selected
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Dispatch the action with updated details
    this.store.dispatch(AdEmployeeActions.updateEmployee({ _id, formData }));
  } else {
    // Handle the case where _id is undefined
    console.error('Employee ID is undefined');
  }

  // Close the modal
  this.modal2.nativeElement.close();
}



  deleteEmployee(employee: Employee): void {
    if (employee._id) {
      this.store.dispatch(AdEmployeeActions.deleteEmployee({ employeeId: employee._id }));
      console.log(`Deleted admin with ID: ${employee._id}`);
    } else {
      console.error('Admin or its ID is undefined');
    }
  }



showModal(): void {
  this.modal.nativeElement.showModal();
}



onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement; 

  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
    console.log('Selected file:', this.selectedFile);
    this.image = this.selectedFile.name;
    console.log('Image filename:', this.image);
    this.isImageSelected = true;
  } else {
    this.image = 'dp.jpg'; // Set default image filename
    console.log('Default image filename is:', this.image); 
    this.isImageSelected = false;
  }
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

getImageUrl(imageFileName: string): string {
  return environment.apiUrl + `/images/${imageFileName}`; // Adjust the URL based on your backend server configuration
}

/*
calculateTotalPages(): void {
  this.employees$.subscribe(employees => {
    this.totalPages = Math.ceil(employees.length / this.itemsPerPage);
  });
}*/

calculateTotalPages(): void {
  this.employees$.pipe(takeUntil(this.destroy$)).subscribe(employees => {
    this.totalPages = Math.ceil(employees.length / this.itemsPerPage);
  });
}

getCurrentPageRecords(): Observable<Employee[]> {
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



confirmDelete(employee: Employee): void {
  if (confirm('Are you sure you want to delete this admin?')) {
    this.deleteEmployee(employee);
  }
}

trackByEmployee(index: number, employee: Employee): string {
  return employee._id;
}


ngOnDestroy(): void {
  this.destroy$.next(); // Emit to trigger unsubscription
  this.destroy$.complete(); // Complete the Subject to ensure it's cleaned up
}


}




