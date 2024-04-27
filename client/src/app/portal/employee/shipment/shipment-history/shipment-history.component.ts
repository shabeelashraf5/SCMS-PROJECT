import { Component, OnInit } from '@angular/core';
import { ShipmentHistoryService } from './shipment-history.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { Shipment } from '../../../../model/shipment.model';

@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrl: './shipment-history.component.css'
})

export class ShipmentHistoryComponent implements OnInit {

  shipmentDetails: Shipment[] = []

  constructor(private shipmentService: ShipmentHistoryService, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
    this.getShipDetails(); 

  }



  async getShipDetails() {
    try {
      const response = await firstValueFrom(this.shipmentService.getShip());
      this.shipmentDetails = response; // Store the fetched shipment details
      console.log(this.shipmentDetails);
    } catch (error) {
      console.error('Error fetching shipment details:', error);
    }
  }



async confirmDelivery(shipmentId: string) {
  try {
    await firstValueFrom(this.shipmentService.updateShipmentStatus(shipmentId));

    console.log('Shipment status updated successfully');
    this.openSnackBar('Shipment delivered successfully');

    // After successfully updating, refresh shipment details
    this.getShipDetails();
  } catch (error) {
    console.error('Error updating shipment status:', error);
  }
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


  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      verticalPosition: 'top', // Set position to top
      horizontalPosition: 'center', // Set position to center horizontally
    });
  }

}
