import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../comics.service';

@Component({
  selector: 'app-latest',
  templateUrl: './latest.component.html',
  styleUrls: ['./latest.component.scss'],
})
export class LatestComponent implements OnInit {

  constructor(private comics: ComicsService) { }

  ngOnInit() {
    this.comics.getComicsList();
  }

}
