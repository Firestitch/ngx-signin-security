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

import { ClipboardModule } from 'ngx-clipboard';

import { FsPasswordModule } from '@firestitch/password';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsDateModule } from '@firestitch/date';
import { FsLabelModule } from '@firestitch/label';

import { FsSigninSecurityComponent } from './components/security/security.component';
import { FsSigninSecurityResetComponent } from './components/security-reset/security-reset.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ClipboardModule,

    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatSlideToggleModule,

    FsFormModule,
    FsMessageModule,
    FsPasswordModule,
    FsDateModule,
    FsLabelModule
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
