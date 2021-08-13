import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicStrip } from '../comic';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {

  comics: ComicStrip

  constructor(private route: ActivatedRoute,
    private router: Router,
    private comicsService: ComicsService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    this.comicsService.getComicElement(name).then(comics => { this.comics = comics });
  }

  swiped(event) {
    console.log('swipe');
    console.log(event);
  }

  next(event) {
    console.log(event);
    if (this.comics === undefined) return;
    if (this.comics.next === undefined) return;
    this.router.navigateByUrl(this.comics.next);
  }

  previous(event) {
    console.log(event);
    if (this.comics === undefined) return;
    if (this.comics.next === undefined) return;
    console.log('previous');
    console.log(this.comics.previous);
    this.router.navigateByUrl(this.comics.previous);
  }

}
