import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { sharedReducer } from './store/shared.reducer';
import { EffectsModule } from '@ngrx/effects';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoaderComponent],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('shared', sharedReducer),
    EffectsModule.forFeature([])
  ]
})
export class SharedModule { }
