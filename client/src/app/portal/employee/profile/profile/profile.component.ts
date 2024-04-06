import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdProfileActions from '../../profile/profile/store/profile.action';
import { Profile } from '../../../../model/emp-profile.model';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from './profile.service';
import * as AdEmployeeActions from '../../../admin/employee/ad-employee/store/ad-employee.action'
import { AdEmployeeService } from '../../../admin/employee/ad-employee/ad-employee.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit {


  employeeProfile!: Employee;
  isImageSelected: boolean = false;

  //employees$: Observable<Employee[]>;

  _id!: string; 
  image: string = ''
  selectedFile!: File; 

  @ViewChild('my_modal_2') modal2!: ElementRef;


  constructor(private store: Store<AppState>, private employeeService: ProfileService ,  private emService: AdEmployeeService) { 

  //this.employees$ = this.store.pipe(select(state => state.employee.employees));


  }

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.employeeService.getProfile().subscribe(
      (profile: Employee) => {
        this.employeeProfile = profile;
      },
      (error) => {
        console.error('Error fetching employee profile:', error);
      }
    );
  }



  getImageUrl(imageFileName: string): string {
    return `http://localhost:3000/images/${imageFileName}`; 
  }



  editProfileEmployee(employee: Partial<Employee>) {
    const _id = employee._id;

    if (_id !== undefined) {
      const formData = new FormData();

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.emService.updateEmployee(_id, formData).subscribe(() => {
        // Handle success if needed
        this.loadProfile();
      }, error => {
        console.error('Error updating profile employee:', error);
      });
    } else {
      console.error('Employee ID is undefined');
    }

    this.modal2.nativeElement.close();

  }





  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0] as File;
      console.log('Selected file:', this.selectedFile);
      this.image = this.selectedFile.name;
      console.log('Image filename:', this.image);
      this.isImageSelected = true;
    } else {
      this.image = 'dp.jpg'; // Set default image filename
      console.log('Default image filename is:', this.image); // Log the default image filename
      this.isImageSelected = false;
    }
  }



  showModal(): void {
    this.modal2.nativeElement.showModal();
  }



}











  

 

