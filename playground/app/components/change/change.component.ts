import { Component } from '@angular/core';
import { of, throwError, timer } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'change',
  templateUrl: './change.component.html'
})
export class ChangeComponent {

  public data;

  public account = {
    email: 'john_doe@gmail.com',
    loginDate: new Date()
  };

  public changePassword = ($event) => {
    this.data = $event;
    return timer(1000);
  }

}
