import { Component } from '@angular/core';
import * as moment from 'moment-timezone';


@Component({
  selector: 'update',
  templateUrl: './update.component.html'
})
export class UpdateComponent {

  public account = {
    email: 'john_doe@gmail.com',
    login_date: moment()
  };

  public updatePassword($event) {
    console.log($event);
  }

}
