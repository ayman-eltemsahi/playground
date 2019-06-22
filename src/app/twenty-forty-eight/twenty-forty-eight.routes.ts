import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwentyFortyEightComponent } from './components/twenty-forty-eight.component';

export const twentyFortyEightRoutes: Routes = [
    {
        path: '',
        component: TwentyFortyEightComponent,
        pathMatch: 'full'
    }
];
export const TwentyFortyEightRouting: ModuleWithProviders = RouterModule.forChild(twentyFortyEightRoutes);
