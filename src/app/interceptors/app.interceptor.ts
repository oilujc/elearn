import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { environment } from '@env/environment';
import { Loading } from '@app/shared/store/shared.actions';
import { tap } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    urlActual = window.location.hostname.replace('www.', '')

    loadingRoutes = [
        '/accounts/token'
    ]

    constructor(
        private store: Store<any>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        this.setLoading(request,true)

        /* this.store.pipe(select(getAuthState)).subscribe(auth => {
            this.userId = auth.user ? auth.user.id : null
            this.aavvId = auth.aavv ? auth.aavv.id : null
            this.codeAavv = auth.aavv ? auth.aavv.codeAavv : null
            this.roles = auth.user ? auth.user.roles : null
        }).unsubscribe() */

        const headers = new HttpHeaders({ 
            'Content-Type': 'application/json'
         })

        request = request.clone({ headers })

        /* if (this.cookieService.check('auth')) {
            const auth = JSON.parse(this.cookieService.get('auth'));
            this.userId = auth.user.id
            this.aavvId = auth.aavv.aavvId
            this.codeAavv = auth.aavv.codeAavv
        } */

        /* const body = {
            ...request.body,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            userId: this.userId,
            aavvId: this.aavvId,
            codeAavv: this.codeAavv,
            urlActual: this.urlActual,
        } */

        return next.handle(request).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    this.setLoading(evt,false)
                }
            })
        );
    }

    setLoading(http, loading: boolean) {
        if (this.loadingRoutes.includes(http.url.replace(environment.apiUrl,''))) {
            this.store.dispatch(new Loading(loading))
        }
    }
}