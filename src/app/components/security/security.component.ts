import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { format } from '@firestitch/date';
import { FsPasswordService } from '@firestitch/password';

import { Observable, Subject } from 'rxjs';

import { Password } from '../../interfaces/password';
import { PasswordBehavior } from '../../types/password-behavior.enum';
import { FsSigninSecurityResetComponent } from '../security-reset/security-reset.component';
import { FsLabelModule } from '@firestitch/label';
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: 'fs-signin-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsLabelModule, MatIcon],
})
export class FsSigninSecurityComponent implements OnInit, OnDestroy {
  private fsPassword = inject(FsPasswordService);
  private dialog = inject(MatDialog);


  @Input() public email: string = null;
  @Input() public lastSignIn: any = null;
  @Input() public passwordBehavior: PasswordBehavior = PasswordBehavior.Change;
  @Input() public enableCurrentPassword = true;
  @Input() public minLength = 6;
  @Input() public showCopyIcon = false;
  @Input()
  public lastSignInLabel = 'Last sign in';

  @Input() public resetPasswordOptions = {
    password: true,
    changePassword: true,
    emailPassword: true,
  };

  @Input() public changePassword: (password: Password) => Observable<any>;
  @Input() public resetPassword: (config: {
    password: string,
    emailPassword: boolean,
    changePassword: boolean,
  }) => Observable<any>;

  public date = null;

  private _destroy$ = new Subject();

  public ngOnInit() {
    this.date = this.lastSignIn ? format(this.lastSignIn, 'date-time') : 'Never';
  }

  public onChangePassword() {
    this.fsPassword.open({
      minLength: this.minLength,
      enableCurrentPassword: this.enableCurrentPassword,
      strength: true,
      buttons: [
        {
          label: 'Change password',
          action: 'submit',
          color: 'primary',
        },
        {
          label: 'Cancel',
          action: 'cancel',
        },
      ],
      width: '400px',
      exclude: [],
      submit: (newPassword, oldPassword) => {
        const result: Password = {
          currentPassword: oldPassword,
          newPassword: newPassword,
        };

        return this.changePassword(result);
      },
    })
      .subscribe();
  }

  public onResetPassword() {
    this.dialog.open(FsSigninSecurityResetComponent, {
      data: {
        email: this.email,
        minLength: this.minLength,
        showCopyIcon: this.showCopyIcon,
        resetPassword: this.resetPassword,
        ...this.resetPasswordOptions,
      },
    });
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }
}
