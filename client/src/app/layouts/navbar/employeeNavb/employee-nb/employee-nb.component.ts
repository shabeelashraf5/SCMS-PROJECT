import { Component, EventEmitter, Output  } from '@angular/core';

@Component({
  selector: 'app-employee-nb',
  templateUrl: './employee-nb.component.html',
  styleUrl: './employee-nb.component.css'
})
export class EmployeeNbComponent {

  @Output() sidebarUpdate: EventEmitter<string> = new EventEmitter<string>();

  updateSidebar(section: string) {
    this.sidebarUpdate.emit(section);
  }

}
