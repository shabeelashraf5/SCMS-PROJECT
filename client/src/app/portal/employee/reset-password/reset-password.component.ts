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
import { firstValueFrom, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { response } from 'express';

interface ResetPasswordResponse {
  success: boolean;
  message?: string;
}

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

  

  async ngOnInit(): Promise<void> {
    try {
      const params = await firstValueFrom(this.route.queryParams);
      this.token = params['token'];

      if (!this.token) {
        this.errorMessage = 'Invalid token';
      } else {
        const response = await firstValueFrom(this.resetPasswordService.resetPassword(this.token)) as ResetPasswordResponse;

        if (response.success) {
          this.resetSuccess = true;
        } else {
          this.errorMessage = response.message || 'Reset failed';
        }
      }
    } catch (error) {
      console.error('Error initializing reset password:', error);
      this.errorMessage = 'An error occurred while initializing password reset';
    }
  }

  

  async resetPassword(): Promise<void> {
    if (!this.token || !this.newPassword) {
      this.errorMessage = 'Token or new password is missing';
      return;
    }

    try {
      const response = await firstValueFrom(this.resetPasswordService.resetSuccess(this.token, this.newPassword)) as  ResetPasswordResponse;

      if (response.success) {
        this.resetSuccess = true;
        this.router.navigate(['/employee-login']); 
        this.snackBar.open('Password reset successfully', 'Close', {
          duration: 5000,
          verticalPosition: 'top'
        });
      } else {
        this.errorMessage = response.message || 'Reset failed';
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        
        if (error.status === 402) {
         
          this.snackBar.open('Try another password.', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
          });
        } else {
        
          this.errorMessage = 'An error occurred while resetting the password';
        }
      } else {
        console.error('Unknown error:', error);
        this.errorMessage = 'An unexpected error occurred';
      }
    }
  }

  
  
  
}
