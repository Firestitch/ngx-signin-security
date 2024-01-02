import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { FsDialogModule } from '@firestitch/dialog';
import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsPasswordModule } from '@firestitch/password';
import { FsSigninSecurityModule } from '@firestitch/signin-security';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { ChangeComponent, ExamplesComponent, ResetComponent } from './components';
import { AppMaterialModule } from './material.module';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsSigninSecurityModule.forRoot({
      case: 'snake',
    }),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsDialogModule.forRoot(),
    FsMessageModule.forRoot(),
    FsPasswordModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsExampleModule.forRoot(),
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
  ],
  entryComponents: [],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ChangeComponent,
    ResetComponent,
  ],
  providers: [],
})
export class PlaygroundModule {
}
