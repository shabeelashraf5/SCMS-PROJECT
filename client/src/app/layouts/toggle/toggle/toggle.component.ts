import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, Event as NavigationEvent } from '@angular/router'
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.css'
})
export class ToggleComponent implements OnInit {


  isEmployeePortal: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event: NavigationEvent): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updatePortalState(event.urlAfterRedirects);
      });
  }

  togglePortal() {
    if (this.isEmployeePortal) {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/employee-login');
    }
  }

  private updatePortalState(url: string) {
    this.isEmployeePortal = url.includes('/admin');
  }

}
