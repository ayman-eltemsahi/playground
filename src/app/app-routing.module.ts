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
    loadChildren: './tsp-with-genetic-algo/tsp-with-genetic-algo.module#TSPGAModule'
  },
  {
    path: 'astar',
    loadChildren: './astar-search/astar-search.module#AstarSearchModule'
  },
  {
    path: 'knn-clustering',
    loadChildren: './knn-clustering/knn-clustering.module#KNNClusteringModule'
  },
  {
    path: 'centered-particles',
    loadChildren: './centered-particles/centered-particles.module#CenteredParticlesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
