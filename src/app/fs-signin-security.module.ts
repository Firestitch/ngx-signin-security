import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsClipboardModule } from '@firestitch/clipboard';
import { FsDateModule } from '@firestitch/date';
import { FsFormModule } from '@firestitch/form';
import { FsLabelModule } from '@firestitch/label';
import { FsMessageModule } from '@firestitch/message';
import { FsPasswordModule } from '@firestitch/password';

import { FsSigninSecurityResetComponent } from './components/security-reset/security-reset.component';
import { FsSigninSecurityComponent } from './components/security/security.component';
import { FS_SIGNIN_SECURITY_CONFIG } from './injectors/singin-security-config.injector';
import { FsSigninSecurityConfig } from './interfaces';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
        FsLabelModule,
        FsClipboardModule,
    ],
    exports: [
        FsSigninSecurityComponent,
    ],
    declarations: [
        FsSigninSecurityComponent,
        FsSigninSecurityResetComponent,
    ]
})
export class FsSigninSecurityModule {
  static forRoot(config: FsSigninSecurityConfig): ModuleWithProviders<FsSigninSecurityModule> {
    return {
      ngModule: FsSigninSecurityModule,
      providers: [
        { provide: FS_SIGNIN_SECURITY_CONFIG, useValue: config || {} },
      ],
    };
  }
}
