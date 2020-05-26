import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { guid } from '@firestitch/common';
import * as _snakecaseKeys from 'snakecase-keys';
import * as _camelcaseKeys from 'camelcase-keys';


@Component({
  selector: 'fs-signin-security-reset',
  templateUrl: './security-reset.component.html',
  styleUrls: ['./security-reset.component.scss']
})
export class FsSigninSecurityResetComponent implements OnInit {

  public password = false;
  public changePassword = false;
  public emailPassword = false;

  public shouldObfuscatePassword = true;

  public newGeneratedPassword: string = null;
  public newCustomPassword: string = null;

  public email = null;
  public minLength = 6;
  public passwordMask = null;
  public showCopyIcon = false;

  constructor(
    private dialogRef: MatDialogRef<FsSigninSecurityResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  public ngOnInit() {
    this.email = this.data.email;
    this.minLength = this.data.minLength;

    this.password = this.data.resetPasswordOptions.password;
    this.changePassword = this.data.resetPasswordOptions.changePassword;
    this.emailPassword = this.data.resetPasswordOptions.emailPassword;
    this.showCopyIcon = this.data.showCopyIcon;

    this.passwordMask = this.generateMask(this.minLength, '*');
    this.generatePassword();
  }

  public generatePassword() {
    this.newGeneratedPassword = guid(this.generateMask(this.minLength, 'x'));
  }

  public toggleShouldObfuscatePassword() {
    this.shouldObfuscatePassword = !this.shouldObfuscatePassword;
  }

  public save() {

    this.close({
      password: this.getCurrentPassword(),
      emailPassword: this.emailPassword,
      changePassword: this.changePassword
    });
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }

  private getCurrentPassword() {
    return this.password ? this.newGeneratedPassword : this.newCustomPassword;
  }

  private generateMask(length, symbol) {
    return symbol.repeat(length);
  }

}
