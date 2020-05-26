import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

import { FsPasswordService } from '@firestitch/password';
import { format } from '@firestitch/date';

import { Password } from '../../interfaces/password';
import { FsSigninSecurityResetComponent } from '../security-reset/security-reset.component';
import { PasswordBehavior } from '../../types/password-behavior.enum';
import { CaseService } from './../../services/case.service';


@Component({
  selector: 'fs-signin-security',
  templateUrl: './security.component.html',
  styleUrls: [ './security.component.scss' ],
})
export class FsSigninSecurityComponent implements OnInit, OnDestroy {

  @Input() public email: string = null;
  @Input() public lastSignIn: any = null;
  @Input() public passwordBehavior: PasswordBehavior = PasswordBehavior.Change;
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

  private _destroy$ = new Subject();

  constructor(
    private fsPassword: FsPasswordService,
    private dialog: MatDialog,
    private _caseService: CaseService
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
          label: 'Change Password',
          action: 'submit',
          color: 'primary'
        },
        {
          label: 'Cancel',
          action: 'cancel'
        }
      ],
      exclude: [],
      submit: (newPassword, oldPassword) => {
        const result: Password = { currentPassword: oldPassword, newPassword: newPassword };
        return of(result);
      }
    })
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe((response: any) => {
        if (response.action === 'submit') {
          this.changePassword.emit(this._caseService.output(response.result));
        }
      }, () => {

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

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this._destroy$)
      )
      .subscribe(response => {
        if (response) {
          this.resetPassword.emit(this._caseService.output(response));
        }
      });
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
