import { Component, EventEmitter, Output , OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from '../../../../portal/employee/profile/profile/profile.service';


@Component({
  selector: 'app-employee-nb',
  templateUrl: './employee-nb.component.html',
  styleUrl: './employee-nb.component.css'
})
export class EmployeeNbComponent  {

  @Output() sidebarUpdate: EventEmitter<string> = new EventEmitter<string>();

  employeeProfile!: Employee;
  isImageSelected: boolean = false;


  constructor(private pService: ProfileService ) {}


  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.pService.getProfile().subscribe(
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




  updateSidebar(section: string) {
    this.sidebarUpdate.emit(section);
  }

  

}

