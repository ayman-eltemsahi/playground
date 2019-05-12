import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AStarSearchRouting } from './astar-search.routes';
import { SharedModule } from '../shared/shared.module';
import { AstarMainComponent } from './components/astar-main/astar-main.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        SharedModule,

        AStarSearchRouting
    ],
    declarations: [AstarMainComponent]
})
export class AstarSearchModule { }
