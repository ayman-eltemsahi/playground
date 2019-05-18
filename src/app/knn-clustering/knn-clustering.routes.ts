import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KnnClusteringMainComponent } from './components/knn-clustering.component';

export const knnClusteringRoutes: Routes = [
    {
        path: '',
        component: KnnClusteringMainComponent,
        pathMatch: 'full'
    }
];
export const KnnClusteringRouting: ModuleWithProviders = RouterModule.forChild(knnClusteringRoutes);
