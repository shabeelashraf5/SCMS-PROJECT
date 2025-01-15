import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import { AdminLoginService } from '../../../../portal/admin/adminlogin/admin-login/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-sb',
  templateUrl: './admin-sb.component.html',
  styleUrl: './admin-sb.component.css'
})
export class AdminSbComponent  {

  tokenBeforeLogout: string | null = null; 
  tokenAfterLogout: string | null = null; 

  constructor(private authService: AdminLoginService, private router: Router) {}

 

  logout(): void {

    this.authService.logout();
    this.router.navigate(['/admin-login']);

  
}

}
