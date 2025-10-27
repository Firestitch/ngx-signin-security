import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FsExampleModule } from '@firestitch/example';
import { ChangeComponent } from '../change/change.component';
import { ResetComponent } from '../reset/reset.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, ChangeComponent, ResetComponent]
})
export class ExamplesComponent {
  public config = environment;
}
