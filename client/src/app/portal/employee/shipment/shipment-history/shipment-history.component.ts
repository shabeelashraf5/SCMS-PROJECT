import { Component, OnInit } from '@angular/core';
import { ShipmentHistoryService } from './shipment-history.service';

@Component({
  selector: 'app-shipment-history',
  templateUrl: './shipment-history.component.html',
  styleUrl: './shipment-history.component.css'
})

export class ShipmentHistoryComponent implements OnInit {

  shipmentDetails: any

  constructor(private shipmentService: ShipmentHistoryService ) { }

  ngOnInit() {
    this.getShipDetails(); 

  }


  getShipDetails() {
    this.shipmentService.getShip().subscribe(
      (response) => {
        this.shipmentDetails = response; // Store the fetched RFQ details
        console.log(this.shipmentDetails);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  confirmDelivery(shipmentId: string) {
    this.shipmentService.updateShipmentStatus(shipmentId).subscribe(
      (response) => {
        // Handle success
        console.log('Shipment status updated successfully');
        // Refresh the shipment details after update
        this.getShipDetails();
      },
      (error) => {
        console.error('Error updating shipment status:', error);
      }
    );
  }


  getRFQ(detail: any): string {
    if (detail &&  detail.invoice_id.purchase_id.po_id.quotation_id.salesRFQ_id  ) {
      return detail.invoice_id.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }

  getClient(detail: any): string {
    if (detail && detail.invoice_id.purchase_id.po_id.quotation_id  ) {
      return detail.invoice_id.purchase_id.po_id.quotation_id.to; 
    }
    return '';
  }



  getInvoice(detail: any): string {
    if (detail && detail.invoice_id ) {
      return detail.invoice_id.invoice; 
    }
    return '';
  }

  getDelivery(detail: any): string {
    if (detail && detail.invoice_id ) {
      return detail.invoice_id.delivery; 
    }
    return '';
  }


  
  getResponsible(detail: any): string {
    if (detail && detail.employee_id) {
      return detail.employee_id.fname + ' ' + detail.employee_id.lname ; 
    }
    return '';
  }

}
