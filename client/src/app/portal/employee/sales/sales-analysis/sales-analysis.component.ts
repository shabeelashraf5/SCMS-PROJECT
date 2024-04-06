import { Component,  OnInit, ViewChild, ElementRef } from '@angular/core';
import { SalesAnalysisService } from './sales-analysis.service';
import { Chart, registerables } from 'chart.js';
import { PlotlyService } from 'angular-plotly.js';

Chart.register(...registerables)




@Component({
  selector: 'app-sales-analysis',
  templateUrl: './sales-analysis.component.html',
  styleUrl: './sales-analysis.component.css'
})

export class SalesAnalysisComponent implements OnInit {

  spoDetails: any;
 
  

  constructor(private salesAnalysisService :  SalesAnalysisService , private plotly: PlotlyService ) { }

  ngOnInit() {

    this.getClientDetails(); 

    

  }

  getClientDetails() {
    this.salesAnalysisService.getSPO().subscribe(
      (response) => {
        this.spoDetails = response; 
        console.log(this.spoDetails);
        this.RenderChart()
      },
      (error) => {
        console.error(error);
      }
    );
  }


  calculateUniqueCustomers(details: any[]): number {
    
    const employees = new Set(details.map(detail => detail.to));
    return employees.size;
}


calculateOrders(details: any[]): number {
  
  return details.filter(detail => detail.status === 'Confirmed').length;
}

calculateTotalOrders(details: any[]): number {
  
  return details.reduce((total, detail) => total + detail.totalAmount, 0);
}




RenderChart() {
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const monthWiseOrders = Array(12).fill(0);
   

  // Calculate month-wise confirmed orders
  this.spoDetails.forEach((detail: any) => {
    const date = new Date(detail.createdAt);
    const monthIndex = date.getMonth();
    if (detail.status === 'Confirmed') {
      monthWiseOrders[monthIndex]++;
    }
  });

  const myChart = new Chart("linechart", {
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


}
