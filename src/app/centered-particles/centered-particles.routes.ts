import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CenteredParticlesMainComponent } from './components/centered-particles.component';

export const centeredParticlesRoutes: Routes = [
    {
        path: '',
        component: CenteredParticlesMainComponent,
        pathMatch: 'full'
    }
];
export const CenteredParticlesRouting: ModuleWithProviders = RouterModule.forChild(centeredParticlesRoutes);
