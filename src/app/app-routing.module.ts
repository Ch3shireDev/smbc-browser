import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { LatestComponent } from './latest/latest.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: 'browse',
    component: BrowseComponent
  }, {
    path: 'latest',
    component: LatestComponent
  },
  {
    path: 'comic/:name',
    component: ShowComponent
  },
  {
    path: '',
    redirectTo: 'latest',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
