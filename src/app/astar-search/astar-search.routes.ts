import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AstarMainComponent } from './components/astar-main/astar-main.component';

export const astarSearchRoutes: Routes = [
    {
        path: '',
        component: AstarMainComponent,
        pathMatch: 'full',
        // children: []
    }
];
export const AStarSearchRouting: ModuleWithProviders = RouterModule.forChild(astarSearchRoutes);
