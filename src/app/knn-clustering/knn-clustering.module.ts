import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { RandomService } from '../shared/services/random.service';
import { KnnClusteringRouting } from './knn-clustering.routes';
import { KnnClusteringMainComponent } from './components/knn-clustering.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,

        KnnClusteringRouting
    ],
    declarations: [
        KnnClusteringMainComponent
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
export class KNNClusteringModule { }
