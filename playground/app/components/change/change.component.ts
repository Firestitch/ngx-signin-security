import { Component } from '@angular/core';


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

  public changePassword($event) {
    this.data = $event;
  }

}
