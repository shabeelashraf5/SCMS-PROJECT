import { Component,  OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SalesAnalysisService } from './sales-analysis.service';
import { Chart, registerables } from 'chart.js';
import { PlotlyService } from 'angular-plotly.js';
import { Subscription, firstValueFrom } from 'rxjs';
import { AddQuotation } from '../../../../model/sales-addquo';
import { OrderStatus } from '../../../../enums/order-status.enum';
import { response } from 'express';
import { error } from 'console';

Chart.register(...registerables)

@Component({
  selector: 'app-sales-analysis',
  templateUrl: './sales-analysis.component.html',
  styleUrl: './sales-analysis.component.css'
})

export class SalesAnalysisComponent implements OnInit, OnDestroy {

  spoDetails: AddQuotation[] = [];
  salesAnalysisSubscription!: Subscription
 
  

  constructor(private salesAnalysisService :  SalesAnalysisService , private plotly: PlotlyService ) { }

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
