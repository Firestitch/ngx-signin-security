import { Component } from '@angular/core';
import { PasswordBehavior } from '@firestitch/signin-security';
import { timer } from 'rxjs';
import { FsSigninSecurityComponent } from '../../../../src/app/components/security/security.component';
import { JsonPipe } from '@angular/common';


@Component({
    selector: 'change',
    templateUrl: './change.component.html',
    standalone: true,
    imports: [FsSigninSecurityComponent, JsonPipe]
})
export class ChangeComponent {

  public data;
  public PasswordBehavior = PasswordBehavior;

  public account = {
    email: 'john_doe@gmail.com',
    loginDate: new Date()
  };

  public changePassword = ($event) => {
    this.data = $event;
    return timer(1000);
  }

}
