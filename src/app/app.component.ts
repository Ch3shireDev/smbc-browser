import { Component } from '@angular/core';
import { ControlsService } from './controls.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private controls: ControlsService) { }

  prev() {
    this.controls.sendPrev();
  }

  next() {
    this.controls.sendNext();
  }
}
