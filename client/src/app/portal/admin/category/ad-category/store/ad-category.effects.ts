import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { AdCategoryService } from '../ad-category.service';
import * as AdCategoryActions from '../store/ad-category.action';
import { Router } from '@angular/router';

import { Category } from '../../../../../model/ad-category.model';

@Injectable()
export class AdCategoryEffects {

  loadCategory$ = createEffect(() => this.actions$.pipe(
    ofType(AdCategoryActions.loadCategory),
    mergeMap(() =>
      this.adCategoryService.getCategory().pipe(
        map((categories: Category[]) => AdCategoryActions.loadCategorySuccess({ categories })),
        
        catchError(error => of(AdCategoryActions.loadCategoryFailure({ error: error.message })))
      )
    )
  ));


  addCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdCategoryActions.addCategory),
    switchMap(({ category }) => {
      console.log('Creating user...');
      const categories: Partial<Category> = { category }; // Use Partial<User> here
      return this.adCategoryService.addCategory(categories as Category).pipe( // Cast it back to User
        map(() => {
          console.log('User created successfully');
          return AdCategoryActions.loadCategory(); // Trigger a load after create
        }),
        catchError((error) => of(AdCategoryActions.loadCategoryFailure({ error })))
      );
    })
  )
);


updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdCategoryActions.updateCategory),
      switchMap(({ category }) => {
        console.log('Updating category...');
        return this.adCategoryService.updateCategory(category).pipe(
          map((updatedCategory: Category) => {
            console.log('Category updated successfully');
            return AdCategoryActions.updateCategorySuccess({ category: updatedCategory });
          }),
          catchError((error) => of(AdCategoryActions.updateCategoryFailure({ error })))
        );
      })
    )
  );

  

  deleteCategory$ = createEffect(() => this.actions$.pipe(
    ofType(AdCategoryActions.deleteCategory),
    mergeMap(({ categoryId }) =>
      this.adCategoryService.deleteCategory(categoryId).pipe(
        map(() => AdCategoryActions.deleteCategorySuccess({ categoryId })),
        catchError(error => of(AdCategoryActions.deleteCategoryFailure({ error: error.message })))
      )
    )
  ));

 

  constructor(  private actions$: Actions, private adCategoryService: AdCategoryService,  private router: Router ) {}

  
      }
  /*
  constructor(private actions$: Actions, private adCategoryService: AdCategoryService) {}

  loadCategories$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdCategoryActions.loadCategories),
    switchMap(() =>
      this.adCategoryService.getCategories().pipe(
        map((categories) => AdCategoryActions.loadCategoriesSuccess({ categories })),
        catchError((error) => of(AdCategoryActions.loadCategoriesFailure({ error })))
      )
    )
  )
);

createCategory$ = createEffect(() =>
  this.actions$.pipe(
    ofType(AdCategoryActions.createCategory),
    switchMap(({ category }) =>
      this.adCategoryService.createCategory(category).pipe(
        map((createdCategory) => AdCategoryActions.createCategorySuccess({ category: createdCategory })),
        catchError((error) => of(AdCategoryActions.createCategoryFailure({ error })))
      )
    )
  )
);


deleteCategory$ = createEffect(() =>
this.actions$.pipe(
  ofType(AdCategoryActions.deleteCategory),
  switchMap(({ categoryId }) =>
    this.adCategoryService.deleteCategory(categoryId).pipe(
      map(() => AdCategoryActions.deleteCategorySuccess({ categoryId })),
      catchError((error) => of(AdCategoryActions.deleteCategoryFailure({ error })))
    )
  )
)
);
}
*/