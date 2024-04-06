import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store , select } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { loginAdmin } from '../admin-login/store/admin-login.action';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})


export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;


  

  constructor(private formBuilder: FormBuilder, private store: Store, private snackBar: MatSnackBar ) {

  }

  ngOnInit(): void {
    this.initForm();
  
  }

  

  initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  
  onSubmit(): void {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
  
    if (!emailControl || !passwordControl) {
      return; // Exit onSubmit method if controls are not found
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
    this.loading = true;

    setTimeout(() => {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(loginAdmin({ email, password }));
    }, 3000);
  }
  
  



openSnackBar(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top', 
  });
}

}
