import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from '@app/auth/auth.module';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer, metaReducers } from './app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { environment } from '@env/environment';
import { AppInterceptor } from './interceptors/app.interceptor';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        AuthModule,
        ReactiveFormsModule,
        HttpClientModule,
        StoreModule.forRoot(appReducer, { metaReducers }),
        EffectsModule.forRoot([]),
        environment.production ? [] : StoreDevtoolsModule.instrument({maxAge: 50})
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
