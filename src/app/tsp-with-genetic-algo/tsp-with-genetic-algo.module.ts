import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TSPGAMainComponent } from './components/tspga-main.component';
import { TSPGARouting } from './tsp-with-genetic-algo.routes';
import { SharedModule } from '../shared/shared.module';
import { LinkedListService } from './services/linked-list.data-structure';
import { MutationService } from './services/mutation.service';
import { CrossOverService } from './services/crossover.service';
import { FitnessService } from './services/fitness.service';
import { DistanceService } from './services/distance.service';
import { RandomService } from '../shared/services/random.service';
import { SelectionService } from './services/selection.service';
import { UtilityService } from './services/utility.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,

        TSPGARouting
    ],
    declarations: [
        TSPGAMainComponent
    ],
    providers: [
        LinkedListService,
        MutationService,
        CrossOverService,
        FitnessService,
        SelectionService,
        DistanceService,
        UtilityService,
        {
            provide: RandomService, useFactory: () => {
                let rnd = new RandomService();
                // rnd.seed(0);
                return rnd;
            }
        }
    ]
})
export class TSPGAModule { }
