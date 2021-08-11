import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import * as $ from 'jquery/dist/jquery.min.js';
import { Observable, Subject } from 'rxjs';
import { ComicStrip, ComicLink } from './comic';

@Injectable({
  providedIn: 'root'
})
export class ComicsService {
  constructor(
    private http: HTTP
  ) {

  }
  showLatest(): Promise<ComicStrip> {
    return this.getComicElement();
  }

  getTitle(title: string) {
    return title.replace('Saturday Morning Breakfast Cereal - ', '').trim();
  }

  getComicElement(name: string = null) {
    let url = `https://www.smbc-comics.com/comic/${name}`;
    if (name === null) { url = 'https://www.smbc-comics.com/' }
    return this
      .getHtml(url)
      .then(doc => {
        let title = this.getTitle(doc.getElementsByTagName('title')[0].innerText);
        let url = doc.getElementById('mobilepermalink').attributes['data-clipboard-text'].value;
        let comicElement = doc.getElementById('cc-comic');
        let comicText = comicElement.attributes['title'].value;
        let comicUrl = comicElement.attributes['src'].value;
        let after = doc.getElementById('aftercomic');
        let afterUrl = after.getElementsByTagName('img')[0].attributes['src'].value;

        let comic = new ComicStrip();

        comic.title = title;
        comic.url = url;
        comic.comicUrl = comicUrl;
        comic.comicText = comicText;
        comic.afterUrl = afterUrl;

        return comic;
      });
  }

  getHtml(url): Promise<Document> {
    return this.http.get(url, {}, {})
      .then(data => {
        if (data.status != 200) throw new Error();
        return data.data;
      })
      .then((data) => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(data, 'text/html');
        return doc;
      });
  }

  getComicsList(): Subject<ComicLink> {
    let subject = new Subject<ComicLink>();
    this.getHtml('https://www.smbc-comics.com/comic/archive')
      .then(
        doc => {
          let list = [];
          let children = doc.getElementsByName('comic')[0].children;
          for (let i = 0; i <
            30
            // children.length
            ; i++) {
            let item = children.item(children.length - i - 1);
            let url = item.getAttribute('value');
            let title = this.getTitle(item.textContent);
            let link = new ComicLink();
            link.url = url;
            link.title = title;
            console.log(title);
            subject.next(link);
            list.push(link);
          }

        }
      )

    return subject;
  }
}
