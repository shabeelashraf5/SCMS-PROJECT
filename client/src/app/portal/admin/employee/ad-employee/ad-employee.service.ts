import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../../model/ad-employee.model';

@Injectable({
  providedIn: 'root'
})
export class AdEmployeeService {

  private apiUrl = 'http://localhost:3000/api/admin';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    const headers = new HttpHeaders().set('Cache-Control', 'no-cache');
    return this.http.get<Employee[]>(`${this.apiUrl}/employee`, { headers });
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/employee/add`, employee);
  }

  updateEmployee(employee: Partial<Employee>): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/employee/update/${employee._id}`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/employee/delete/${id}`);
  }


}
