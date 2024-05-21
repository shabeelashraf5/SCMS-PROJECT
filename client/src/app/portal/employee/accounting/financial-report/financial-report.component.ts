import { Component, OnInit, OnDestroy } from '@angular/core';
import * as XLSX from 'xlsx';
import { FinancialReportService } from './financial-report.service';
import { Invoice } from '../../../../model/invoice.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrl: './financial-report.component.css'
})
export class FinancialReportComponent implements OnInit, OnDestroy {

  reportDetails: Invoice[] = []
  reportSubscription! : Subscription
  errorMessage: string = '';


  constructor(private reportService: FinancialReportService) { }

  ngOnInit() {
    this.getInvDetails(); 

  }

  getInvDetails() {
    this.reportSubscription = this.reportService.getInv().subscribe({
      next: (response) => {
        this.reportDetails = response; 
        console.log(this.reportDetails);
      },
      error: (error) => {
        console.error(error); 
  
        if (error instanceof HttpErrorResponse && error.status === 403) {
          this.errorMessage = 'You are not authorized to access this page.';
        } else {
          this.errorMessage = 'An error occurred while fetching data.';
        }
      },
    });
  }


  getPO(detail: Invoice): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.po) {
      return detail.purchase_id.po_id.po; 
    }
    return '';
  }

  getSRFQ(detail: Invoice): string {
    if (detail && detail.purchase_id && detail.purchase_id.po_id && detail.purchase_id.po_id.quotation_id && detail.purchase_id.po_id.quotation_id.salesRFQ_id) {
      return detail.purchase_id.po_id.quotation_id.salesRFQ_id.srfq; 
    }
    return '';
  }


  getClientName(detail: Invoice): string {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.clientname; 
    }
    return '';
  }
  

  getClientPo(detail: Invoice): string {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.clientPo; 
    }
    return '';
  }

  getClientSubject(detail: Invoice): string {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.subject; 
    }
    return '';
  }

  getClientPayment(detail: Invoice): string {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.payment; 
    }
    return '';
  }


  getTotal(detail: Invoice): number {
    if (detail && detail.purchase_id.po_id.quotation_id ) {
      return detail.purchase_id.po_id.quotation_id.totalAmount; 
    }
    return 0;
  }


  getSupplierName(detail: Invoice): string {
    if (detail && detail.purchase_id ) {
      return detail.purchase_id.to; 
    }
    return '';
  }

  getSupplierPayment(detail: Invoice): string {
    if (detail && detail.purchase_id ) {
      return detail.purchase_id.payment; 
    }
    return '';
  }

  getSupplierTotal(detail: Invoice): number {
    if (detail && detail.purchase_id ) {
      return detail.purchase_id.totalAmount; 
    }
    return 0;
  }


  getResponsible(detail: Invoice): string {
    if (typeof detail.employee_id === 'object' && 'fname' in detail.employee_id && 'lname' in detail.employee_id) {
      return `${detail.employee_id.fname} ${detail.employee_id.lname}`;
    }
    return 'Unknown';
  }


  downloadExcel(): void {
    // Prepare the data for the Excel sheet
    const data: string[][] = [
        ['RFQ No', 'Name', 'Product', 'Sale Amount', 'Payment Terms(Client)', 'Client', 'Client PO', 'Supplier Name', 'Purchase Cost', 'Payment Terms(Supplier)', 'Profit']
    ];

    this.reportDetails.forEach(detail => {

        const total = this.getTotal(detail);
        const supplierTotal = this.getSupplierTotal(detail);
        const profit = total - supplierTotal;

        const row: string[] = [
            this.getSRFQ(detail),
            this.getResponsible(detail),
            this.getClientSubject(detail),
            this.getTotal(detail).toString(),
            this.getClientPayment(detail),
            this.getClientName(detail),
            this.getClientPo(detail),
            this.getSupplierName(detail),
            this.getSupplierTotal(detail).toString(),
            this.getSupplierPayment(detail),
            profit.toString(),
        ];
        data.push(row);
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

    // Set column widths
    const colWidths = [
        { wch: 10 }, // Width of RFQ No column
        { wch: 20 }, // Width of Name column
        { wch: 20 }, // Width of Product column
        { wch: 15 }, // Width of Sale Amount column
        { wch: 25 }, // Width of Payment Terms(Client) column
        { wch: 20 }, // Width of Client column
        { wch: 15 }, // Width of Client PO column
        { wch: 20 }, // Width of Supplier Name column
        { wch: 15 }, // Width of Purchase Cost column
        { wch: 25 }, // Width of Payment Terms(Supplier) column
        { wch: 15 }  // Width of Profit column
    ];
    worksheet['!cols'] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Convert workbook to binary Excel file and create a Blob
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

    // Create a download link and trigger download
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'sales-report.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}


  


  ngOnDestroy() {

    if(this.reportSubscription){
      this.reportSubscription.unsubscribe()
    }
    
  }


}
