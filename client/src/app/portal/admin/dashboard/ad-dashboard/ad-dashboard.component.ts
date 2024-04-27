import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdDashboardService } from './ad-dashboard.service';
import { AdEmployeeService } from '../../employee/ad-employee/ad-employee.service';
import { AddQuotation } from '../../../../model/sales-addquo';
import { Employee } from '../../../../model/ad-employee.model';


Chart.register(...registerables)

@Component({
  selector: 'app-ad-dashboard',
  templateUrl: './ad-dashboard.component.html',
  styleUrl: './ad-dashboard.component.css'
})
export class AdDashboardComponent implements OnInit {

  myChart!: Chart 
  currentData: number[] = []; // Default data for month
  currentTimePeriod: string = 'month'; // Default time period
  employeeDetails: Employee[] =[]
  currentDate: Date = new Date();

  spoDetails: AddQuotation[] = [];

  constructor(private dashboardService :  AdDashboardService , private emService: AdEmployeeService) { }

  ngOnInit(): void {
    this.renderChart();

    this.getClientDetails(); 
    this.loadEmployee()
    
  }


  getClientDetails() {
    this.dashboardService.getSPO().subscribe(
      (response) => {
        this.spoDetails = response; 
        console.log(this.spoDetails);
        this.renderChart()
       
      },
      (error) => {
        console.error(error);
      }
    );
  }


  loadEmployee() {
    this.emService.getEmployees().subscribe(
      (response) => {
        this.employeeDetails = response;
      },
      (error) => {
        console.error('Error fetching employee profile:', error);
      }
    );
  }

  calculateEmployee(details: Employee[]): number {
    const uniqueCustomers: string[] = [];
    for (const detail of details) {
        if (!uniqueCustomers.includes(detail.fname)) {
            uniqueCustomers.push(detail.fname);
        }
    }
    return uniqueCustomers.length;
}


  calculateUniqueCustomers(details: AddQuotation[]): number {
    
    const uniqueCustomers = new Set(details.map(detail => detail.to));
    return uniqueCustomers.size;
}


calculateOrders(details: AddQuotation[]): number {
  
  return details.filter(detail => detail.status === 'Confirmed').length;
}

calculateTotalOrders(details: AddQuotation[]): number {
  
  return details.reduce((total, detail) => total + detail.totalAmount, 0);
}


  renderChart(): void {


    this.myChart = new Chart("linechart", {
      type: 'line',
      data: {
        labels: this.getLabelArray(this.currentTimePeriod),
        datasets: [{
          label: '# of Orders',
          data: this.currentData,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChart(): void {

    
    const monthWiseOrders = Array(12).fill(0);
    const weekWiseOrders =  Array(4).fill(0);
    const dayWiseOrders =  Array(7).fill(0);

   /*  // Calculate month-wise confirmed orders
  this.spoDetails.forEach((detail: any) => {
    const date = new Date(detail.createdAt);
    const monthIndex = date.getMonth();
    if (detail.status === 'Confirmed') {
      monthWiseOrders[monthIndex]++;
    }
  });

  this.spoDetails.forEach((detail: any) => {
    const date = new Date(detail.createdAt);
    const weekIndex = Math.floor(date.getDate() / 7);
    if (detail.status === 'Confirmed') {
      weekWiseOrders[weekIndex]++;
    }
  });


  this.spoDetails.forEach((detail: any) => {
    const date = new Date(detail.createdAt);
    const dayIndex = date.getDay();;
    if (detail.status === 'Confirmed') {
      dayWiseOrders[dayIndex]++;
    }
  });*/

  this.spoDetails.forEach((detail: any) => {
    const date = new Date(detail.createdAt);
    const monthIndex = date.getMonth();
    const weekIndex = this.getWeekIndex(date);
    if (detail.status === 'Confirmed') {
        monthWiseOrders[monthIndex]++;
        weekWiseOrders[weekIndex]++;
        dayWiseOrders[date.getDay()]++;
    }
});




    switch (this.currentTimePeriod) {
      case 'week':
        this.currentData = weekWiseOrders; // Sample data for a week
        break;
      case 'month':
        this.currentData = dayWiseOrders ; // Sample data for a month
        break;
      case 'year':
        this.currentData = monthWiseOrders; // Sample data for a year
        break;
    }
    this.myChart.data.labels = this.getLabelArray(this.currentTimePeriod);
    this.myChart.data.datasets[0].data = this.currentData;
    this.myChart.update();
  } 


  getWeekIndex(date: Date): number {
    // Calculate which week of the month the given date falls into
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const dayOfMonth = date.getDate();
    const weekIndex = Math.ceil((dayOfMonth + dayOfWeek) / 7) - 1; // Zero-based index
    return weekIndex;
}


  

  getLabelArray(period: string): string[] {
    switch (period) {
      case 'week':
        return ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5','Day 6','Day 7']; // Sample labels for a week
      case 'month':
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4']; // Sample labels for a month
      case 'year':
        return ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; // Sample labels for a year
      default:
        return [];
    }
  } 




  toggleTimePeriod(): void {
    switch (this.currentTimePeriod) {
      case 'week':
        this.currentTimePeriod = 'month';
        break;
      case 'month':
        this.currentTimePeriod = 'year';
        break;
      case 'year':
        this.currentTimePeriod = 'week';
        break;
    }
    this.updateChart();
  }




  

}
