import { FS_SIGNIN_SECURITY_CONFIG } from './injectors/singin-security-config.injector';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ClipboardModule } from 'ngx-clipboard';

import { FsPasswordModule } from '@firestitch/password';
import { FsFormModule } from '@firestitch/form';
import { FsMessageModule } from '@firestitch/message';
import { FsDateModule } from '@firestitch/date';
import { FsLabelModule } from '@firestitch/label';

import { FsSigninSecurityComponent } from './components/security/security.component';
import { FsSigninSecurityResetComponent } from './components/security-reset/security-reset.component';
import { FsSigninSecurityConfig } from './interfaces';


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
})
export class FsSigninSecurityModule {
  static forRoot(config: FsSigninSecurityConfig): ModuleWithProviders {
    return {
      ngModule: FsSigninSecurityModule,
      providers: [
        { provide: FS_SIGNIN_SECURITY_CONFIG, useValue: config || {} }
      ]
    };
  }
}
