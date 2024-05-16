import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import * as AdProfileActions from '../../profile/profile/store/profile.action';
import { Profile } from '../../../../model/emp-profile.model';
import { Observable, Subscription, map } from 'rxjs';
import { AppState } from '../../../../state/app.state';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from './profile.service';
import * as AdEmployeeActions from '../../../admin/employee/ad-employee/store/ad-employee.action'
import { AdEmployeeService } from '../../../admin/employee/ad-employee/ad-employee.service';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})


export class ProfileComponent implements OnInit, OnDestroy {


  employeeProfile!: Employee;
  isImageSelected: boolean = false;

  

  _id!: string; 
  image: string = ''
  selectedFile!: File; 
  profileSubscription!: Subscription

  @ViewChild('my_modal_2') modal2!: ElementRef;


  constructor(private store: Store<AppState>, private employeeService: ProfileService ,  private emService: AdEmployeeService) { 



  }

  ngOnInit(): void {
    this.loadProfile();
  }

  


  loadProfile() {

    this.profileSubscription = this.employeeService.getProfile().subscribe({
      next: (response) => {
        this.employeeProfile = response;
      },error: (error) =>{
        console.error('Error fetching employee profile:', error);
      }
    })
  }


  getImageUrl(imageFileName: string): string {
    return environment.apiUrl + `/images/${imageFileName}`; 
  }



editProfileEmployee(employee: Employee) {

  const _id = employee._id;
  let formData = new FormData();

  if (_id !== undefined) {
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
}

this.profileSubscription = this.emService.updateEmployee(_id, formData).subscribe({
  next: (response) => {
    this.loadProfile();

  },error: (error) => {
    console.error('Error updating profile employee:', error);
  }
})

 this.modal2.nativeElement.close();

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



  showModal(): void {
    this.modal2.nativeElement.showModal();
  }

  ngOnDestroy() {

    if(this.profileSubscription){
      this.profileSubscription.unsubscribe()
    }
    
  }



}











  

 

