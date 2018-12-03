import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { guid } from '@firestitch/common/util';


@Component({
  selector: 'fs-signin-security-reset',
  templateUrl: './fs-signin-security-reset.component.html',
  styleUrls: ['./fs-signin-security-reset.component.scss']
})
export class FsSigninSecurityResetComponent implements OnInit {

  public password = false;
  public changePassword = false;
  public emailPassword = false;

  public shouldObfuscatePassword = true;

  public newPassword: any = null;

  public email = null;
  public minLength = 6;

  constructor(
    private dialogRef: MatDialogRef<FsSigninSecurityResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  public ngOnInit() {
    this.email = this.data.email;
    this.minLength = this.data.minLength;

    this.password = this.data.resetPasswordOptions.password;
    this.changePassword = this.data.resetPasswordOptions.changePassword;
    this.emailPassword = this.data.resetPasswordOptions.emailPassword;

    this.generatePassword();
  }

  public generatePassword() {
    if (this.password) {
      this.newPassword = guid();
    }
  }

  public save() {

    this.close({
      password: this.newPassword,
      email_password: this.emailPassword,
      change_password: this.changePassword
    });
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }

}
