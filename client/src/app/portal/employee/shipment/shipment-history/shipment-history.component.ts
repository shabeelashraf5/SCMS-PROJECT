import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShipmentHistoryService } from './shipment-history.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, firstValueFrom } from 'rxjs';
import { Shipment } from '../../../../model/shipment.model';
import { response } from 'express';

@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrl: './shipment-history.component.css'
})

export class ShipmentHistoryComponent implements OnInit, OnDestroy {

  shipmentDetails: Shipment[] = []
  confirmedDelivery: Set<string> = new Set();
  shipmentSubscription!: Subscription

  constructor(private shipmentService: ShipmentHistoryService, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getShipDetails(); 
    this.loadConfirmedDelivery()

  }

  /*
  async getShipDetails() {
    try {
      const response = await firstValueFrom(this.shipmentService.getShip());
      this.shipmentDetails = response; // Store the fetched shipment details
      console.log(this.shipmentDetails);
    } catch (error) {
      console.error('Error fetching shipment details:', error);
    }
  }*/

  getShipDetails() {

    this.shipmentSubscription = this.shipmentService.getShip().subscribe({
      next: (response) => {
        this.shipmentDetails = response
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


/*
async confirmDelivery(shipmentId: string) {

  if (this.confirmedDelivery.has(shipmentId)) {
    return; 
  }

  try {
    await firstValueFrom(this.shipmentService.updateShipmentStatus(shipmentId));

    console.log('Shipment status updated successfully');
    this.openSnackBar('Shipment delivered successfully');

    // After successfully updating, refresh shipment details
    this.getShipDetails();
    this.confirmedDelivery.add(shipmentId);  // Mark this quotation as confirmed
    localStorage.setItem('confirmedDelivery', JSON.stringify([...this.confirmedDelivery]));

  } catch (error) {
    console.error('Error updating shipment status:', error);
  }
} 
*/

confirmDelivery(shipmentId: string) {

  if (this.confirmedDelivery.has(shipmentId)) {
    return; 
  }

  this.shipmentSubscription = this.shipmentService.updateShipmentStatus(shipmentId).subscribe({
    next: (response) =>{

      console.log('Shipment status updated successfully');
      this.openSnackBar('Shipment delivered successfully');
      this.getShipDetails();
       this.confirmedDelivery.add(shipmentId);  // Mark this quotation as confirmed
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
      return detail.invoice_id.purchase_id.po_id.quotation_id.to; 
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
    return shipment._id; // Return a unique identifier for the product
  }


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks when component is destroyed
    if (this.shipmentSubscription) {
      this.shipmentSubscription.unsubscribe();
    }
  }

}
