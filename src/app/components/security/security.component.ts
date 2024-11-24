import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';


import { format } from '@firestitch/date';
import { FsPasswordService } from '@firestitch/password';

import { Observable, Subject } from 'rxjs';

import { Password } from '../../interfaces/password';
import { PasswordBehavior } from '../../types/password-behavior.enum';
import { FsSigninSecurityResetComponent } from '../security-reset/security-reset.component';


@Component({
  selector: 'fs-signin-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FsSigninSecurityComponent implements OnInit, OnDestroy {

  @Input() public email: string = null;
  @Input() public lastSignIn: any = null;
  @Input() public passwordBehavior: PasswordBehavior = PasswordBehavior.Change;
  @Input() public enableCurrentPassword = true;
  @Input() public minLength = 6;
  @Input() public showCopyIcon = false;
  @Input()
  public lastSignInLabel = 'Last Sign-In';

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

  constructor(
    private fsPassword: FsPasswordService,
    private dialog: MatDialog,
  ) { }

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
          label: 'Change Password',
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
