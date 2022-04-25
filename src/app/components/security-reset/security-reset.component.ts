import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { guid } from '@firestitch/common';
import { tap } from 'rxjs/operators';


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

    this.password = this.data.password;
    this.changePassword = this.data.changePassword;
    this.emailPassword = this.data.emailPassword;
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

  public save = () => {
    return this.data.resetPassword({
      password: this.getCurrentPassword(),
      emailPassword: this.emailPassword,
      changePassword: this.changePassword
    })
      .pipe(
        tap(() => {
          this.dialogRef.close();
        }),
      );
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
