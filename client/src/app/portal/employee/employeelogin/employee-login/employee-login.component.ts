import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { loginEmployee } from './store/employee-login.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrl: './employee-login.component.css'
})
export class EmployeeLoginComponent implements OnInit {
  loginForm!: FormGroup;
  

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /*
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(loginEmployee({ email, password }));
    }
  }*/

  /*
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      of(this.store.dispatch(loginEmployee({ email, password }))).pipe(
        tap((response: any) => {
          if (response && response.message === 'Authentication successful') {
            this.openSnackBar('Login Success');
          } else {
            this.openSnackBar('Invalid Email or password');
          }
        }),
        catchError(error => {
          this.openSnackBar('Server Error');
          return of(null); // Return a valid observable to continue the stream
        })
      ).subscribe();
    } else {
      this.openSnackBar('Enter Email and Password');
    }
  }
*/

onSubmit(): void {
  const emailControl = this.loginForm.get('email');
  const passwordControl = this.loginForm.get('password');

  if (!emailControl || !passwordControl) {
    return; 
  }

  if (passwordControl.errors && passwordControl.errors['required'] && emailControl.errors && emailControl.errors['required'] ) {
    this.openSnackBar('Enter Email and Password');
    return;
  }

  if (emailControl.errors && emailControl.errors['required']) {
    this.openSnackBar('Enter Email');
    return;
  } else if (emailControl.errors && emailControl.errors['email']) {
    this.openSnackBar('Invalid Email');
    return;
  }

  if (passwordControl.errors && passwordControl.errors['required']) {
    this.openSnackBar('Enter Password');
    return;
  }

  if (!emailControl.valid || !passwordControl.valid) {
    this.openSnackBar('Invalid Email or Password');
    return; // Exit onSubmit method if email or password is invalid
  }

  const { email, password } = this.loginForm.value;
  // Dispatch login action
  this.store.dispatch(loginEmployee({ email, password }))
}









  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top', 
    });
  }
}
