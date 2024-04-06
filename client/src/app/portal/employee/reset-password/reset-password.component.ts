import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Store, select  } from '@ngrx/store';
import * as AdEmployeeActions from '../../admin/employee/ad-employee/store/ad-employee.action'
import { Employee } from '../../../model/ad-employee.model';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { AdEmployeeService } from '../../admin/employee/ad-employee/ad-employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResetPasswordService } from './reset-password.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit  {

  employeeProfile!: Employee;

  newPassword: string = '';
  token!: string;
  resetSuccess: boolean = false;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private emEmployee: AdEmployeeService,
    private router: Router,
    private resetPasswordService: ResetPasswordService,
    private snackBar: MatSnackBar   
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
    
        this.errorMessage = 'Invalid token';
      }   else {
  
        this.resetPasswordService.resetPassword(this.token).subscribe(
          (response: any) => {
            
            if (response.success) {
              this.resetSuccess = true;
            } else {
              this.errorMessage = response.message;
            }
          },
          (error) => {

            console.error('Error resetting password:', error);
            this.errorMessage = 'An error occurred while resetting password';
          }
        );
      }
    }) 

  }


  resetPassword(): void {
    this.resetPasswordService.resetSuccess(this.token, this.newPassword).subscribe(
      (response: any) => {
        if (response.success) {
          this.resetSuccess = true;
          this.router.navigate(['/employee-login']);
          this.snackBar.open('Password reset successfully', 'Close',  {
            duration: 9000, // Snackbar duration in milliseconds
            verticalPosition: 'top'
          });
          
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('Error resetting password:', error);
        this.errorMessage = 'An error occurred while resetting password';
      }
    );
  }


/*
  editProfileEmployee(employee: Partial<Employee>) {
    const _id = employee._id;

    if (_id !== undefined) {
      const formData = new FormData();

      if (employee.password) formData.append('password', employee.password);

      this.resetPasswordService.resetSuccess(_id, formData).subscribe(() => {
        // Handle success if needed

        this.router.navigate(['/employee-login']);
       
      }, error => {
        console.error('Error updating profile employee:', error);
      });
    } else {
      console.error('Employee ID is undefined');
    }

    

  } */

  
  
  
}
