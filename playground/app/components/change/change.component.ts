import { Component } from '@angular/core';
import { PasswordBehavior } from '@firestitch/signin-security';
import { timer } from 'rxjs';


@Component({
  selector: 'change',
  templateUrl: './change.component.html'
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
