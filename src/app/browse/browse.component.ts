import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ComicLink } from '../comic';
import { ComicsService } from '../comics.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss'],
})
export class BrowseComponent implements OnInit {

  done = false;
  links: ComicLink[] = []
  constructor(private comic: ComicsService) { }

  ngOnInit() {


    for (let i = 0; i < 30; i++) {
      this.items.push(this.items.length);
    }

    // this.loadData();
    // this.getLinks().asObservable().subscribe(link => {
    //   this.links.push(link);
    // })
    // this.getLinks().subscribe(links => {
    //   this.links = links;
    //   console.log('done');
    // });
  }


  items = [];

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {

        this.items.push(this.items.length);
      }

      console.log('Async operation has ended');
      infiniteScroll.target.complete();
    }, 500);
  }

  // getLinks() {
  //   return this.comic.getComicsList();
  // }

  // count = 0;

  // loadData() {
  //   this.comic.getComicsList().pipe(take(this.count+10)).subscribe(link => {
  //     this.links.push(link);
  //     console.log('next')
  //     this.count+=1;
  //   });
  // }

}
