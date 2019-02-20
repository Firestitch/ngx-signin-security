import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FsMessage } from '@firestitch/message';
import { guid } from '@firestitch/common';


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

  constructor(
    private dialogRef: MatDialogRef<FsSigninSecurityResetComponent>,
    private fsMessage: FsMessage,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  public ngOnInit() {
    this.email = this.data.email;
    this.minLength = this.data.minLength;

    this.password = this.data.resetPasswordOptions.password;
    this.changePassword = this.data.resetPasswordOptions.changePassword;
    this.emailPassword = this.data.resetPasswordOptions.emailPassword;

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
      email_password: this.emailPassword,
      change_password: this.changePassword
    });
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }

  public clipboard() {
    this.fsMessage.success(`Copied to clipboard`);
  }

  private getCurrentPassword() {
    return this.password ? this.newGeneratedPassword : this.newCustomPassword;
  }

  private generateMask(length, symbol) {
    return symbol.repeat(length);
  }

}
