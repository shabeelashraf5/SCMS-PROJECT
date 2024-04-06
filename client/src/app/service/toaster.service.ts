// toastr.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private showToastrSubject = new Subject<void>();

  showToastr$ = this.showToastrSubject.asObservable();

  constructor() {}

  showToastr() {
    this.showToastrSubject.next();
  }
}
