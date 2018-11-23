import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatTooltipModule,
  MatSlideToggleModule
} from '@angular/material';

import { FsPasswordModule } from '@firestitch/password';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsDateModule } from '@firestitch/date';

import { FsSigninSecurityComponent } from './components/fs-signin-security/fs-signin-security.component';
import {
  FsSigninSecurityResetComponent
} from './components/fs-signin-security-reset/fs-signin-security-reset.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,

    FsFormModule,
    FsMessageModule,
    FsPasswordModule,
    FsDateModule
  ],
  exports: [
    FsSigninSecurityComponent,
  ],
  entryComponents: [
    FsSigninSecurityResetComponent
  ],
  declarations: [
    FsSigninSecurityComponent,
    FsSigninSecurityResetComponent
  ],
  providers: [
  ],
})
export class FsSigninSecurityModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsSigninSecurityModule,
      providers: []
    };
  }
}
