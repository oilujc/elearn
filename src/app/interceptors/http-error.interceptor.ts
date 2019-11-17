import { Injectable, NgZone } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '@app/auth/store/auth.reducer';
import { LogOut, LogOutSuccess } from '@app/auth/store/auth.actions';
import { environment } from '@env/environment';
import { SharedState } from '@app/shared/store/shared.reducer';
import { Loading } from '@app/shared/store/shared.actions';
import { getIsLoading } from '@app/shared/store/shared.selector';

export enum ErrorCode {
    CODE_EXPIRED_SESSION = 40,
    CODE_NOT_AUTHENTICATED = 42,
    CODE_NOT_TOKEN_SESSION = 43,
    CODE_TOKEN_SESSION_NOT_ACTIVE = 44,
    CODE_IP_CHANGED = 45,
    CODE_USER_NOT_ACCESS_URL = 49
}

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    env = environment

    constructor(
        private router: Router,
        private store: Store<any>
        ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {

                this.store.pipe(select(getIsLoading)).subscribe(loading => {
                    if (loading) {
                        this.store.dispatch(new Loading(false))
                    }
                }).unsubscribe()

                /* const code = error.error.code

                if (code === ErrorCode.CODE_USER_NOT_ACCESS_URL ||
                    code === ErrorCode.CODE_IP_CHANGED) {

                    this.store.dispatch(new LogOut())
                    this.router.navigate(['/login'])
                }

                if (code === ErrorCode.CODE_EXPIRED_SESSION ||
                    code === ErrorCode.CODE_NOT_AUTHENTICATED ||
                    code === ErrorCode.CODE_NOT_TOKEN_SESSION ||
                    code === ErrorCode.CODE_TOKEN_SESSION_NOT_ACTIVE) {

                    this.store.dispatch(new LogOutSuccess(true))
                    this.router.navigate(['/login'])
                } */

                return throwError(error)
            })
        )
    }
}


