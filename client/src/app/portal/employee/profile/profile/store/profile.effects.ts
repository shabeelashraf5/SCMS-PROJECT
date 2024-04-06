import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProfileService } from '../profile.service';
import * as AdProfileActions from './profile.action'

import { Employee } from '../../../../../model/ad-employee.model';



@Injectable()
export class ProfileEffects {

  

constructor(
    private actions$: Actions,
    private emProfileService: ProfileService
  ) {}

  
}

