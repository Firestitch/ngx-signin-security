import { Component } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent {

  public data;
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
