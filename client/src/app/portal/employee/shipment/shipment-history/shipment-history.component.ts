import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShipmentHistoryService } from './shipment-history.service';
import { Subscription, firstValueFrom } from 'rxjs';
import { Shipment } from '../../../../model/shipment.model';
import { response } from 'express';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrl: './shipment-history.component.css'
})

export class ShipmentHistoryComponent implements OnInit, OnDestroy {

  shipmentDetails: Shipment[] = []
  confirmedDelivery: Set<string> = new Set();
  shipmentSubscription!: Subscription
  filteredEmployees: Shipment[]  = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
 

  constructor(private shipmentService: ShipmentHistoryService, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getShipDetails(); 
    this.loadConfirmedDelivery()

  }

 

  getShipDetails() {

    this.shipmentSubscription = this.shipmentService.getShip().subscribe({
      next: (response) => {
        this.shipmentDetails = response
        this.filteredEmployees = response
        console.log(this.shipmentDetails)
      },
      error: (error) =>{
        console.error('Error fetching shipment details:', error);
      },
      complete: () =>{
        console.log('Finished fetching shipment details');
      }
    })

  }


  loadConfirmedDelivery() {
    const storedDelivery = localStorage.getItem('confirmedDelivery');
    if (storedDelivery) {
      const parsedPurchase = JSON.parse(storedDelivery);
      this.confirmedDelivery = new Set(parsedPurchase);
    }
  }




confirmDelivery(shipmentId: string) {

  if (this.confirmedDelivery.has(shipmentId)) {
    return; 
  }

  this.shipmentSubscription = this.shipmentService.updateShipmentStatus(shipmentId).subscribe({
    next: (response) =>{

      console.log('Shipment status updated successfully');
      this.openSnackBar('Shipment delivered successfully');
      this.getShipDetails();
       this.confirmedDelivery.add(shipmentId);  
       localStorage.setItem('confirmedDelivery', JSON.stringify([...this.confirmedDelivery]));

    },
     error: (error) =>{
      console.error('Error updating shipment status:', error);
    }
  })

}


  getRFQ(detail: Shipment): string {
    if (detail &&  detail.invoice_id.purchase_id.po_id.quotation_id.salesRFQ_id  ) {
      return detail.invoice_id.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }

  getClient(detail: Shipment): string {
    if (detail && detail.invoice_id.purchase_id.po_id.quotation_id  ) {
      return detail.invoice_id.purchase_id.po_id.quotation_id.clientname; 
    }
    return '';
  }



  getInvoice(detail: Shipment): string {
    if (detail && detail.invoice_id ) {
      return detail.invoice_id.invoice; 
    }
    return '';
  }

  getDelivery(detail: Shipment): string {
    if (detail && detail.invoice_id ) {
      return detail.invoice_id.delivery; 
    }
    return '';
  }


  
  getResponsible(detail: Shipment): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }

  
  trackByShipment(index: number, shipment: Shipment): string {
    return shipment._id; 
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
    });
  }

  ngOnDestroy() {
   
    if (this.shipmentSubscription) {
      this.shipmentSubscription.unsubscribe();
    }
  }

  filterEmployees() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmployees = this.shipmentDetails.filter(emp => 
      emp.shipment.toLowerCase().includes(query) ||
      emp.invoice_id.invoice.toLowerCase().includes(query) ||
      emp.invoice_id.delivery.toLowerCase().includes(query) ||
      emp.invoice_id.delivery.toLowerCase().includes(query) ||
      this.getResponsible(emp).toLowerCase().includes(query)
    );
    this.currentPage = 1;
  }

}
