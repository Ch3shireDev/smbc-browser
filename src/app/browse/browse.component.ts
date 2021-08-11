import { Component, OnInit } from '@angular/core';
import { ComicLink } from '../comic';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {

  done = false;
  links: ComicLink[] = [];
  constructor(private comic: ComicsService) { }

  ngOnInit() {
    this.getLinks().subscribe(links => {
      this.links = links;
      console.log('done');
    });
  }

  getLinks() {
    return this.comic.getComicsList();
  }

}
