import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store , select } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { loginAdmin } from '../admin-login/store/admin-login.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})


export class AdminLoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subscription!:  Subscription


  constructor(private formBuilder: FormBuilder, private store: Store<AppState>, private snackBar: MatSnackBar ) {

  }

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
      this.store.dispatch(loginAdmin({ email, password }));
 
  }

  errorValidation(){

    this.subscription = this.store.pipe(select(state => state.adminLogin.error)) 
    .subscribe(error => {
      if (error) {
        this.openSnackBar(error);
      }
    });
  }
  
openSnackBar(message: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top', 
  });
}


ngOnDestroy() {

  if(this.subscription)
    {
      this.subscription.unsubscribe()
    }
  
}

}
