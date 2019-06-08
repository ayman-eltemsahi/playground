import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RandomService } from '../shared/services/random.service';
import { CenteredParticlesRouting } from './centered-particles.routes';
import { CenteredParticlesMainComponent } from './components/centered-particles.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,

        CenteredParticlesRouting
    ],
    declarations: [
        CenteredParticlesMainComponent
    ],
    providers: [
        {
            provide: RandomService, useFactory: () => {
                let rnd = new RandomService();
                // rnd.seed(0);
                return rnd;
            }
        }
    ]
})
export class CenteredParticlesModule { }
