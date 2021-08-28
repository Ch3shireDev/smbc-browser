import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComicStrip } from '../comic';
import { ComicsService } from '../comics.service';
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
    console.log('show')
    let name = this.route.snapshot.paramMap.get('name');
    console.log(`name: ${name}`)
    this.comicsService.getComicElement(name).then(comics => {
      this.comics = comics;
    });
    this.controls.next().subscribe(x => {
      this.next();
    });
    this.controls.prev().subscribe(x => {
      this.prev();
    });
  }

  next() {
    console.log('next')
    if (this.comics === undefined) return;
    if (this.comics.next === undefined) return;
    console.log(this.comics.next);
    this.router.navigateByUrl(this.comics.next);
  }

  prev() {
    console.log('prev')
    if (this.comics === undefined) return;
    if (this.comics.prev === undefined) return;
    console.log(this.comics.prev);
    this.router.navigateByUrl(this.comics.prev);
  }
}
