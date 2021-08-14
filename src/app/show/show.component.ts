import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicStrip } from '../comic';
import { ComicsService } from '../comics.service';
import { IonSlides } from '@ionic/angular';
import { ControlsService } from '../controls.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {

  comics: ComicStrip

  constructor(private route: ActivatedRoute,
    private router: Router,
    private comicsService: ComicsService,
    private controls: ControlsService
  ) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    this.comicsService.getComicElement(name).then(comics => { this.comics = comics });
    this.controls.next().subscribe(x => {
      this.next();
    });
    this.controls.prev().subscribe(x => {
      this.prev();
    });
  }

  next() {
    if (this.comics === undefined) return;
    if (this.comics.next === undefined) return;
    this.router.navigateByUrl(this.comics.next);
  }

  prev() {
    if (this.comics === undefined) return;
    if (this.comics.prev === undefined) return;
    console.log(this.comics.prev);
    this.router.navigateByUrl(this.comics.prev);
  }
}
