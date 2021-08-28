import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowseComponent } from './browse/browse.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: 'browse',
    component: BrowseComponent
  },
  {
    path: 'comic/:name',
    component: ShowComponent
  },
  {
    path: '',
    component: ShowComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
