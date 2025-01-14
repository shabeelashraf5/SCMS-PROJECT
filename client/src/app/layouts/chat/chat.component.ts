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


  // spoDetails: AddQuotation[] = [];
  // chartOptions: any;

  // constructor(private salesAnalysisService: SalesAnalysisService) {}

  // ngOnInit() {
  //   this.getClientDetails();
  // }

  // ngAfterViewInit(): void {
  //   this.renderChart();
  // }

 
  // getClientDetails() {
  //   this.salesAnalysisService.getSPO().subscribe({
  //     next: (response) => {
  //       if (!response || response.length === 0) {
  //         console.warn('No SPO details found');
  //         return;
  //       }
  //       this.spoDetails = response;
  //       console.log('SPO Details:', this.spoDetails);
  
  //       const monthlyData = this.getMonthlyOrderAmounts(this.spoDetails);
  //       if (monthlyData.some((value) => value > 0)) {
  //         this.updateChartOptions(monthlyData);
  //         this.renderChart();
  //       } else {
  //         console.warn('No confirmed orders to display in the chart.');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error fetching SPO details:', error);
  //     },
  //   });
  // }

  
  // getMonthlyOrderAmounts(spoDetails: AddQuotation[]): number[] {
  //   const monthlyOrderAmounts = Array(12).fill(0); 
  
  //   spoDetails.forEach((order) => {
  //     const orderDate = new Date(order.date);
  //     const orderYear = orderDate.getFullYear();
  
   
  //     if (order.status === OrderStatus.CONFIRMED && orderYear >= 2025) {
  //       const monthIndex = orderDate.getMonth(); 
  //       monthlyOrderAmounts[monthIndex] += order.totalAmount;
  //     }
  //   });
  
  //   return monthlyOrderAmounts;
  // }

  
  // updateChartOptions(monthlyData: number[]) {
  //   this.chartOptions = {
  //     chart: {
  //       height: '100%',
  //       maxWidth: '100%',
  //       type: 'area',
  //       fontFamily: 'Inter, sans-serif',
  //       dropShadow: {
  //         enabled: false,
  //       },
  //       toolbar: {
  //         show: false,
  //       },
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //     fill: {
  //       type: 'gradient',
  //       gradient: {
  //         opacityFrom: 0.55,
  //         opacityTo: 0,
  //         shade: '#1C64F2',
  //         gradientToColors: ['#1C64F2'],
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     stroke: {
  //       width: 6,
  //     },
  //     grid: {
  //       show: false,
  //       padding: {
  //         left: 2,
  //         right: 2,
  //         top: 0,
  //       },
  //     },
  //     series: [
  //       {
  //         name: 'Monthly Order Amounts',
  //         data: monthlyData,
  //         color: '#1A56DB',
  //       },
  //     ],
  //     xaxis: {
  //       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //       labels: {
  //         show: true,
  //         style: {
  //           fontSize: '12px',
  //           colors: ['#6B7280'],
  //         },
  //       },
  //       axisBorder: {
  //         show: false,
  //       },
  //       axisTicks: {
  //         show: false,
  //       },
  //     },
  //     yaxis: {
  //       show: true,
  //       labels: {
  //         style: {
  //           fontSize: '12px',
  //           colors: ['#6B7280'],
  //         },
  //       },
  //     },
  //   };
  // }

  // renderChart() {
  //   const chartElement = document.getElementById('area-chart');
  //   if (chartElement) {
  //     ApexCharts.exec('area-chart', 'destroy'); 
  //     const chart = new ApexCharts(chartElement, this.chartOptions);
  //     chart.render();
  //   }
  // }


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
