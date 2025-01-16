import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Store, select  } from '@ngrx/store';
import { AppState } from '../../../../state/app.state';
import * as EmMessagingActions from '../em-dashboard/store/em-dashboard.action';
import { Messaging } from '../../../../model/em-messaging.model';
import { Observable, map } from 'rxjs';
import { Employee } from '../../../../model/ad-employee.model';
import { EmployeeLoginService } from '../../employeelogin/employee-login/employee-login.service';
import mongoose from 'mongoose';
import { environment } from '../../../../../environment/environment';
import { ProfileService } from '../../profile/profile/profile.service';
import { SalesAnalysisComponent } from '../../sales/sales-analysis/sales-analysis.component';



@Component({
  selector: 'app-em-dashboard',
  templateUrl: './em-dashboard.component.html',
  styleUrl: './em-dashboard.component.css'
})

export class EmDashboardComponent implements OnInit {

  _id: string = ''
  message: string = '';
  employee_id: string = '';
  date!: Date
  loggedInEmployeeId: string | undefined;
  employeeProfile!: Employee;
  articles: any[] = []
  displayedArticles: any[] = []
  showMore: boolean = false;
  

  canDelete: boolean = false; 


  employees: Employee[] = [];

  messages$: Observable<Messaging[]>; 

  announcements = [
    "Exciting News! We've secured a bulk order of 150 units from Limited Corp. Congratulations to the sales team for their hard work!",
    "New Partnership Alert! We're thrilled to announce a collaboration with XYZ Ltd., paving the way for new opportunities in retail.",
    "Milestone Reached! Our team has successfully shipped over 1,000 units this quarter. Keep up the great work, everyone!",
    "Mark Your Calendars! The next Monthly Sales Review Meeting will be held on January 20th at 3 PM in the main conference hall.",
    "Kudos to Jane Doe! She closed a major deal worth $50,000 this week. Your efforts make a huge difference!"
  ];

  constructor(private store: Store<AppState> , private authService: EmployeeLoginService, private employeeService: ProfileService) {
    this.messages$ = this.store.pipe(select(state => state.message.messages));
    
  }

  ngOnInit(): void {
    
    this.store.dispatch(EmMessagingActions.loadMessage());
    this.loadProfile()
    // this.loadNews()
  
  }


  onSubmit(): void {

    const message  = {

      message: this.message,
      employee_id: this.employee_id,
      date: this.date  
    };
    
    console.log('Dispatching addCategory action with category:', message);
    this.store.dispatch(EmMessagingActions.addMessage( message )); 
    
    this.message = '';
   
}

loadProfile() {

   this.employeeService.getProfile().subscribe({
    next: (response) => {
      this.employeeProfile = response;
    },error: (error) =>{
      console.error('Error fetching employee profile:', error);
    }
  })
}


// loadNews() {

//   this.employeeService.topHeading().subscribe({
//     next: (response) => {
//       this.articles = response
//       this.displayedArticles = this.articles.slice(7, 11)
//       console.log('News:', this.articles)
//     }
//   })
// }




deleteMessage(message: Messaging) {
  if (message && message._id) {
    const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
    const MessageEmployeeId = (message.employee_id as any)._id
    console.log('Logged-in Employee ID:', loggedInEmployeeId); 
    console.log('Message Employee ID:', MessageEmployeeId); 

    if (loggedInEmployeeId && MessageEmployeeId === loggedInEmployeeId) {
      
      this.store.dispatch(EmMessagingActions.deleteMessage({ messageId: message._id }));
      console.log(message._id);
    } else {
      console.log('You are not authorized to delete this message.');
    }
  } else {
    console.error('Message or its ID is undefined');
  }
}

confirmDelete(message: Messaging) {
  if (confirm('Are you sure you want to delete?')) {
      this.deleteMessage(message);
  }
}



canDeleteMessage(message: Messaging): boolean {
  const loggedInEmployeeId = this.authService.getLoggedInEmployeeId();
  const messageEmployeeId = (message.employee_id as any)._id

 
  return loggedInEmployeeId === messageEmployeeId;
}

trackByDashboard(index: number, dashboard: Messaging): string {
  return dashboard._id 
}


getEmployee(employeeId: string | Employee): string {
  if (typeof employeeId === 'object') {
    return employeeId.fname + ' ' + employeeId.lname ;
  }
  return '';
} 


getPosition(employeeId: string | Employee): string  {
  if (typeof employeeId === 'object') {
    return employeeId.position ;
  }
  return '';
}



getImage(employeeId: string | Employee): string  {
  if (typeof employeeId === 'object') {
    return employeeId.image ;
  }
  return '';
}



getImageUrl(imageFileName: string): string {
  return environment.apiUrl + `/images/${imageFileName}`; 
}

toggleShowMore(): void {
  this.showMore = !this.showMore;
}



}
