import { Component } from '@angular/core';


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

  public resetPassword($event) {
    this.data = $event;
  }

}
