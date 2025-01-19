import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { InventoryListService } from '../../portal/employee/warehouse/inventory-list/inventory-list.service';
import * as AdProductActions from '../action/inventory-list.action'

import { Products } from '../../model/ad-product.model';


@Injectable()
export class InventoryEffects {

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(AdProductActions.loadInventory),
    mergeMap(() =>
      this.adProductService.getInventory().pipe(
        map((products: Products[]) => AdProductActions.loadInventorySuccess({ products })),
        
        catchError(error => of(AdProductActions.loadInventoryFailure({ error: error.message })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private adProductService:  InventoryListService
  ) {}
}