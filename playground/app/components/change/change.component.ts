import { Component } from '@angular/core';


@Component({
  selector: 'change',
  templateUrl: './change.component.html'
})
export class ChangeComponent {

  public account = {
    email: 'john_doe@gmail.com',
    login_date: new Date()
  };

  public changePassword($event) {
    console.log($event);
  }

}
