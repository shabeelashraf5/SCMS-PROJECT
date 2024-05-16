import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AdDashboardService } from './ad-dashboard.service';
import { AdEmployeeService } from '../../employee/ad-employee/ad-employee.service';
import { AddQuotation } from '../../../../model/sales-addquo';
import { Employee } from '../../../../model/ad-employee.model';
import { Subscription, firstValueFrom } from 'rxjs';
import { OrderStatus } from '../../../../enums/order-status.enum';


Chart.register(...registerables)

@Component({
  selector: 'app-ad-dashboard',
  templateUrl: './ad-dashboard.component.html',
  styleUrl: './ad-dashboard.component.css'
})

export class AdDashboardComponent implements OnInit, OnDestroy {

  myChart!: Chart 
  currentData: number[] = []; 
  currentTimePeriod: string = 'month'; 
  employeeDetails: Employee[] =[]
  currentDate: Date = new Date();

  spoDetails: AddQuotation[] = [];
  dashSubscription!: Subscription

  constructor(private dashboardService :  AdDashboardService , private emService: AdEmployeeService) { }

  ngOnInit(): void {
    this.renderChart();

    this.getClientDetails(); 
    this.loadEmployee()
    
  }


  getClientDetails() {

    this.dashSubscription = this.dashboardService.getSPO().subscribe({
      next: (response) => {
        this.spoDetails = response; 
        console.log('SPO Details:', this.spoDetails);
      }, error: (error) => {
        console.error('Error fetching SPO details:', error);
      }
    })
  }




  loadEmployee() {

    this.dashSubscription = this.emService.getEmployees().subscribe({
      next:(response) => {
        this.employeeDetails = response; 
        console.log('Employee Details:', this.employeeDetails);
      },error: (error) => {
        console.error('Error fetching Employee details:', error);
      }  
    })
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
    
    const uniqueCustomers = new Set(details.map(detail => detail.clientname));
    return uniqueCustomers.size;
}


calculateOrders(details: AddQuotation[]): number {
  
  return details.filter(detail => detail.status === OrderStatus.CONFIRMED).length;
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

   

  this.spoDetails.forEach((detail: AddQuotation) => {
    const date = new Date(detail.createdAt);
    const monthIndex = date.getMonth();
    const weekIndex = this.getWeekIndex(date);
    if (detail.status === OrderStatus.CONFIRMED) {
        monthWiseOrders[monthIndex]++;
        weekWiseOrders[weekIndex]++;
        dayWiseOrders[date.getDay()]++;
    }
});


    switch (this.currentTimePeriod) {
      case 'week':
        this.currentData = weekWiseOrders; 
        break;
      case 'month':
        this.currentData = dayWiseOrders ; 
        break;
      case 'year':
        this.currentData = monthWiseOrders; 
        break;
    }
    this.myChart.data.labels = this.getLabelArray(this.currentTimePeriod);
    this.myChart.data.datasets[0].data = this.currentData;
    this.myChart.update();
  } 


  getWeekIndex(date: Date): number {
    
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeek = firstDayOfMonth.getDay(); 
    const dayOfMonth = date.getDate();
    const weekIndex = Math.ceil((dayOfMonth + dayOfWeek) / 7) - 1; 
    return weekIndex;
}


  

  getLabelArray(period: string): string[] {
    switch (period) {
      case 'week':
        return ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5','Day 6','Day 7']; 
        return ['Week 1', 'Week 2', 'Week 3', 'Week 4']; 
      case 'year':
        return ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
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

  ngOnDestroy() {

    if(this.dashSubscription){
      this.dashSubscription.unsubscribe()
    }
    
  }

}
