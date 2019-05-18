import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TSPGAMainComponent } from './components/tspgamain.component';

export const tspGARoutes: Routes = [
    {
        path: '',
        component: TSPGAMainComponent,
        pathMatch: 'full'
    }
];
export const TSPGARouting: ModuleWithProviders = RouterModule.forChild(tspGARoutes);
