import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ComicsService } from './comics.service';
import { ControlsService } from './controls.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private controls: ControlsService, private comicsService: ComicsService, private router: Router) { }

  prev() {
    this.controls.sendPrev();
  }

  next() {
    this.controls.sendNext();
  }

  random() {
    this.comicsService.getRandomComics().then(link => {
      this.router.navigateByUrl(link.url);
    });
  }

  latest(){
    this.comicsService.getComicsList(0, 1).asObservable().subscribe(link => {
      this.router.navigateByUrl(link.url);
    });
  }
}
