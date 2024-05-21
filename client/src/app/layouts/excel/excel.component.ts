import { Component } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrl: './excel.component.css'
})
export class ExcelComponent {
  constructor() { }

  downloadExcel(): void {
    // Sample data
    const data = [
      ['Name', 'Age', 'Gender'],
      ['John Doe', 30, 'Male'],
      ['Jane Smith', 25, 'Female']
    ];

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);

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
    a.download = 'data.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
  }

}
