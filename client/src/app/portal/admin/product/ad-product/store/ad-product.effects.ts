import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AdProductService } from '../ad-product.service';
import * as AdProductActions from '../store/ad-product.action'

import { Product } from '../../../../../model/ad-product.model';



@Injectable()
export class AdProductEffects {

  loadProduct$ = createEffect(() => this.actions$.pipe(
    ofType(AdProductActions.loadProduct),
    mergeMap(() =>
      this.adProductService.getProducts().pipe(
        map((products: Product[]) => AdProductActions.loadProductSuccess({ products })),
        
        catchError(error => of(AdProductActions.loadProductFailure({ error: error.message })))
      )
    )
  ));

  
  addProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdProductActions.addProduct),
    switchMap(({ category_id, product, description, uom, price, availability }) => {
      console.log('Creating user...');
      const products: Partial<Product> = { category_id, product, description, uom, price, availability }; // Use Partial<User> here
      return this.adProductService.addProduct(products as Product).pipe( // Cast it back to User
        map(() => {
          console.log('User created successfully');
          return AdProductActions.loadProduct(); // Trigger a load after create
        }),
        catchError((error) => of(AdProductActions.loadProductFailure({ error })))
      );
    })
  )
);


updateProduct$ = createEffect(() =>
this.actions$.pipe(
  ofType(AdProductActions.updateProduct),
  switchMap(({ product }) => {
    console.log('Updating category...');
    return this.adProductService.updateProduct(product).pipe(
      map((updatedProduct: Product) => {
        console.log('Category updated successfully');
        return AdProductActions.updateProductSuccess({ product: updatedProduct });
      }),
      catchError((error) => of(AdProductActions.updateProductFailure({ error })))
    );
  })
)
);


deleteEmployee$ = createEffect(() => this.actions$.pipe(
  ofType(AdProductActions.deleteProduct),
  mergeMap(({ productId }) =>
    this.adProductService.deleteProduct(productId).pipe(
      map(() => AdProductActions.deleteProductSuccess({ productId })),
      catchError(error => of(AdProductActions.deleteProductFailure({ error: error.message })))
    )
  )
));


constructor(
    private actions$: Actions,
    private adProductService: AdProductService
  ) {}
}

