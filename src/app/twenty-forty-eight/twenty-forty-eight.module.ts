import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RandomService } from '../shared/services/random.service';
import { TwentyFortyEightRouting } from './twenty-forty-eight.routes';
import { TwentyFortyEightComponent } from './components/twenty-forty-eight.component';
import { TwentyFortyEightService } from './services/twenty-forty-eight.service';

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
        TwentyFortyEightService,
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
