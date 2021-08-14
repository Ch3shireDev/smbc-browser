import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlsService {

  constructor() { }

  _next: Subject<boolean> = new Subject<boolean>();
  _prev: Subject<boolean> = new Subject<boolean>();

  public next(): Subject<boolean> {
    return this._next;
  }
  public prev(): Subject<boolean> {
    return this._prev;
  }

  public sendNext() {
    this._next.next(true);
  }
  public sendPrev() {
    this._prev.next(true);
  }
}
