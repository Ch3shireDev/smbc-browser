import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AsyncPipe, CommonModule } from "@angular/common";
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { BrowseComponent } from './browse/browse.component';
import { LatestComponent } from './latest/latest.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  declarations: [AppComponent, BrowseComponent, LatestComponent, ShowComponent],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, HTTP, AsyncPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
