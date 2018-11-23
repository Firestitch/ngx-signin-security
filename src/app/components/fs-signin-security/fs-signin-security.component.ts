import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { of } from 'rxjs/Observable/of';

import { FsPasswordService } from '@firestitch/password';
import { format } from '@firestitch/date';

import { Password } from '../../interfaces/password';
import { FsSigninSecurityResetComponent } from '../fs-signin-security-reset/fs-signin-security-reset.component';


@Component({
  selector: 'fs-signin-security',
  templateUrl: './fs-signin-security.component.html',
  styleUrls: [ './fs-signin-security.component.scss' ],
})
export class FsSigninSecurityComponent implements OnInit {

  @Input() public email: string = null;
  @Input() public lastSignIn: any = null;
  @Input() public passwordBehavior: 'reset' | 'update' = 'update';
  @Input() public enableCurrentPassword = true;
  @Input() public minLength = 6;

  @Output() public resetPassword = new EventEmitter<Password>();
  @Output() public updatePassword = new EventEmitter<Password>();

  public date = null;

  constructor(
    private fsPassword: FsPasswordService,
    private dialog: MatDialog
  ) { }

  public ngOnInit() {
    this.date = this.lastSignIn ? format(this.lastSignIn, 'date-time') : 'Never';
  }

  public onUpdatePassword() {

    this.fsPassword.open({
      minLength: this.minLength,
      enableCurrentPassword: this.enableCurrentPassword,
      buttons: [],
      exclude: [],
      submit: (newPassword, oldPassword) => {
        const result: Password = { current_password: oldPassword, new_password: newPassword };
        return of(result);
      }
    }).subscribe(response => {
      if (response.action === 'submit') {
        this.updatePassword.emit(response.result);
      }
    });
  }

  public onResetPassword() {
    const dialogRef = this.dialog.open(FsSigninSecurityResetComponent, {
      data: { email: this.email, minLength: this.minLength }
    });

    dialogRef.afterClosed().subscribe(response => {
      if (response) {
        this.resetPassword.emit(response);
      }
    });
  }

}
