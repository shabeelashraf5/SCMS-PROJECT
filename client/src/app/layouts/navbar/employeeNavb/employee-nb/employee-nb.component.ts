import { Component, EventEmitter, Output , OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from '../../../../portal/employee/profile/profile/profile.service';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-employee-nb',
  templateUrl: './employee-nb.component.html',
  styleUrl: './employee-nb.component.css'
})
export class EmployeeNbComponent implements OnInit  {

  @Output() sidebarUpdate: EventEmitter<string> = new EventEmitter<string>();

  employeeProfile!: Employee;
  isImageSelected: boolean = false;


  constructor(private pService: ProfileService ) {}


  ngOnInit(): void {
    this.loadProfile();
  }

 
  async loadProfile() {
    try {
      const profile = await firstValueFrom(this.pService.getProfile());
      this.employeeProfile = profile;
    } catch (error) {
      console.error('Error fetching employee profile:', error);
    }
  }


  getImageUrl(imageFileName: string): string {
    return environment.apiUrl + `/images/${imageFileName}`; 
  }


  updateSidebar(section: string) {
    this.sidebarUpdate.emit(section);
  }

  

}

