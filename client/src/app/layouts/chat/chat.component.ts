import { Component, OnInit, AfterViewInit  } from '@angular/core';
import ApexCharts from 'apexcharts';
import { SalesAnalysisService } from '../../portal/employee/sales/sales-analysis/sales-analysis.service';
import { AddQuotation } from '../../model/sales-addquo';
import { OrderStatus } from '../../enums/order-status.enum';
import { Subscription } from 'rxjs';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables)

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit  {


  spoDetails: AddQuotation[] = [];
    salesAnalysisSubscription!: Subscription
   
    
    constructor(private salesAnalysisService :  SalesAnalysisService   ) { }
  
    ngOnInit() {
  
      this.getClientDetails(); 
      
    }
  
   
    getClientDetails() {
  
      this.salesAnalysisSubscription = this.salesAnalysisService.getSPO().subscribe({
        next: (response) => {
          this.spoDetails = response;
          console.log('SPO Details:', this.spoDetails);
          this.RenderChart("linechart");
         
        },
        error: (error) => {
          console.error('Error fetching SPO details:', error);
        }
      })
  
    }
  
  
  
  
    calculateUniqueCustomers(details: AddQuotation[]): number {
      
      const employees = new Set(details.map(detail => detail.clientname));
      return employees.size;
  }
  
  
  calculateOrders(details: AddQuotation[]): number {
    
    return details.filter(detail => detail.status === OrderStatus.CONFIRMED ).length;
  }
  
  calculateTotalOrders(details: AddQuotation[]): number {
    
    return details.reduce((total, detail) => total + detail.totalAmount, 0);
  }
  
  
  
  
  RenderChart(canvasId: string) {
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const monthWiseOrders = Array(12).fill(0);
     
  
    
    this.spoDetails.forEach((detail: AddQuotation) => {
      const date = new Date(detail.createdAt);
      const monthIndex = date.getMonth();
      if (detail.status === OrderStatus.CONFIRMED ) {
        monthWiseOrders[monthIndex]++;
      }
    });
  
    const myChart = new Chart(canvasId, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: '# of Orders',
          data: monthWiseOrders,
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
  
  ngOnDestroy(){
  
    if(this.salesAnalysisSubscription){
      this.salesAnalysisSubscription.unsubscribe()
    }
    
  }
  

}
