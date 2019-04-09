import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs';

import { FsPasswordService } from '@firestitch/password';
import { format } from '@firestitch/date';

import { Password } from '../../interfaces/password';
import { FsSigninSecurityResetComponent } from '../security-reset/security-reset.component';


@Component({
  selector: 'fs-signin-security',
  templateUrl: './security.component.html',
  styleUrls: [ './security.component.scss' ],
})
export class FsSigninSecurityComponent implements OnInit {

  @Input() public email: string = null;
  @Input() public lastSignIn: any = null;
  @Input() public passwordBehavior: 'reset' | 'change' = 'change';
  @Input() public enableCurrentPassword = true;
  @Input() public minLength = 6;
  @Input() public showCopyIcon = false;

  @Input() public resetPasswordOptions = {
    password: true,
    changePassword: true,
    emailPassword: true
  };

  @Output() public resetPassword = new EventEmitter<Password>();
  @Output() public changePassword = new EventEmitter<Password>();

  public date = null;

  constructor(
    private fsPassword: FsPasswordService,
    private dialog: MatDialog
  ) { }

  public ngOnInit() {
    this.date = this.lastSignIn ? format(this.lastSignIn, 'date-time') : 'Never';
  }

  public onChangePassword() {

    this.fsPassword.open({
      minLength: this.minLength,
      enableCurrentPassword: this.enableCurrentPassword,
      buttons: [
        {
          label: 'CHANGE PASSWORD',
          action: 'submit',
          color: 'primary'
        },
        {
          label: 'CANCEL',
          action: 'cancel'
        }
      ],
      exclude: [],
      submit: (newPassword, oldPassword) => {
        const result: Password = { current_password: oldPassword, new_password: newPassword };
        return of(result);
      }
    }).subscribe(response => {
      if (response.action === 'submit') {
        this.changePassword.emit(response.result);
      }
    });
  }

  public onResetPassword() {
    const dialogRef = this.dialog.open(FsSigninSecurityResetComponent, {
      data: {
        email: this.email,
        minLength: this.minLength,
        resetPasswordOptions: this.resetPasswordOptions,
        showCopyIcon: this.showCopyIcon
      }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.resetPassword.emit(response);
      }
    });
  }

}
