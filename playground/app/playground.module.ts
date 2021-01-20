import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { FsExampleModule } from '@firestitch/example';
import { FsPasswordModule } from '@firestitch/password';
import { FsMessageModule } from '@firestitch/message';
import { FsDialogModule } from '@firestitch/dialog';
import { FsSigninSecurityModule } from '@firestitch/signin-security';

import { AppMaterialModule } from './material.module';
import { ChangeComponent, ExamplesComponent, ResetComponent } from './components';
import { AppComponent } from './app.component';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    FsSigninSecurityModule.forRoot({
      case: 'snake'
    }),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsDialogModule.forRoot(),
    FsMessageModule.forRoot(),
    FsPasswordModule.forRoot(),
    ToastrModule.forRoot({ preventDuplicates: true }),
    FsExampleModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  entryComponents: [],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ChangeComponent,
    ResetComponent
  ],
  providers: [],
})
export class PlaygroundModule {
}
