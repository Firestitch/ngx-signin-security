import { Component, Inject, OnInit } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';

import { guid } from '@firestitch/common';

import { tap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FsLabelModule } from '@firestitch/label';
import { NgTemplateOutlet } from '@angular/common';
import { FsClipboardModule } from '@firestitch/clipboard';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: 'fs-signin-security-reset',
    templateUrl: './security-reset.component.html',
    styleUrls: ['./security-reset.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatSlideToggle,
        FsLabelModule,
        NgTemplateOutlet,
        FsClipboardModule,
        MatFormField,
        MatLabel,
        MatInput,
        MatSuffix,
        MatDialogActions,
        MatButton,
        MatDialogClose,
        MatIcon,
    ],
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
    private _dialogRef: MatDialogRef<FsSigninSecurityResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  public ngOnInit() {
    this.email = this.data.email;
    this.minLength = this.data.minLength;

    this.password = this.data.password;
    this.changePassword = this.data.changePassword;
    this.emailPassword = this.data.emailPassword;
    this.showCopyIcon = this.data.showCopyIcon;

    this.passwordMask = this._generateMask(this.minLength, '*');
    this.generatePassword();
  }

  public generatePassword() {
    this.newGeneratedPassword = guid(this._generateMask(this.minLength, 'x'));
  }

  public toggleShouldObfuscatePassword($event) {
    this.shouldObfuscatePassword = !this.shouldObfuscatePassword;
  }

  public save = () => {
    return this.data.resetPassword({
      password: this.getCurrentPassword(),
      emailPassword: this.emailPassword,
      changePassword: this.changePassword,
    })
      .pipe(
        tap(() => {
          this._dialogRef.close();
        }),
      );
  };

  public close(data = null) {
    this._dialogRef.close(data);
  }

  private getCurrentPassword() {
    return this.password ? this.newGeneratedPassword : this.newCustomPassword;
  }

  private _generateMask(length, symbol) {
    return symbol.repeat(length);
  }

}
