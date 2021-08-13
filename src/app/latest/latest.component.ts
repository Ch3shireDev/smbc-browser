import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComicLink } from '../comic';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {

  constructor(private comics: ComicsService, private router: Router) { }
  link: ComicLink;
  ngOnInit() {
    this.comics.getComicsList(0, 1).asObservable().subscribe(link => {
      this.router.navigateByUrl(link.url);
    });
  }

}
