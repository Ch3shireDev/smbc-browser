import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComicStrip } from '../comic';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
})
export class ShowComponent implements OnInit {

  comics: ComicStrip

  constructor(private route: ActivatedRoute, private comicsService: ComicsService) { }

  ngOnInit() {
    let name = this.route.snapshot.paramMap.get('name');
    this.comicsService.getComicElement(name).then(comics => { this.comics = comics });
  }

}
