import { Component } from '@angular/core';

@Component({
  selector: 'app-adm-dashboard',
  templateUrl: './adm-dashboard.component.html',
  styleUrl: './adm-dashboard.component.css'
})
export class AdmDashboardComponent {

  rows: any[] = [
    { firstname: 'Mark', lastname: 'Otto', handle: '@mdo' },
    { firstname: 'Jacob', lastname: 'Thornton', handle: '@fat' }
  ];
  
  // Method to add new row
  insertRow() {
    this.rows.push({ firstname: '', lastname: '', handle: '' });
  }

  // Method to delete row
  deleteRow(index: number) {
    this.rows.splice(index, 1);
  }

}
