import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { FsExampleModule } from '@firestitch/example';
import { FsPasswordModule } from '@firestitch/password';

import { FsSigninSecurityModule } from 'fs-signin-security';

import { AppMaterialModule } from './material.module';
import {
UpdateComponent,
ResetComponent,
ExamplesComponent } from './components';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsSigninSecurityModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsPasswordModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsExampleModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    UpdateComponent,
    ResetComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
