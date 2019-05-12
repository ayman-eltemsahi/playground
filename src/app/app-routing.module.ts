import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tsp-ga',
    loadChildren: './tsp-with-genetic-algo-module/tsp-with-genetic-algo.module#TSPGAModule'
  },
  {
    path: 'astar',
    loadChildren: './astar-search/astar-search.module#AstarSearchModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
