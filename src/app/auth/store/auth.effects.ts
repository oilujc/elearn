import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromAuth from './auth.actions';
import { AuthState } from './auth.reducer';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';

@Injectable()
export class AuthEffects {

    private env = environment

    constructor(
        private actions: Actions,
        private store: Store<any>,
        private jwtService: JwtService,
        private router: Router
    ) { }

    @Effect()
    LogIn: Observable<any> = this.actions.pipe(
        ofType(fromAuth.AuthActionTypes.LOGIN),
        map((action: fromAuth.LogIn) => action.payload),
        switchMap(payload => {
            return this.jwtService.logIn(payload).pipe(
                map((res: any) => new fromAuth.LogInSuccess(res)),
                catchError(error => of(new fromAuth.LogInFailure(error)))
            )
        })
    )

    @Effect()
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(fromAuth.AuthActionTypes.LOGIN_SUCCESS),
        map((action: fromAuth.LogInSuccess) => action.payload),
        switchMap(payload => {
            return this.jwtService.setToken(payload.token).then(data => new fromAuth.SetUser(this.jwtService.getUser(data)))
        })
    )

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(fromAuth.AuthActionTypes.LOGIN_FAILURE),
        tap((action) => {
            console.log('Login Failure', action.payload)
        })
    )

    @Effect({ dispatch: false })
    LogOut: Observable<any> = this.actions.pipe(
        ofType(fromAuth.AuthActionTypes.LOGOUT),
        tap((action) => {
            if (this.jwtService.logOut() !== null) {
                this.router.navigate(['/'])
            }
        })
    )
}