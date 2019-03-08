import { Component } from '@angular/core';


@Component({
  selector: 'reset',
  templateUrl: './reset.component.html'
})
export class ResetComponent {

  constructor() { }

  public account = {
    email: 'john_doe@gmail.com',
    login_date: new Date()
  };

  public resetPassword($event) {
    console.log($event);
  }

}
