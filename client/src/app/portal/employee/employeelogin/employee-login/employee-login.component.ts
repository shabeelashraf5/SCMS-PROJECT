import { Component , OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { loginEmployee, loginEmployeeSuccess, loginEmployeeFailure } from './store/employee-login.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent implements OnInit, OnDestroy  {
  loginForm!: FormGroup;
  subscription!: Subscription;
  email: string = 'test@xyz.in'
  password: number = 123456
  
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.initForm();

    this.errorValidation()
   
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


onSubmit(): void {
  
  
  const { email, password } = this.loginForm.value;
  
  this.store.dispatch(loginEmployee({ email, password }))
}


errorValidation(){

  this.subscription = this.store.pipe(select(state => state.employeeLogin.error)) 
  .subscribe(error => {
    if (error) {
      this.openSnackBar(error);
    }
  });

}



ngOnDestroy(): void {
  
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
}


  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top', 
    });
  }


}
