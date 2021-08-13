import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
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
    let array = title.split(' - ');
    if (array.length == 1) return "";
    return title.split(' - ')[1];
  }

  getDate(title: string) {
    return title.split(' - ')[0];
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
        let nextElements = doc.getElementsByClassName('cc-next');
        let previousElements = doc.getElementsByClassName('cc-prev');

        let comic = new ComicStrip();

        comic.title = title;
        comic.url = url;
        comic.comicUrl = comicUrl;
        comic.comicText = comicText;
        comic.afterUrl = afterUrl;
        if (nextElements.length>0) {
          let nextUrl = nextElements[0].attributes['href'].value;
          comic.next = nextUrl.replace('https://www.smbc-comics.com', '');
        }
        if (previousElements.length>0) {
          let previousUrl = previousElements[0].attributes['href'].value;
          comic.previous = previousUrl.replace('https://www.smbc-comics.com', '');
        }

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

  getComicsList(from: number = 0, num: number = 0): Subject<ComicLink> {
    let subject = new Subject<ComicLink>();
    this.getHtml('https://www.smbc-comics.com/comic/archive')
      .then(
        doc => {
          let links = [];
          let children = doc.getElementsByName('comic')[0].children;
          let count = children.length;
          if (num != 0) count = num;
          for (let i = 0; i < count; i++) {
            let index = children.length - i - 1 - from;
            let item = children.item(index);
            let url = item.getAttribute('value');
            let title = item.textContent;
            let link = new ComicLink();
            link.url = url;
            link.index = index;
            link.title = this.getTitle(title);
            link.date = this.getDate(title);
            links.push(link);
            console.log(link);
            subject.next(link);
          }

        }
      )

    return subject;
  }
}
