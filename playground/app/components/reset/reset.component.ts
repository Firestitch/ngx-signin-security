import { Component } from '@angular/core';

import * as moment from 'moment-timezone';

@Component({
  selector: 'reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent {

  constructor() { }

  public account = {
    email: 'john_doe@gmail.com',
    login_date: moment()
  };

  public resetPassword($event) {
    console.log($event);
  }

}
