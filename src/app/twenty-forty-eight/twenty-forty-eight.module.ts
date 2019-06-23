import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RandomService } from '../shared/services/random.service';
import { TwentyFortyEightRouting } from './twenty-forty-eight.routes';
import { TwentyFortyEightComponent } from './components/twenty-forty-eight.component';
import { GameService } from './services/game.service';
import { Genetic2048Service } from './services/genetic2048.service';
import { Mutation2048Service } from './services/mutation2048.service';
import { Selection2048Service } from './services/selection2048.service';
import { CrossOver2048Service } from './services/crossover2048.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,

        TwentyFortyEightRouting
    ],
    declarations: [
        TwentyFortyEightComponent
    ],
    providers: [
        GameService,
        Genetic2048Service,
        Mutation2048Service,
        Selection2048Service,
        CrossOver2048Service,
        {
            provide: RandomService, useFactory: () => {
                let rnd = new RandomService();
                rnd.seed(0);
                return rnd;
            }
        }
    ]
})
export class TwentyFortyEightModule { }
