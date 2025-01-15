import { Component } from '@angular/core';
import { AdminLoginService } from './adminlogin/admin-login/admin-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-router',
  templateUrl: './admin-router.component.html',
  styleUrl: './admin-router.component.css'
})
export class AdminRouterComponent {

  tokenBeforeLogout: string | null = null; 
    tokenAfterLogout: string | null = null; 
  
    constructor(private authService: AdminLoginService, private router: Router) {}
  
   
  
    logout(): void {
  
      this.authService.logout();
      this.router.navigate(['/admin-login']);
  
    
  }

}
