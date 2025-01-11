import { Component, EventEmitter, Output , OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router  } from '@angular/router';
import { Employee } from '../../../../model/ad-employee.model';
import { ProfileService } from '../../../../portal/employee/profile/profile/profile.service';
import { environment } from '../../../../../environment/environment';
import { firstValueFrom, Subscription } from 'rxjs';

import { EmployeeLoginService } from '../../../../portal/employee/employeelogin/employee-login/employee-login.service';
import { io, Socket } from 'socket.io-client';
import { OnlineStatus } from '../../../../enums/online-status.enum';
import { response } from 'express';



@Component({
  selector: 'app-employee-nb',
  templateUrl: './employee-nb.component.html',
  styleUrl: './employee-nb.component.css'
})
export class EmployeeNbComponent implements OnInit, OnDestroy  {

  @Output() sidebarUpdate: EventEmitter<string> = new EventEmitter<string>();

  employeeProfile!: Employee;
  employee: Employee[] =[]
  isImageSelected: boolean = false;
  socket!: Socket;
  emSubscription!: Subscription
  isNavbarOpen: boolean = false;


  constructor(private pService: ProfileService, private authService: EmployeeLoginService, private router: Router ) {}


  ngOnInit(): void {
    this.loadProfile();

    this.socket = io( environment.apiUrl + '/user-namespace');
    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
   
   
  }

 
 

  loadProfile() {

    this.emSubscription = this.pService.getProfile().subscribe({
      next: (response) => {
        this.employeeProfile = response;
      },error: (error) => {
        console.error('Error fetching employee profile:', error);
      }

    })
  }


  getImageUrl(imageFileName: string): string {
    return environment.apiUrl + `/images/${imageFileName}`; 
  }


  updateSidebar(section: string) {
    this.sidebarUpdate.emit(section);
  }



logout() {
  let employeeId = this.authService.getLoggedInEmployeeId();

  if (employeeId ) {
    this.emSubscription = this.authService.logout(employeeId).subscribe({
      next: (response) => {
        this.socket.disconnect();
        this.router.navigate(['/employee-login']);
      },
      error: (error) => {
      }
    });
  } else {
    console.error('Employee ID is null');
  }
}


ngOnDestroy() {

  if(this.emSubscription){
    this.emSubscription.unsubscribe()
  }
  
}
  

}

