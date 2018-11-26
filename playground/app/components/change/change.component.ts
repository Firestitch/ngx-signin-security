import { Component } from '@angular/core';
import * as moment from 'moment-timezone';


@Component({
  selector: 'change',
  templateUrl: './change.component.html'
})
export class ChangeComponent {

  public account = {
    email: 'john_doe@gmail.com',
    login_date: moment()
  };

  public changePassword($event) {
    console.log($event);
  }

}
