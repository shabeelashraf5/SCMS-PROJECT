import { Component, EventEmitter, Output , OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from '../../../../portal/employee/profile/profile/profile.service';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom } from 'rxjs';

import { EmployeeLoginService } from '../../../../portal/employee/employeelogin/employee-login/employee-login.service';
import { io, Socket } from 'socket.io-client';



@Component({
  selector: 'app-employee-nb',
  templateUrl: './employee-nb.component.html',
  styleUrl: './employee-nb.component.css'
})
export class EmployeeNbComponent implements OnInit  {

  @Output() sidebarUpdate: EventEmitter<string> = new EventEmitter<string>();

  employeeProfile!: Employee;
  isImageSelected: boolean = false;
  socket!: Socket;


  constructor(private pService: ProfileService, private authService: EmployeeLoginService, private router: Router ) {}


  ngOnInit(): void {
    this.loadProfile();

    this.socket = io( environment.apiUrl + '/user-namespace');
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
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


  logout(): void {
    
    let employeeId =  this.authService.getLoggedInEmployeeId()
    
    if (employeeId) {
      this.authService.logout(employeeId);
    } else {
      console.error('EmployeeId is null or undefined');
    }

    this.socket.disconnect();
    this.router.navigate(['/employee-login']);

  
}



  

}

