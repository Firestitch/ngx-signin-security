import { Component } from '@angular/core';
import { PasswordBehavior } from '@firestitch/signin-security';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FsSigninSecurityComponent } from '../../../../src/app/components/security/security.component';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'reset',
    templateUrl: './reset.component.html',
    standalone: true,
    imports: [FsSigninSecurityComponent, JsonPipe]
})
export class ResetComponent {

  public data;
  public PasswordBehavior = PasswordBehavior;
  constructor() { }

  public account = {
    email: 'john_doe@gmail.com',
    loginDate: new Date()
  };

  public resetPassword = ($event) => {
    this.data = $event;

    return of(true)
      .pipe(
        delay(1000),
      );
  }

}
