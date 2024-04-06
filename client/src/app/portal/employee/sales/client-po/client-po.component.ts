import { Component } from '@angular/core';
import { ClientPoService } from './client-po.service';
import { ClientPo } from '../../../../model/client-po.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SalesOrderService } from '../sales-order/sales-order.service';

@Component({
  selector: 'app-client-po',
  templateUrl: './client-po.component.html',
  styleUrl: './client-po.component.css'
})
export class ClientPoComponent {

  clientPoDetail: any
  employee_id: string = ''
  quotation_id: string = ''
  clientPo: string = ''
  date: string = ''


  constructor( private clientPoService: ClientPoService, private snackBar: MatSnackBar, private route: ActivatedRoute, private salesOrderService: SalesOrderService   ) {}



}
